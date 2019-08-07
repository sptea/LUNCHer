import Person from "./person";
import PastMatch from "./pastMatch";
import { Constants } from "./constants";

interface AppSetting {
  masterSheet: {
    name: string;
    colHead: {
      name: number[];
      participation: number[];
      team: number[];
    };
  };
  pastMatchSheet: {
    colHead: {
      team: number[][];
      unmatched: number[];
    };
  };
}

export default class SheetRepository {
  private parentSheet;
  private settingSheet;
  private appSetting: AppSetting;

  constructor() {
    this.parentSheet = SpreadsheetApp.openById(Constants.sheetKey);
    this.settingSheet = this.parentSheet.getSheetByName(
      Constants.settingSheetName
    );

    this.getAppSettingFromSheet();
  }

  private getAppSettingFromSheet() {
    const json = this.settingSheet.getRange("A1").getValue();
    this.appSetting = JSON.parse(json);
  }

  getColUntilBlank(sheet, head: number[]) {
    const range = sheet.getRange(...head, sheet.getLastRow() + 1);
    const originalArray = range.getValues().map(col => col[0]);

    const slicedArray = originalArray.slice(0, originalArray.indexOf(""));
    return slicedArray;
  }

  getPersonList() {
    const sheet = this.parentSheet.getSheetByName(
      this.appSetting.masterSheet.name
    );

    const nameList = this.getColUntilBlank(
      sheet,
      this.appSetting.masterSheet.colHead.name
    );
    const participationList = this.getColUntilBlank(
      sheet,
      this.appSetting.masterSheet.colHead.participation
    );
    const teamList = this.getColUntilBlank(
      sheet,
      this.appSetting.masterSheet.colHead.team
    );

    let personList: Person[] = [];
    nameList.forEach((n: string, i: number) =>
      personList.push(new Person(n, participationList[i], teamList[i]))
    );

    return personList;
  }

  private getPastMatch(sheet): PastMatch {
    const unmatchedList = this.getColUntilBlank(
      sheet,
      this.appSetting.pastMatchSheet.colHead.unmatched
    );

    const groupList = [];
    this.appSetting.pastMatchSheet.colHead.team.forEach(teamColHead => {
      const col = this.getColUntilBlank(sheet, teamColHead);

      for (let i = 0, l = col.length; i < l; i += 2) {
        if (groupList.length <= i / 2) groupList.push([]);
        groupList[i / 2].push(...col.slice(i, i + 2));
      }
    });
    return new PastMatch(sheet.getName(), groupList, unmatchedList);
  }

  getPastMatchList() {
    const sheetList = this.parentSheet.getSheets();
    const pastMatchSheetList = sheetList.filter(sheet => {
      const sheetName = sheet.getName();
      return (
        sheetName !== this.appSetting.masterSheet.name &&
        sheetName !== Constants.settingSheetName
      );
    });
    const pastMatchList: PastMatch[] = [];

    pastMatchSheetList.forEach(sheet => {
      const pastMatch = this.getPastMatch(sheet);
      pastMatchList.push(pastMatch);
    });

    return pastMatchList;
  }

  getData() {
    return this.appSetting;
  }
}
