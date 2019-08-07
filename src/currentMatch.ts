import Person from "./person";
import Group from "./group";
import PastMatch from "./pastMatch";
import People from "./people";

export default class CurrentMatch {
  private people: People;

  private devidedPersonList: Person[][];
  private minNumber: number;

  constructor(people: People) {
    this.people = people;

    this.devidedPersonList = this.devideByteam();
    this.minNumber = Math.min(
      ...this.devidedPersonList.map(personList => personList.length)
    );
  }

  private getActivePersonList(): Person[] {
    return this.people.personList.filter(person => person.isActive());
  }

  private distinct(array) {
    return array.filter((elem, index, self) => self.indexOf(elem) === index);
  }

  private devideByteam(): Person[][] {
    const teamList: string[] = this.distinct(
      this.getActivePersonList().map(p => p.team)
    );

    const devidedPersonList: Person[][] = [];
    for (let i = 0; i < teamList.length; i++) {
      devidedPersonList[i] = [];
    }

    this.getActivePersonList().forEach(person =>
      devidedPersonList[teamList.indexOf(person.team)].push(person)
    );

    return devidedPersonList;
  }

  private cutByMinNum(personList: Person[]): Person[] {
    if (personList.length === this.minNumber) {
      return personList;
    }

    const countList: number[] = this.distinct(
      personList.map(p => p.unmatchedCount)
    );

    let result: Person[] = [];
    countList.sort().forEach(c => {
      result.push(
        ...this.shufflePersonList(
          personList.filter(p => p.unmatchedCount === c)
        )
      );
    });

    if (this.minNumber % 2 === 0) {
      return result.slice(0, this.minNumber);
    } else {
      return result.slice(0, this.minNumber + 1);
    }
  }

  private shufflePersonList(personList: Person[]) {
    for (let i = personList.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = personList[i];
      personList[i] = personList[r];
      personList[r] = tmp;
    }
    return personList;
  }

  generateGroup(): Group[] {
    const teamedShuffledPersonList: Person[][] = this.devidedPersonList.map(p =>
      this.shufflePersonList(this.cutByMinNum(p))
    );

    let groupList: Group[] = [];

    for (let i = 0; ; i++) {
      if (i % 2 === 0) {
        if (
          teamedShuffledPersonList.some(
            shuffledPersonList => shuffledPersonList.length <= i
          )
        ) {
          break;
        }
      } else {
        teamedShuffledPersonList.map(shuffledPersonList => {
          if (shuffledPersonList.length <= i) {
            shuffledPersonList.push(shuffledPersonList[0].copy());
          }
        });
        const groupedPersonList = [
          ...teamedShuffledPersonList.map(shuffledPersonList => [
            shuffledPersonList[i],
            shuffledPersonList[i - 1]
          ])
        ];

        groupList.push(
          new Group(groupedPersonList.reduce((acc, val) => acc.concat(val), []))
        );
      }
    }

    return groupList;
  }
}
