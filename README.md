## Usage

Use [clasp](https://github.com/google/clasp) to deploy.

Set "src" to rootDir in `.clasp.json`.

```
{
    "scriptId": "xxxxxxxxxxxxx",
    "rootDir": "src"
}
```

### Sample

- Sample spread sheet

https://docs.google.com/spreadsheets/d/1IfbFolaLzGD9GdlwQWou7ht_C4qTA_WzzS-oxRVMtf8/edit#gid=0


## Develop

```
npm install
```

- Recommended to use visual studio code.
  - tsLint settings are written for vscode.

### Unit-Testing

Using testing framework [AVA](https://ava.li).
All names used in tests are generated randomly.

```
npm install
npm test
```
