const htmlTableElem = document.getElementsByTagName("table")[0];
const simpleTableToggle = document.getElementsByTagName("input")[0];

const simpleHTMLTables = SimplifyHTMLTable.Util.generateSimpleHTMLTablesOutOfComplicatedHTMLTable(htmlTableElem);

const htmlTableRef = htmlTableElem.getAttribute(SimplifyHTMLTable.Util.tableReferenceForLinkAttribute);

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