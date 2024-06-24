const CONNECTIVES = ["→", "∨", "∧", "¬"];



function getInput() {
    document.getElementById('stringForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const inputString = document.getElementById('inputString').value;
        const logEx = inputString.replaceAll(" ", "").split('');
        if (!validInput(logEx)) {
            document.getElementById('inputString').value = null;
            document.getElementById('label').innerText = "Enter a logical expression: Invalid expression";
        } else {
            document.getElementById('label').innerText = "Enter a logical expression:";
            generateTable(logEx);
        }
    });
}

//https://stackoverflow.com/questions/11076975/how-to-insert-text-into-the-textarea-at-the-current-cursor-position
function addConnective(connective) {

    const inputField = document.getElementById("inputString");
    //IE support
    if (document.selection) {
        inputField.focus();
        sel = document.selection.createRange();
        sel.text = connective;
    }
    //MOZILLA and others
    else if (inputField.selectionStart || inputField.selectionStart == '0') {
        var startPos = inputField.selectionStart;
        var endPos = inputField.selectionEnd;
        inputField.value = inputField.value.substring(0, startPos)
            + connective
            + inputField.value.substring(endPos, inputField.value.length);
    } else {
        inputField.value += connective;
    }
    document.getElementById("inputString").focus();
}

function validInput(array) {
    //check if expression includes at least one var and always one more var than connective (except negation)

    if (array[0] === "") return false; // check if the input is empty

    let varCounter = 0;
    let conneCounter = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (CONNECTIVES.includes(element)) conneCounter++;
        else varCounter++;
    }
    if (varCounter < 1) return false;
    else if (varCounter === 1) {
        if (conneCounter <= 1) return true;
        else return false;
    }
    return varCounter - conneCounter === 1;
}

function generateTable(array) {
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

    const tableRow = document.createElement("tr");
    tableRow.setAttribute("id", "headrow");

    uniqueVars = new Set();

    for (let index = 0; index < headerArray.length; index++) {
        const header = headerArray[index];
        if (!CONNECTIVES.includes(header) && !uniqueVars.has(header)) {
            const tableHead = document.createElement("th");
            tableHead.setAttribute("id", "head" + index);
            tableHead.innerHTML = header;
            tableRow.appendChild(tableHead);

            uniqueVars.add(header);
            variablesNum++;
        }
    }
    const propEx = document.createElement("th"); //final column, propositional expression
    propEx.setAttribute("id", "propExHeader");
    propEx.innerHTML = document.getElementById('inputString').value;

    tableRow.appendChild(propEx);
    table.appendChild(tableRow);

    return variablesNum;
}

function generateRows(table, varNum, array) {
    const rowNum = Math.pow(2, varNum);
    const binaryCombinations = generateBinary(varNum);
    const connective = getConnective(array);


    for (let row = 0; row < rowNum; row++) {
        let tableRow = document.createElement("tr");
        let tableDiv;
        for (let col = 0; col < varNum; col++) {
            tableDiv = document.createElement("td");
            tableDiv.innerHTML = binaryCombinations[row].charAt(col);
            tableRow.appendChild(tableDiv);
        }

        let resultDiv = document.createElement("td");
        resultDiv.innerHTML = calculate(connective, binaryCombinations[row]);
        tableRow.appendChild(resultDiv);


        table.appendChild(tableRow);
    }
}


function getConnective(array) {
    return array.find(element => CONNECTIVES.includes(element));
}


// Works for expressions with 2 or less variables
function calculate(connective, values) {
    if (typeof connective === "undefined") return values.charAt(0);
    if (connective === "¬") {
        if (values.charAt(0) === "1") return "0";
        return "1";
    } else if (connective === "→") {
        if (values.length === 1) return "1";
        if (values.charAt(0) === "1" && values.charAt(1) === "0") return "0";
        else return "1";
    } else if (connective === "∨") {
        if (values.length === 1) return values.charAt(0);
        if (values.charAt(0) === "0" && values.charAt(1) === "0") return "0";
        else return "1";
    } else if (connective === "∧") {
        if (values.length === 1) return values.charAt(0);
        if (values.charAt(0) === "1" && values.charAt(1) === "1") return "1";
        else return "0";
    }
}


//Generated by GPT-4o
function generateBinary(n) {
    const combinations = [];
    const totalCombinations = Math.pow(2, n);

    for (let i = 0; i < totalCombinations; i++) {
        binary = "";
        for (let j = n - 1; j >= 0; j--) {
            bit = (i >> j) & 1; //dafuq ????
            binary += bit.toString();
        }
        combinations.push(binary);
    }
    return combinations.reverse();
}


getInput();