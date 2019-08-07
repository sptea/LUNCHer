import test from "ava";
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
  new PastMatch(
    "2019/3/1",
    [["鈴村 紘子", "北風 あみ", "東島しずか", "達川 裕久"]],
    ["東島 しずか", "上坂 清文"]
  ),
  new PastMatch("2019/2/1", [], ["北風あみ", "上坂 清文", "鍵谷 光昭"]),
  new PastMatch("2019/1/1", [], ["北風あみ", "上坂 清文", "東島 しずか"])
];

test("Generate correct people", t => {
  const people = new People(personList1);
  people.setPastMatchDataToPerson(pastMatchList1);
  t.snapshot(people);
});
