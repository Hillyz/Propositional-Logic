import { solve, variableToValues } from "./logic.js";
import {generateBinary} from "./utils.js";
import { NONVARIABLES } from "./constants.js";

export function generateTable(array) {
    if (document.getElementById("table") !== null) {
        let tbl = document.getElementById("table");
        tbl.parentNode.removeChild(tbl);
    }

    const table = document.createElement("table");
    table.setAttribute("id", "table");

    const variablesNum = generateHeadRow(table, array);
    generateRows(table, variablesNum, array);
    document.body.appendChild(table);
}

function generateHeadRow(table, headerArray) {
    let variablesNum = 0;
    let uniqueVars = new Set();

    const tableRow = document.createElement("tr");
    tableRow.setAttribute("id", "headrow");

    for (let index = 0; index < headerArray.length; index++) {
        const header = headerArray[index];
        if (!NONVARIABLES.includes(header) && !uniqueVars.has(header)) {
            const tableHead = document.createElement("th");
            tableHead.innerHTML = header;
            tableRow.appendChild(tableHead);

            uniqueVars.add(header);
            variablesNum++;
        }
    }
    const propEx = document.createElement("th"); //final column, propositional expression
    propEx.innerHTML = document.getElementById('inputString').value;

    tableRow.appendChild(propEx);
    table.appendChild(tableRow);

    return variablesNum;
}

function generateRows(table, varNum, array) {
    const rowNum = Math.pow(2, varNum);
    const binaryCombinations = generateBinary(varNum);

    for (let row = 0; row < rowNum; row++) {
        let tableRow = document.createElement("tr");
        let tableDiv;
        for (let col = 0; col < varNum; col++) {
            tableDiv = document.createElement("td");
            tableDiv.innerHTML = binaryCombinations[row].charAt(col);
            tableRow.appendChild(tableDiv);
        }
        
        let resultDiv = document.createElement("td");
        let values = binaryCombinations[row];
        const binaryExpression = variableToValues(array, values);

        resultDiv.innerHTML = solve(binaryExpression);
        tableRow.appendChild(resultDiv);
        table.appendChild(tableRow);
    }
}