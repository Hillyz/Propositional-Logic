import { generateTable } from "./table.js";
import { addConnective } from "./utils.js";
import { expressions, addToSet } from "./consequence.js";

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
        document.getElementById("setbutton").addEventListener("click", () => {
        addToSet(logEx);
        console.log(expressions);
    }, false);
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

function main() {
    buttonEvents();
    getInput();
}
main();