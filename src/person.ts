import { Constants, Util } from "./util";

export default class Person {
  name: string;
  team: string;
  unmatchedCount: number;
  private participation: string;
  history: { date: string; team: string }[];

  constructor(name: string, participation: string, team: string) {
    this.name = Util.deleteBlank(name);
    this.participation = participation;
    this.team = team;
    this.history = [];
  }

  getPastMatchedCount(targetPerson: Person): number {
    let count = 0;

    targetPerson.history.forEach(h => {
      if (this.history.some(th => th.date === h.date && th.team === h.team))
        count++;
    });
    return count;
  }

  isActive(): boolean {
    return Constants.activeStringList.indexOf(this.participation) >= 0;
  }

  compareName(target: string): boolean {
    return this.name === Util.deleteBlank(target);
  }

  copy(): Person {
    const copiedPerson: Person = new Person(
      this.name,
      this.participation,
      this.team
    );
    copiedPerson.unmatchedCount = this.unmatchedCount;
    copiedPerson.history = this.history;
    return copiedPerson;
  }
}
