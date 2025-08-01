/**
 * @jest-environment jsdom
 */
import { expect, test } from "@jest/globals";
import * as fs from "fs"
import complicatedTableModel from "./assets/conceptual_complicated-table-model.json";
import complicatedTableModel_simplified from "./assets/conceptual_simple-table-models.json";

const complicatedTable = fs.readFileSync("./test/assets/conceptual_complicated-table.html", "utf-8");
const simpleTable = fs.readFileSync("./test/assets/conceptual_simple-table.html", "utf-8");

import { Util } from "../src/index";

document.body.innerHTML = complicatedTable;

test("convert from HTML table into Model returns expected results", () => {
  expect(function() {
    return Util.importHTMLTableIntoModel(document.getElementById("complicated-table") as HTMLTableElement)
  }()).toEqual(complicatedTableModel);
});

test("export from table model into HTML table works as intended", () => {
  expect(function() {
    // @ts-expect-error
    return Util.exportTableModel(complicatedTableModel_simplified[0]).outerHTML;
  }()).toEqual(simpleTable)
})

test("turn complicated HTML table into easier to read HTML tables", () => {
  expect(function() {
    return Util.generateSimpleHTMLTablesOutOfComplicatedHTMLTable(document.getElementById("complicated-table") as HTMLTableElement);
  }()).toMatchSnapshot("complicatedTable_simplifiedHTMLVersions");
})