import SheetRepository from "./sheetRepository";
import People from "./people";
import CurrentMatch from "./currentMatch";

function main() {
  const sheetRepository = new SheetRepository();

  const data = sheetRepository.getData();
  const personList = sheetRepository.getPersonList();
  const pastMatchList = sheetRepository.getPastMatchList();

  const people = new People(personList);
  people.setPastMatchDataToPerson(pastMatchList);
  const currentMatch = new CurrentMatch(people);
  const groupList = currentMatch.generateGroup();
  console.log("end");
}
