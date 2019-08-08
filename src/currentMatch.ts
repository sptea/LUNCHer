import Person from "./person";
import Group from "./group";
import PastMatch from "./pastMatch";
import People from "./people";

export default class CurrentMatch {
  private people: People;

  private clusterList: Person[][];
  private minClusterNumber: number;

  constructor(people: People) {
    this.people = people;

    this.clusterList = this.createClusterByteam();
    this.minClusterNumber = Math.min(
      ...this.clusterList.map(personList => personList.length)
    );
  }

  private getActivePersonList(): Person[] {
    return this.people.personList.filter(person => person.isActive());
  }

  private distinct(array: any[]) {
    return array.filter((elem, index, self) => self.indexOf(elem) === index);
  }

  private createClusterByteam(): Person[][] {
    const teamList: string[] = this.distinct(
      this.getActivePersonList().map(person => person.team)
    );

    const cluster: Person[][] = [];
    for (let i = 0; i < teamList.length; i++) {
      cluster[i] = [];
    }

    this.getActivePersonList().forEach(person =>
      cluster[teamList.indexOf(person.team)].push(person)
    );

    return cluster;
  }

  private cutClusterByMinNum(cluster: Person[]): Person[] {
    if (cluster.length === this.minClusterNumber) {
      return cluster;
    }

    const countList: number[] = this.distinct(
      cluster.map(person => person.unmatchedCount)
    );

    let result: Person[] = [];
    countList.sort().forEach(c => {
      result.push(
        ...this.shufflePersonList(
          cluster.filter(person => person.unmatchedCount === c)
        )
      );
    });

    if (this.minClusterNumber % 2 === 0) {
      return result.slice(0, this.minClusterNumber);
    } else {
      return result.slice(0, this.minClusterNumber + 1);
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
    const shuffledClusterList: Person[][] = this.clusterList.map(cluster =>
      this.shufflePersonList(this.cutClusterByMinNum(cluster))
    );

    let groupList: Group[] = [];

    for (let i = 0; ; i++) {
      if (i % 2 === 0) {
        if (
          shuffledClusterList.some(
            shuffledCluster => shuffledCluster.length <= i
          )
        ) {
          break;
        }
      } else {
        shuffledClusterList.map(shuffledCluster => {
          if (shuffledCluster.length <= i) {
            shuffledCluster.push(shuffledCluster[0].copy());
          }
        });
        const groupedPersonList = [
          ...shuffledClusterList.map(shuffledPersonList => [
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
