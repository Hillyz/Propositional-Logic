import { NONVARIABLES, operators } from "./constants.js";
import { assert, isBinary } from "./utils.js";

export function variableToValues(array, binaryCombinations) {
    let newExp = '';
    let usedVariables = {};
    let i = 0;
    for (const element of array) {
        if (!NONVARIABLES.includes(element)) {
            if (element in usedVariables) {
                newExp += usedVariables[element];
            } else {
                newExp += binaryCombinations.charAt(i);
                usedVariables[element] = binaryCombinations.charAt(i);
                i++;
            }
            continue;
        }
        newExp += element;
    }
    return newExp;
}

function toRPN(expression) {
    const opSymbols = Object.keys(operators);
    expression = expression.replace(/\s+/g, '').split(/([\→\∨\∧\¬\(\)])/).filter(token => token);
    const stack = [];
    let output = '';

    const peek = () => {
        return stack.at(-1);
    };

    const addToOutput = (token) => {
        output += token;
    };

    const handleToken = (token) => {
        let x = 0;
        switch (true) {
            case isBinary(token):
                addToOutput(token);
                break;
            case opSymbols.includes(token):
                const o1 = token;
                let o2 = peek();

                while (
                    o2 !== undefined &&
                    o2 !== '(' &&
                    (operators[o2].prec > operators[o1].prec ||
                        (operators[o2].prec === operators[o1].prec &&
                            operators[o1].assoc === 'left'))
                ) {
                    addToOutput(stack.pop());
                    o2 = peek();
                }
                stack.push(o1);
                break;
            case token === '(':
                stack.push(token);
                break;
            case token === ')':
                let topOfStack = peek();
                while (topOfStack !== '(') {
                    assert(stack.length !== 0);
                    addToOutput(stack.pop());
                    topOfStack = peek();
                }
                assert(peek() === '(');
                stack.pop();
                break;
            default:
                throw new Error(`Invalid token: ${token}`);
        }
    };

    for (let i of expression) {
        handleToken(i);
    }

    while (stack.length !== 0) {
        assert(peek() !== '(');
        addToOutput(stack.pop());
    }

    return output;
};

export function solve(expression) {
    const postfix = toRPN(expression);
    const stack = [];

    for (let i = 0; i < postfix.length; i++) {
        const token = postfix[i];
        if (isBinary(token)) {
            stack.push(token);
        } else {
            if (operators[token].unary) {
                const n = stack.pop();
                const res = negation(n);
                stack.push(res);
            } else {
                const n1 = stack.pop();
                const n2 = stack.pop();
                const res = binaryOperation(n1, n2, token);
                stack.push(res);
            }
        }
    }
    return stack;
}

function negation(n) {
    if (n === '1') return '0';
    else if (n === '0') return '1';
}

function binaryOperation(n1, n2, op) {
    switch (op) {
        case "→":
            //n2 comes before n1 here because implication is right associative
            if (n2 === '1' && n1 === '0') return '0';
            return '1';
        case "∨":
            if (n1 === '0' && n2 === '0') return '0';
            return '1';
        case "∧":
            if (n1 === '1' && n2 === '1') return '1';
            return '0';
        default:
            break;
    }
}
