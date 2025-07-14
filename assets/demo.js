let htmlTableElem = document.getElementsByTagName("table")[0];
let simpleTableToggle = document.getElementsByTagName("input")[0];

let simpleHTMLTables = SimplifyHTMLTable.Util.generateSimpleHTMLTablesOutOfComplicatedHTMLTable(htmlTableElem);

let htmlTableRef = htmlTableElem.getAttribute(SimplifyHTMLTable.Util.tableReferenceForLinkAttribute);

for (simpleHTMLTable of simpleHTMLTables) {
	simpleHTMLTable.setAttribute("hidden", "true");
}

document.body.append(...simpleHTMLTables);

function toggleBetweenSimpleTablesAndTheComplicatedTable() {
	SimplifyHTMLTable.Util.toggleSimpleHTMLTableAndComplicatedHTMLTable(htmlTableRef);
} 

simpleTableToggle.addEventListener("change", toggleBetweenSimpleTablesAndTheComplicatedTable);


if (simpleTableToggle.checked) {
	toggleBetweenSimpleTablesAndTheComplicatedTable();
}