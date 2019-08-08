import { Util } from "./util";

export default class PastMatch {
  date;
  teamList: string[][];
  unmatchedPersonNameList: string[];

  constructor(
    date: string,
    teamList: string[][],
    unmatchedPersonNameList: string[]
  ) {
    this.date = date;
    this.teamList = teamList.map(team =>
      team.map(name => Util.deleteBlank(name))
    );
    this.unmatchedPersonNameList = unmatchedPersonNameList.map(name =>
      Util.deleteBlank(name)
    );
  }
}
