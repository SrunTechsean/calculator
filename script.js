
const keypad = document.querySelector('.keypad');
const display = document.querySelector('.display');

// Variables 
let firstNum = '0';
let nextNum = '';
let operator = null;
let operatorSymbol = '';
let displayVar = '';

const operatorArr = ['add', 'subtract', 'multiply', 'divide'];

// Math function
const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b == 0) ? 'Error' : (a / b).toFixed(2);

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
    // Calculate when all condition are full
    else if (nextNum !== '' && operator !== null) {
        firstNum = operate(operator, firstNum, nextNum);
        nextNum = '';
        operatorSymbol = '';
    }


    // Set new operator 
    if (operatorArr.includes(action)) {
        // set operator to show for display
        operatorSymbol = setOperator(action);
        operator = action;
    }

    // Clear the display to 0
    else if (action === "clearAll") {
        firstNum = '0';
        nextNum = '';
        operatorSymbol = '';
        operator = null;
        console.log('current', current, 'firstNum', firstNum, 'nextNum', nextNum, 'operator', operator)

    }
    return displayVar = `${firstNum}${operatorSymbol}${nextNum}`;
}

function setOperator(operator) {
    switch (operator) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '×';
        case 'divide': return '÷';
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
        default: console.log('no operate');
    }
}

function updateDisplay(value) {
    display.textContent = value;
} 
