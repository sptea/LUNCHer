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
    this.teamList = teamList;
    this.unmatchedPersonNameList = unmatchedPersonNameList.map(u =>
      this.deleteBlank(u)
    );
  }

  private deleteBlank(origin: string): string {
    return origin.replace(/\s+/g, "");
  }
}
