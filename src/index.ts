import { Model, TableModelUtils } from "jssimplifytable"

export { TableModelUtils as ModelUtils }
export type { Model }

export class Util {

	public static tableCellDataColumnHeaderSeparator = " - ";
	public static tableCellDataColumnHeaderAttribute = "data-column-header";

	public static tableCellDataRowHeaderSeparator = " - ";
	public static tableCellDataRowHeaderAttribute = "data-row-header";

	public static tableLinkAttribute="data-simplifyHTMLTable-link";
	public static tableReferenceForLinkAttribute="data-simplifyHTMLTable-ref"


	public static importHTMLTableCellIntoModel(htmlCell: HTMLTableCellElement): Model.Cell {
		return {
			colSpan: (htmlCell.hasAttribute("colspan") ? parseInt(htmlCell.getAttribute("colspan") as string) : 1),
			rowSpan: (htmlCell.hasAttribute("rowspan") ? parseInt(htmlCell.getAttribute("rowspan") as string) : 1),
			columnHeaders: [],
			rowHeaders: [],
			isHeading: (htmlCell.tagName === "TH" ? true : false),
			rawContent: htmlCell.innerHTML,
			text: (htmlCell.textContent === null ? "" : htmlCell.textContent),
			type: (htmlCell.hidden ? "shadow" : "normal"),
			shadowAttributes: {
				duplicatedColumnHeading: false,
				duplicatedRowHeading: false
			},
			tags: (htmlCell.classList.length > 0 ? htmlCell.className.split(" ") : [])
		}
	}

	public static exportCellModel(cell: Model.Cell, allowSpan: boolean = true) {
		let htmlCell: HTMLTableCellElement;
		
		if (cell.isHeading) {
			htmlCell = document.createElement("th");
		} else {
			htmlCell = document.createElement("td");
		}

		htmlCell.innerHTML = cell.rawContent;
		if (allowSpan && cell.type === "normal") {
			cell.rowSpan > 1 ? htmlCell.rowSpan = cell.rowSpan : false;
			cell.colSpan > 1 ? htmlCell.colSpan = cell.colSpan : false;
		}

		if (cell.tags !== undefined && cell.tags.length > 0) {
			htmlCell.className = cell.tags.join(" ");
		}

		(cell.columnHeaders.length > 0 ? htmlCell.setAttribute(this.tableCellDataColumnHeaderAttribute, cell.columnHeaders.join(this.tableCellDataColumnHeaderSeparator)): false);
		(cell.rowHeaders.length > 0 ? htmlCell.setAttribute(this.tableCellDataRowHeaderAttribute, cell.rowHeaders.join(this.tableCellDataRowHeaderSeparator)): false);

		return htmlCell;

	}

	public static exportRowModelIntoHTMLTableRow(row: Model.Row) {
		let htmlRow = document.createElement("tr");
		
		row.rowHeaders.length > 0 ? htmlRow.setAttribute(this.tableCellDataRowHeaderAttribute, row.rowHeaders.join(this.tableCellDataRowHeaderSeparator)) : false;
		
		for (let cell of row.cells) {
			htmlRow.appendChild(this.exportCellModel(cell));
		}

		return htmlRow;
	}

	public static exportTableSectionModel(tSection: Model.Row[], category: "head" | "body" | "foot") {
		let htmlTSection = document.createElement(`t${category}`);

		for (let row of tSection) {
			htmlTSection.appendChild(this.exportRowModelIntoHTMLTableRow(row));
		}

		return htmlTSection;
	}

	public static importTableSectionIntoModel(tSection: HTMLTableSectionElement): Model.Row[] {
		let tSectionModel: Model.Row[] = [];

		for (let row of tSection.getElementsByTagName("tr")) {
			let rowModel: Model.Row = {
				cells: [],
				rowHeaders: []
			};
			for (let column of row.querySelectorAll("td,th")) {
				rowModel.cells.push(Util.importHTMLTableCellIntoModel(column as HTMLTableCellElement));
			}
			tSectionModel.push(rowModel)
		}

		return tSectionModel;
	}

	public static exportTableModel(table: Model.Table): HTMLTableElement {
		let htmlTable = document.createElement("table");

		if (table.tags !== undefined && table.tags.length > 0) {
			htmlTable.className = table.tags.join(" ");
		}

		if (table.caption !== null) {
			let caption = document.createElement("caption");
			caption.innerHTML = table.caption;
			htmlTable.appendChild(caption);
		}

		if (table.thead.length > 0) {
			htmlTable.appendChild(this.exportTableSectionModel(table.thead, "head"));
		}

		if (table.tbody.length > 0) {
			htmlTable.appendChild(this.exportTableSectionModel(table.tbody, "body"));
		}

		if (table.tfoot.length > 0) {
			htmlTable.appendChild(this.exportTableSectionModel(table.tfoot, "foot"));
		}

		return htmlTable;
	}

	public static importHTMLTableIntoModel(table: HTMLTableElement): Model.Table {
		let captionElems = table.getElementsByTagName("caption");
		let theadElems = table.getElementsByTagName("thead");
		let tbodyElems = table.getElementsByTagName("tbody");
		let tfootElems = table.getElementsByTagName("tfoot");
		
		let caption: string | null = null;
		if (captionElems.length > 0) {
			caption = (captionElems[0].textContent !== null ? captionElems[0].textContent : null);
		}
		
		let theadModel: Model.Row[] = [];
		let tbodyModel: Model.Row[] = [];
		let tfootModel: Model.Row[] = [];

		for (let theadSection of theadElems) {
			theadModel.push(...Util.importTableSectionIntoModel(theadSection));
		}
		
		for (let tbodySection of tbodyElems) {
			tbodyModel.push(...Util.importTableSectionIntoModel(tbodySection))
		}
		
		for (let tfootSection of tfootElems) {
			tfootModel.push(...Util.importTableSectionIntoModel(tfootSection))
		}
		
		return {
			caption: caption,
			tags: (table.className !== "" ? table.className.split(" ") : []),
			thead: theadModel,
			tbody: tbodyModel,
			tfoot: tfootModel
		}
	}

	public static toggleSimpleHTMLTableAndComplicatedHTMLTable(complicatedHTMLTableRef: string): boolean {
		let complicatedHTMLTable = document.querySelector(`table[${this.tableReferenceForLinkAttribute}="${complicatedHTMLTableRef}"]`);

		if (complicatedHTMLTable === null) {
			return false;
		}

		let simpleHTMLTables = document.querySelectorAll(`table[${this.tableLinkAttribute}="${complicatedHTMLTableRef}"]`);

		if (simpleHTMLTables.length === 0) {
			return false;
		}

		// do not operate on CSS style attribute 'display' as this is not animatable. By setting/unsetting 'hidden' as HTML attribute on the HTML table elements we give designers control over how the tables should (dis)appear
		if (complicatedHTMLTable.hasAttribute("hidden")) {
			complicatedHTMLTable.removeAttribute("hidden");

			for (let simpleHTMLTable of simpleHTMLTables) {
				simpleHTMLTable.setAttribute("hidden", "true");
			}
		} else {
			complicatedHTMLTable.setAttribute("hidden", "true");
			
			for (let simpleHTMLTable of simpleHTMLTables) {
				simpleHTMLTable.hasAttribute("hidden") ? simpleHTMLTable.removeAttribute("hidden") : false;
			}
		}

		return true;
	}

	public static generateSimpleHTMLTablesOutOfComplicatedHTMLTable(complicatedHTMLTable: HTMLTableElement) {
		function generateRef() {
			const refPrefix = "simplifyHTMLTable_Ref";
			let n = 0;
			while (document.querySelector(`table[${this.tableReferenceForLinkAttribute}="${refPrefix}-${n}"]`) !== null) {
				n++;
			}
			
			return `${refPrefix}-${n}`;
		}

		// 1. load complicated HTML table into a complicated table model defined by SimplifyTable library.
		let complicatedTableModel = Util.importHTMLTableIntoModel(complicatedHTMLTable);

		// 2. generate reference id and assign it as HTML attribute to complicated HTML table.
		let ref = generateRef.bind(this)();
		complicatedHTMLTable.setAttribute(this.tableReferenceForLinkAttribute, ref);

		// 3. Add shadow cells and header information in-place in the complicated table model.
		TableModelUtils.addShadowCellsAndHeaderInformationToEachCell(complicatedTableModel);

		// 4. Generate simpler cells using the information inside the complicated table model added in the previous step.
		let simpleTableModels = TableModelUtils.generateSimpleTabelModelsOutOfComplicatedTableModel(complicatedTableModel);

		// 5. Generate HTML for the simpler cells
		let simpleHTMLTables: HTMLTableElement[] = [];
		for (let simpleTabelModel of simpleTableModels) {
			let simpleHTMLTable = this.exportTableModel(simpleTabelModel);

			simpleHTMLTable.setAttribute(this.tableLinkAttribute, ref);
			simpleHTMLTables.push(simpleHTMLTable);
		}

		return simpleHTMLTables;
	}

}