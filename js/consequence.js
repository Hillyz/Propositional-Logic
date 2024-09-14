import { expressionIsValid, solve } from "./logic.js";
import { expressionValues } from "./table.js";
import { assert, generateBinary, getUniqueVars, removeItemOnce } from "./utils.js";

export const expressions = new Set();

export function addToSet(expression) {
    const checkExpression = expression.replace(/\s+/g, '').split(/([\→\∨\∧\¬\(\)])/).filter(token => token);
    
    assert(expressionIsValid(checkExpression));
    if (expressions.has(expression)) return;
    expressions.add(expression);

    solveNewExpression(expression);

    const newDiv = document.createElement("div");
    newDiv.setAttribute("name", "expressiondiv");
    newDiv.setAttribute("class", "expressiondiv");

    const newExpression = document.createElement("label");
    newExpression.setAttribute("class", "expression");
    newExpression.innerHTML = expression; 
    newDiv.appendChild(newExpression);

    const delButton = document.createElement("button");
    delButton.setAttribute("class", "delbutton");
    delButton.setAttribute("type", "button");
    delButton.setAttribute("id", "❌");
    delButton.innerHTML = "❌";
    delButton.addEventListener("click", () => {
        removeFromSet(expression);
        newDiv.remove();
    });
    newDiv.appendChild(delButton);

    document.getElementById("expressionsdiv").appendChild(newDiv);
}

function solveNewExpression(expression) {
    if (!expressionValues.has(expression)) {
        const varNum = getUniqueVars(expression).size;
        const rowNum = (varNum === 1) ? 2 : Math.pow(varNum, 2);
        const binaryCombinations = generateBinary(varNum);
        expressionValues.set(expression, binaryCombinations);

        for (let row = 0; row < rowNum; row++) {
            const res = solve(expression, binaryCombinations[row]);

            if (expressionValues.get(expression)[row].length < varNum + 1)
                expressionValues.get(expression)[row].push(res.toString());
        }
        console.log(expressionValues);
    } 
}

function removeFromSet(expression) {
    expressions.delete(expression);
}

export function clear() {
    const divs = document.getElementsByClassName("expressiondiv");
    while (divs.length > 0) 
        divs[0].parentNode.removeChild(divs[0]);
    expressions.clear();
}

export function logicalConsequence(expression) {
    const lc = isLogicalConsequence(expression);
    console.log(lc);
    if (lc) {
        document.getElementById("result").innerHTML = `A ⊨ ` + expression;
        document.getElementById("result").setAttribute("style", "background-color: #16a34a")
    } else if (lc === false) {
        document.getElementById("result").innerHTML = `Not a logical consequence`;
        document.getElementById("result").setAttribute("style", "background-color: #ef4444");
    } else {
        document.getElementById("result").innerHTML = "Is your expression a logical consequence?";
        document.getElementById("result").setAttribute("style", "background-color: #e4e4e7");
    }
}

function isLogicalConsequence(expression) {
    if (expressions.size === 0) return null;
    console.log(expressions);
    console.log(expressionValues);
    const setVariables = new Map();
    
    for (const ex of expressions) {
        console.log("looking at " + ex);
        const vals = expressionValues.get(ex);
        const uniqueVars = []
        getUniqueVars(ex).forEach(x => uniqueVars.push(x));
        
        for (const val of vals) {
            console.log(val);
            if (val[val.length-1] === "1") {
                console.log("True evaluation");
                const evals = val.slice(0, -1);
                for (let i = 0; i < evals.length; i++) {
                    const evaluation = evals[i];
                    const uniqueVar = uniqueVars[i];
                    setVariables.set(uniqueVar, evaluation);
                }
            }
        }
        console.log(setVariables);
        const expressionVars = [];
        getUniqueVars(expression).forEach(x => expressionVars.push(x));
        let relevantValues = [];
        const relevantVars = [];
        setVariables.forEach((_value, key) => {
            if (expressionVars.includes(key)) {
                console.log("relevant key: " + key);
                relevantValues.push(setVariables.get(key));
                relevantVars.push(key);
            }
        })

        console.log("\n----solve----\n");
        console.log("expression: " + expression);
        console.log("variables: " + relevantValues);
        console.log("\n----solve----\n");

        if (relevantValues.length === 0) return false;
        
        if (relevantValues.length < expressionVars.length) {
            console.log("Expression longer than set expression");
            relevantValues = fulfillRelevantVars(expression, relevantValues, relevantVars);

            for (const row of relevantValues) {
                if (solve(expression, row).toString() === '0') return false;
            }
            return true;
        }
        
        return solve(expression, relevantValues).toString() === '1';
    }
}

function fulfillRelevantVars(expression, relevantValues, relevantVars) {
    const uniqueVars = [];
    getUniqueVars(expression).forEach(x => uniqueVars.push(x));
    console.log(uniqueVars + " vs " + relevantVars);

    const lockedValues = [];
    for (let i = 0; i < uniqueVars.length; i++) {
        const element = uniqueVars[i];
        if (relevantVars.includes(element)) {
            lockedValues.push(i);
        }
    }
    
    console.log("RELEVANT VARS: " + relevantVars);
    console.log("RELEVANT VALUES: " + relevantValues);
    console.log("LOCKED INDEX: " + lockedValues);
    

    const binary = generateBinary(uniqueVars.length);
    
    const toBeRemoved = []

    for (const row of binary) {
        for (let j = 0; j < row.length; j++) {
            const value = row[j];
            if (lockedValues.includes(j) ) {
                if (value !== relevantValues[j]) {
                    console.log("removing :" + row);
                    toBeRemoved.push(row);
                }
            }
        }
    }

    for (const element of toBeRemoved) {
        removeItemOnce(binary, element);
    }

    console.log(binary);
    return binary;
}


let active = false;

export function showHelp() {
    if (active) {
        document.getElementById("helptext").remove();
        active = false;
        return;
    }
    active = true;

    const textDiv = document.createElement("div");
    textDiv.setAttribute("id", "helptext");

    const title = document.createElement("h3");
    title.innerHTML = "Logical consequence explained"

    const p1 = document.createElement("p");
    p1.innerHTML = `Logical consequence is defined by what follows a set of prerequisites. For example if a prerequisite is that P and Q both are true (P∧Q), 
    then the logical consequence that follows is that P must also be true. This means that P is a logical consequence of P∨Q. However if the prerequisite is that either P or Q (P∨Q) is true,
    then we can't conclude whether P is true or not. Therefore P is not a logical consequence of P∨Q.`

    const p2 = document.createElement("p");
    p2.innerHTML = `Here you can add expressions to a set, and see if your expression is a logical consequence of that set or not. We use the token ⊨  to show that an expression is a logical
    consequence. For example set A={P∧Q}. A ⊨  P. `

    textDiv.appendChild(title);
    textDiv.appendChild(p1);
    textDiv.appendChild(p2);

    document.getElementById("container").appendChild(textDiv);

}