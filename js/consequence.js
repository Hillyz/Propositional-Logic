import { expressionIsValid } from "./logic.js";
import { assert } from "./utils.js";

export const expressions = new Set();

export function addToSet(expression) {
    const checkExpression = expression.replace(/\s+/g, '').split(/([\→\∨\∧\¬\(\)])/).filter(token => token);
    
    assert(expressionIsValid(checkExpression));
    if (expressions.has(expression)) return;
    expressions.add(expression);

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

function removeFromSet(expression) {
    expressions.delete(expression);
}

export function clear() {
    const divs = document.getElementsByClassName("expressiondiv");
    while (divs.length > 0) 
        divs[0].parentNode.removeChild(divs[0]);
    expressions.clear();
}

function isLogicalConsequence(expression) {
    // First attribute values to all expressions in set
        //We need to find all values that make the entire set true
        //If there are contradictions, return true as everything is a logical consequence of contradictions
    
    for (const ex of expressions) {
    }

    // Then use those values to check if the expression is true
    // If the expression is true using the true values from the set, return true
        /*If the expression is a tautology, always return true 
            as a tautology is a logical consequence of everything*/
    // Else return false
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
    p2.innerHTML = `Here you can add expressions to a set, and see if your expression is a logical consequence of that set or not.`

    textDiv.appendChild(title);
    textDiv.appendChild(p1);
    textDiv.appendChild(p2);

    document.getElementById("container").appendChild(textDiv);

}