
const keypad = document.querySelector('.keypad');
const display = document.querySelector('.display');

// Variables 
let firstNum = '0';
let nextNum = '';
let operator = null;
let operatorSymbol = '';

// Math function
const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0) ? 'Error' : (a / b).toFixed(2);

// Get User's Input
keypad.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const { action, value } = btn.dataset;

    if (value != undefined) {
        let displayNum = handleNum(value);
        updateDisplay(displayNum);
    } else if (action) {
        handleAction(action);
        updateDisplay(firstNum);
    }
})

function handleNum(value) {
    let current = operator === null ? firstNum : nextNum;
    if (current === '0') {
        current = value;
        console.log(current, "working")
    } else {
        current += value;
    }

    if (firstNum === '0') {
        firstNum = current;
    } else {
        nextNum = current;
    }
    return current;
}

// calculate when all condition are full
function handleAction(action) {
    if (action !== 'equal') {
        operator = action;
    }

    if (firstNum !== '0' && nextNum !== '' && operator !== null) {
        firstNum = operate(operator, firstNum, nextNum);
        nextNum = '';
    }

    console.log(`firstNum: ${firstNum}, operator: ${operator}, nextNum: ${nextNum}`);
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
