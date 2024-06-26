export const NONVARIABLES = ["→", "∨", "∧", "¬", '(', ')'];

export const operators = {
    '¬': {
        prec: 4,
        assoc: 'right',
        unary: true,
    },
    '∧': {
        prec: 3,
        assoc: 'left',
        unary: false,
    },
    '∨': {
        prec: 2,
        assoc: 'left',
        unary: false,
    },
    '→': {
        prec: 1,
        assoc: 'right',
        unary: false,
    },
};