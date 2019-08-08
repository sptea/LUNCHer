import SheetRepository from "./sheetRepository";
import People from "./people";
import Group from "./group";
import CurrentMatch from "./currentMatch";

function main() {
  const sheetRepository = new SheetRepository();

  const personList = sheetRepository.getPersonList();
  const pastMatchList = sheetRepository.getPastMatchList();

  const people = new People(personList);
  people.setPastMatchDataToPerson(pastMatchList);

  const resultList = [];
  let bestScore = -Infinity;
  let bestGroupList: Group[];
  for (let i = 0; i < 10; i++) {
    const currentMatch = new CurrentMatch(people);
    const groupList = currentMatch.generateGroup();

    let score = 0;
    groupList.forEach(group => (score += group.calclateScore()));
    resultList.push([i, score]);

    if (bestScore < score) {
      bestGroupList = groupList;
      bestScore = score;
    }
  }

  Logger.log(bestGroupList.map(g => g.getPersonNameList()));
}
