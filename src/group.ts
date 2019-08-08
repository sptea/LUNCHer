import Person from "./person";
import People from "./people";

export default class Group {
  private people: People;

  constructor(personList: Person[]) {
    this.people = new People(personList);
  }

  calclateScore() {
    let result = 0;

    this.people.personList.forEach(person => {
      result -= this.people.getPastMatchedCount(person);
    });
    return result;
  }

  getPersonNameList() {
    return this.people.personList.map(person => person.name);
  }
}
