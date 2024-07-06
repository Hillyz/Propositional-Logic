
export const expressions = new Set();

export function addToSet(expression) {
    expressions.add(expression);
    const newExpression = document.createElement("label");
    newExpression.setAttribute("for", "setform");
    document.getElementById("setForm").appendChild(newExpression);
}