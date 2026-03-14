// Variables 
let firstNum = '0';
let nextNum = '';
let operator = null;

// Get input from users
const keypad = document.querySelector('.keypad');
keypad.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const { action, value } = btn.dataset;

    if (value != undefined) {
        handleValue(value);
    } else if (action) {
        handleAction(action);
    }
})

function handleValue(value) {
    if (firstNum !== '0') {
        nextNum = value;
        updateDisplay(nextNum);
    } else {
        firstNum = value;
        updateDisplay(firstNum);
    }
}

function handleAction(action) {
    switch (action) {
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide': setOperator(action); break;
        case 'equal': operate(operator);
        default: console.log('No such action');
    }
}

function setOperator(action) {
    let operatorSymbol = '';
    switch (action) {
        case 'add': operatorSymbol = '+'; updateDisplay(operatorSymbol); break;
        case 'subtract':
        case 'multiply':
        case 'divide':
        default: console.log('no such operation');
    }
}

// Math function
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (a / b).toFixed(10);

function operate(operator) {
    switch (operator) {
        case 'add': return add(firstNum, nextNum); break;
        case 'subtract':
        case 'multiply':
        case 'divide':
        default: console.log('no such operation');
    }
}

function updateDisplay(value) {
    const display = document.querySelector('.display');
    if (display.textContent === '0') {
        display.textContent = value;
    } else if (display.textContent.length > 0) {
        display.textContent += value;
    }
} 
