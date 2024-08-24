
export const expressions = new Set();

export function addToSet(expression) {
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

    document.getElementById("setForm").appendChild(newDiv);
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