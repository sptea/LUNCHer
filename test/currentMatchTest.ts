import test from "ava";
import CurrentMatch from "../src/currentMatch";
import PastMatch from "../src/pastMatch";
import Person from "../src/person";
import People from "../src/people";

const personList1 = [
  new Person("鈴村 紘子", "〇", "営業"),
  new Person("北風あみ", "×", "営業"),
  new Person("達川 裕久", "〇", "営業"),
  new Person("東島 しずか", "〇", "営業"),
  new Person("高岡 崇", "〇", "営業"),
  new Person("上坂 清文", "〇", "人事部"),
  new Person("三井田雄治", "〇", "人事部"),
  new Person("熊崎 順一", "〇", "人事部")
];

const pastMatchList1 = [
  new PastMatch("2019/3/1", [], ["東島 しずか", "上坂 清文"]),
  new PastMatch("2019/2/1", [], ["北風あみ", "上坂 清文", "鍵谷 光昭"]),
  new PastMatch("2019/1/1", [], ["北風あみ", "上坂 清文", "東島 しずか"])
];

const people = new People(personList1);
people.setPastMatchDataToPerson(pastMatchList1);
const currentMatch = new CurrentMatch(people);

test("Devided by team correctly", t => {
  t.snapshot((currentMatch as any).createClusterByteam());
});

test("Cut by minNum 1", t => {
  const personList = personList1.filter(p => p.isActive && p.team === "営業");
  const res = (currentMatch as any).cutClusterByMinNum(personList);
  t.is(res.length, 4);
});

test("Cut by minNum 2", t => {
  const personList = personList1.filter(p => p.isActive && p.team === "人事部");
  t.is((currentMatch as any).cutClusterByMinNum(personList).length, 3);
});

test("Create collect number of group", t => {
  const groupList = currentMatch.generateGroup();
  t.is(groupList.length, 2);
});
