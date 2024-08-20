import { NONVARIABLES } from "./constants.js";

export function generateBinary(n) {
    const combinations = [];
    const totalCombinations = Math.pow(2, n);

    for (let i = 0; i < totalCombinations; i++) {
        let binary = [];
        for (let j = n - 1; j >= 0; j--) {
            let bit = (i >> j) & 1; 
            binary.push(bit.toString());
        }
        combinations.push(binary);
    }
    return combinations.reverse();
}

export function assert(predicate) {
    if (predicate) return;
    throw new Error('Assertion failed due to invalid token');
};

export function isBinary(str) {
    if (str.length === 1 && str.match(/[0-1]/i)) return true;
    return false;
}

export function getUniqueVars(expression) {
    let uniqueVars = new Set();

    for (let i = 0; i < expression.length; i++) {
        const token = expression.charAt(i);
        if (!NONVARIABLES.includes(token) && !uniqueVars.has(token)) {
            uniqueVars.add(token);
        }
    }
    return uniqueVars;
}

//https://stackoverflow.com/questions/11076975/how-to-insert-text-into-the-textarea-at-the-current-cursor-position
export function addConnective(connective) {
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
    inputField.focus();
}