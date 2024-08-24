import { solve } from "./logic.js";
import { generateBinary, getUniqueVars } from "./utils.js";

export function generateTable(expression) {
    if (document.getElementById("table") !== null) {
        let tbl = document.getElementById("table");
        tbl.parentNode.removeChild(tbl);
    }

    const table = document.createElement("table");
    table.setAttribute("id", "table");

    generateHeadRow(table, expression);
    const variablesNum = getUniqueVars(expression).size;
    generateRows(table, variablesNum, expression);
    document.body.appendChild(table);
}

function generateHeadRow(table, expression) {
    const uniqueVars = getUniqueVars(expression);

    const tableRow = document.createElement("tr");
    tableRow.setAttribute("id", "headrow");

    for (const variable of uniqueVars) {
        const tableHead = document.createElement("th");
        tableHead.innerHTML = variable;
        tableRow.appendChild(tableHead);
    }

    const expressionHeader = document.createElement("th"); //final column, propositional expression
    expressionHeader.innerHTML = document.getElementById('inputString').value;

    tableRow.appendChild(expressionHeader);
    table.appendChild(tableRow);
}

function generateRows(table, varNum, expression) {
    const rowNum = Math.pow(2, varNum);
    const binaryCombinations = generateBinary(varNum);

    if (!expressionValues.has(expression))
        addToMap(expression, binaryCombinations);

    for (let row = 0; row < rowNum; row++) {
        let tableRow = document.createElement("tr");
        let tableDiv;
        for (let col = 0; col < varNum; col++) {
            tableDiv = document.createElement("td");
            tableDiv.innerHTML = binaryCombinations[row][col];
            tableRow.appendChild(tableDiv);
        }

        let resultDiv = document.createElement("td");
        let values = binaryCombinations[row];

        const result = solve(expression, values);
        expressionValues.get(expression)[row].push(result.toString());

        resultDiv.innerHTML = result;
        tableRow.appendChild(resultDiv);
        table.appendChild(tableRow);
    }
}

function addToMap(expression, values) {
    expressionValues.set(expression, values);
    console.log(expressionValues);
}
const expressionValues = new Map();