const tableSourceCodeTextBox = document.getElementById("tableSourceCodeTextBox");
const renderTableSourceCodeBtn = document.getElementById("renderTableSourceCodeBtn");
const complicatedTableContainer = document.getElementById("complicatedTableContainer");
const simpleTablesContainer = document.getElementById("simpleTablesContainer");
const simpleTableToggle = document.getElementById("simpleTableToggle");

function generateSimpleTables(htmlTableElem) {
	simpleTablesContainer.innerHTML = "";

	let simpleHTMLTables = SimplifyHTMLTable.Util.generateSimpleHTMLTablesOutOfComplicatedHTMLTable(htmlTableElem);

	let htmlTableRef = htmlTableElem.getAttribute(SimplifyHTMLTable.Util.tableReferenceForLinkAttribute);

	for (simpleHTMLTable of simpleHTMLTables) {
		simpleHTMLTable.setAttribute("hidden", "true");
	}

	simpleTablesContainer.append(...simpleHTMLTables);
}

function toggleBetweenSimpleTablesAndTheComplicatedTable() {
	if (simpleTablesContainer.children.length == 0) {
		generateSimpleTables(complicatedTableContainer.firstElementChild);
	}
	
	SimplifyHTMLTable.Util.toggleSimpleHTMLTableAndComplicatedHTMLTable(
		complicatedTableContainer.firstElementChild.getAttribute(SimplifyHTMLTable.Util.tableReferenceForLinkAttribute)
	);
}
simpleTableToggle.addEventListener("change", toggleBetweenSimpleTablesAndTheComplicatedTable);

function renderTable() {
	document.getElementById("step1").style.display = "none";
	document.getElementById("step2").style.display = "block";
	complicatedTableContainer.innerHTML = tableSourceCodeTextBox.value;

	if (simpleTableToggle.checked) {
		toggleBetweenSimpleTablesAndTheComplicatedTable();
	}
}
renderTableSourceCodeBtn.addEventListener("click", renderTable);