
const keypad = document.querySelector('.keypad');
const display = document.querySelector('.display');

// Variables 
let firstNum = '0';
let nextNum = '';
let operator = null;
let operatorSymbol = '';
let displayVar = '';

const operatorArr = ['add', 'subtract', 'multiply', 'divide', 'percent'];

// Math function
const clean = n => Math.round(n * 1e10) / 1e10;

const add = (a, b) => clean(a + b);
const subtract = (a, b) => clean(a - b);
const multiply = (a, b) => clean(a * b);
const divide = (a, b) => (b == 0) ? 'Error' : clean(a / b).toFixed(2);
const percent = (a) => clean(a / 100).toFixed(2);


// Keyboard support
const keyMap = {
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
    '.': 'dot',
    '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide', '%': 'percent',
    '=': 'equal', 'Enter': 'equal',
    'Backspace': 'backspace',
};

document.addEventListener('keydown', (e) => {
    console.log(e.key)
    const key = keyMap[e.key];
    if (/[0-9]/.test(key)) {
        handleNum(key);
    } else if (operatorArr.includes(key)) {
        handleAction(key);
    } else if (key === 'dot') {
        handleAction(key);
    } else if (key === 'equal') {
        handleAction(key);
    } else if (key === 'backspace') {
        handleAction(key);
    } else if (key === 'clearAll') {
        handleAction(key);
    }

    updateDisplay(displayVar);
})
// Get User's Input
keypad.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const { action, value } = btn.dataset;

    if (value != undefined) {
        displayVar = handleNum(value);
        updateDisplay(displayVar);
    } else if (action) {
        displayVar = handleAction(action);
        updateDisplay(displayVar);
    }
})

function handleNum(value) {
    let current = operator === null ? firstNum : nextNum;

    if (current.includes('.') && value === '.') {
        return;
    }

    // Update the current value
    if (current === '0' && value !== '.') {
        current = value;
    }
    else {
        current += value;
    }

    // Store the value into firstNum or nextNum
    if (operatorSymbol === '') {
        firstNum = current;
    } else {
        nextNum = current;
    }

    console.log('current', current, 'firstNum', firstNum, 'nextNum', nextNum, 'operator', operator)
    return displayVar = `${firstNum}${operatorSymbol}${nextNum}`;
}

function handleAction(action) {

    // Handle dot 
    if (action === 'dot') {
        handleNum('.');
    }
    else if (action === "clearAll") {
        resetVar('0');
    }
    // Backspace
    else if (action === "backspace") {
        backSpace();
    }
    // Calculate when all condition are full
    else if (nextNum !== '' && operator !== null) {
        resetVar(operate(operator, parseFloat(firstNum), parseFloat(nextNum)).toString());
    }

    // Set new operator 
    if (operatorArr.includes(action)) {
        // set operator to show for display
        operatorSymbol = setOperator(action);
        operator = action;
    }
    if (action === 'percent') {
        resetVar(operate(operator, parseFloat(firstNum), parseFloat(nextNum)).toString());
    }
    // Clear the display to 0
    return displayVar = `${firstNum}${operatorSymbol}${nextNum}`;
}

function resetVar(result) {
    firstNum = result;
    nextNum = '';
    operatorSymbol = '';
    operator = null;
}

function backSpace() {
    if (operator === null) {
        // Remove the last input firstNUm
        let update = firstNum.slice(0, -1);
        firstNum = update === '' ? '0' : update;
    } else if (nextNum === '') {

        // Remove Operator
        operatorSymbol = '';
        operator = null;
    } else {

        // Remove the last input of nextNum
        nextNum = nextNum.slice(0, -1);
    }
}

// Return the operator symbol for display
function setOperator(operator) {
    switch (operator) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '×';
        case 'divide': return '÷';
        case 'percent': return '%';
        default: console.log('no setOperate');
    }
}

// Do the fucking operation
function operate(operator, firstNum, nextNum) {
    switch (operator) {
        case 'add': return add(firstNum, nextNum);
        case 'subtract': return subtract(firstNum, nextNum);
        case 'multiply': return multiply(firstNum, nextNum);
        case 'divide': return divide(firstNum, nextNum);
        case 'percent': return percent(firstNum);
        default: console.log('no operate');
    }
}

function updateDisplay(value) {
    display.textContent = value;
}

// TODO: fix nextNum from starting with .
