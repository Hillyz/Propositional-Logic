import { generateTable } from "./table.js";
import { addConnective } from "./utils.js";

function getInput() {
    document.getElementById('stringForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const inputString = document.getElementById('inputString').value;
        const logEx = inputString.replaceAll(" ", "").split('');
        document.getElementById('label').innerText = "Enter a logical expression:";
        try {
            generateTable(logEx);
        } catch (err) {
            document.getElementById('label').innerText = "Enter a logical expression: Invalid expression";
            console.log(err);
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

// MAIN
function main() {
    buttonEvents();
    getInput();
}
main();