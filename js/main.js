import { generateTable } from "./table.js";
import { addConnective } from "./utils.js";

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
function buttonEvents() {
    document.getElementById("¬").addEventListener("click", () => {
        addConnective('¬');
    }, false);
    document.getElementById("∧").addEventListener("click", () => {
        addConnective('∧');
    }, false);
    document.getElementById("∨").addEventListener("click", () => {
        addConnective('∨');
    }, false);
    document.getElementById("→").addEventListener("click", () => {
        addConnective('→');
    }, false);
}

//UP NEXT
function validInput(array) {
    return true;
    //check if expression includes at least one var and always one more var than connective (except negation)
}


// MAIN
function main() {
    buttonEvents();
    getInput();
}
main();