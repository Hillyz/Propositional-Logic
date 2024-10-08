import { addToSet, clear, logicalConsequence, showHelp } from "./consequence.js";
import { generateTable } from "./table.js";
import { addConnective } from "./utils.js";

function getInput() {
    let expression;
    document.getElementById('stringForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const inputString = document.getElementById('inputString').value;
        expression = inputString.replace(/\s+/g, '');
        document.getElementById('label').innerText = "Enter a logical expression:";
        try {
            generateTable(expression);
            logicalConsequence(expression);
        } catch (err) {
            document.getElementById('label').innerText = "Enter a logical expression: Invalid expression";
            console.log(err);
        }
        
    });
    
    document.getElementById("setbutton").addEventListener("click", (event) => {
        event.preventDefault();
        const inputString = document.getElementById('inputString').value;
        expression = inputString.replace(/\s+/g, '');
        document.getElementById('label').innerText = "Enter a logical expression:";
        try{
            addToSet(expression);
        } catch (err) {
            document.getElementById('label').innerText = "Enter a logical expression: Invalid expression";
            console.log(err);
        }
    });

    document.getElementById("clearbutton").addEventListener("click", () => {
        clear();
    })
}

function buttonEvents() {
    document.getElementById("¬").addEventListener("click", () => {
        addConnective('¬');
    });
    document.getElementById("∧").addEventListener("click", () => {
        addConnective('∧');
    });
    document.getElementById("∨").addEventListener("click", () => {
        addConnective('∨');
    });
    document.getElementById("→").addEventListener("click", () => {
        addConnective('→');
    });
    document.getElementById("helpbutton").addEventListener("click", () => {
        showHelp();
    });
}

function main() {
    buttonEvents();
    getInput();
}
main();