
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
    updateDisplay(current);
    console.log(`firstNum: ${firstNum}, operator: ${operator}, nextNum: ${nextNum}`);
}

// calculate when all condition are full
function handleAction(action) {
    return;
}

// Do the fucking operation
function operate(operator, firstNum, nextNum) {
    switch (operator) {
        case 'add': return add(firstNum, nextNum);
        case 'subtract':
        case 'multiply':
        case 'divide':
        default: console.log('no operate');
    }
    return result;
}
console.log(operate('add', 1, 1))

function updateDisplay(value) {
    display.textContent = value;
} 
