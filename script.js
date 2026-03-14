
const keypad = document.querySelector('.keypad');
const display = document.querySelector('.display');

// Variables 
let firstNum = '0';
let nextNum = '';
let operator = null;

// Math function
const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (a / b).toFixed(10);

// Get User's Input
keypad.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const { action, value } = btn.dataset;

    if (value != undefined) {
        handleNum(value);
    } else if (action) {
        handleAction(action);
    }
})

function handleNum(value) {
    if (operator === null && firstNum === '0') {
        firstNum = value;
        updateDisplay(firstNum);
        console.log(firstNum)
    } else if (operator === null && firstNum !== '0') {
        firstNum += value;
        console.log(firstNum)
        updateDisplay(firstNum);
    } else {
        nextNum += value;
    }
}

function handleAction(action) {
    switch (action) {
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            setOperator(action);
            break;
        case 'equal': operate(operator); break;
        default: console.log('No handleAction');
    }
}

function setOperator(action) {
    let operatorSymbol = '';
    switch (action) {
        case 'add':
            // Get the symbol for display
            operatorSymbol = '+';

            // Get the operator 
            operator = action;
            console.log(operator)

            updateDisplay(operatorSymbol);
            break;
        case 'subtract':
        case 'multiply':
        case 'divide':
        default: console.log('no setOperator');
    }
}

function operate(operator) {
    display.textContent = '0';
    switch (operator) {
        case 'add':
            firstNum = add(firstNum, nextNum);
            nextNum = 0;
            updateDisplay(firstNum);
            break;
        case 'subtract':
        case 'multiply':
        case 'divide':
        default: console.log('no operate');
    }
}

function updateDisplay(value) {
    if (display.textContent === '0') {
        display.textContent = value;
    } else if (display.textContent.length > 0) {
        display.textContent += value;
    }
} 
