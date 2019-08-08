export module Constants {
  // Id of target spreadsheet
  // default: sample spread sheet
  export const sheetKey = "1IfbFolaLzGD9GdlwQWou7ht_C4qTA_WzzS-oxRVMtf8";

  export const settingSheetName = "setting";

  export const activeStringList = ["〇"];
}

export module Util {
  export function deleteBlank(origin: string): string {
    return origin.replace(/\s+/g, "");
  }
}
