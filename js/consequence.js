
export const expressions = new Set();

export function addToSet(expression) {
    expressions.add(expression);
    const newExpression = document.createElement("label");
    newExpression.setAttribute("for", "setform");
    document.getElementById("setForm").appendChild(newExpression);
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