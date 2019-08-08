import PastMatch from "./pastMatch";
import Person from "./person";

export default class People {
  personList: Person[];

  constructor(personList: Person[]) {
    this.personList = personList;
  }

  setPastMatchDataToPerson(pastMatchList: PastMatch[]): void {
    this.setUnmatchCountToPerson(pastMatchList);
    this.setHistoryToPerson(pastMatchList);
  }

  getPastMatchedCount(targetPerson: Person): number {
    let count = 0;

    this.personList.forEach(person => {
      if (!person.compareName(targetPerson.name)) {
        count += person.getPastMatchedCount(targetPerson);
      }
    });

    return count;
  }

  private setHistoryToPerson(pastMatchList: PastMatch[]): void {
    const personList = this.personList;
    pastMatchList.forEach(match =>
      match.teamList.forEach((team, index) =>
        team.forEach(personName =>
          personList
            .filter(person => person.compareName(personName))[0]
            .history.push({ team: index.toString(), date: match.date })
        )
      )
    );
  }

  private setUnmatchCountToPerson(pastMatchList: PastMatch[]): void {
    let tempUnmatchCountMap = {};
    let resultUnmatchCountMap = {};

    pastMatchList.forEach((match, index) => {
      if (index === 0) {
        match.unmatchedPersonNameList.forEach(
          name => (tempUnmatchCountMap[name] = 1)
        );
      } else {
        Object.keys(tempUnmatchCountMap).forEach(name => {
          if (match.unmatchedPersonNameList.indexOf(name) >= 0) {
            tempUnmatchCountMap[name] += 1;
          } else {
            if (!resultUnmatchCountMap.hasOwnProperty(name)) {
              resultUnmatchCountMap[name] = tempUnmatchCountMap[name];
            }
          }
        });
      }
    });

    Object.keys(tempUnmatchCountMap).forEach(name => {
      if (!resultUnmatchCountMap.hasOwnProperty(name)) {
        resultUnmatchCountMap[name] = tempUnmatchCountMap[name];
      }
    });

    this.personList.forEach(person => {
      person.unmatchedCount = resultUnmatchCountMap.hasOwnProperty(person.name)
        ? resultUnmatchCountMap[person.name]
        : 0;
    });
  }
}
