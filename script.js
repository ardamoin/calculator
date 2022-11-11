const keys = [...[...Array(10).keys()].map(String), "."];
const operatorKeys = ["%", "/", "+", "-", "x"];
let displayText = document.querySelector(".display");
let calculationText = document.querySelector(".calculation");
const numberDivs = document.querySelectorAll('.number');
const clearButton = document.querySelector(".clear");
const allClearButton = document.querySelector(".all-clear");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector(".dot");
const equalsButton = document.querySelector(".equals");
let reset = false;
const calculationExp = /^[0-9]\d*(\.\d+)?[+\-\x\/\%]$/;

function add(num1, num2) {
    return num1 + num2;
}


function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function mod(num1, num2) {
    return num1 % num2;
}

function operate(num1, operator, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case '+':
            return add(num1, num2);

        case '-':
            return subtract(num1, num2);

        case 'x':
            return multiply(num1, num2);

        case '/':
            return divide(num1, num2);
        
        case '%':
            return mod(num1, num2);
    }
}

function myEval(expression) {
    let total = 0;
    expression = expression.replace(/\s/g, ""); // removes empty spaces from expression
    let matchedArray = expression.match(/[+\-\x\/\%]*(\.\d+|\d+(\.\d+)?)/g);

    while (matchedArray.length) {
        const firstChar = operatorKeys.includes(matchedArray[0].charAt(0)) ? matchedArray[0].charAt(0) : "+";
        total = operate(total, firstChar, matchedArray.shift().replace(/[\+\-\x\/\%]/,''));
    }

    return total;
}

/**
 * Start with zero
 * 
 * When entered a number, replace zero with that number, 
 * when an operator is called write initial number + operator to calculation field
 * 
 * 
 * 
 */

numberDivs.forEach(number => {
    number.addEventListener('mousedown', () => {
        //console.log(number.textContent);
        if (reset) {
            displayText.textContent = number.textContent;
        } else {
            displayText.textContent += number.textContent;
        }
    })
})

window.addEventListener('keydown', function(e) {
    e.key = (e.key === "Shift") ? "" : e.key;
    //console.log(e.key);
    if (!reset && keys.includes(e.key)) {
        displayText.textContent += e.key;
    } else if (operatorKeys.includes(e.key) && !reset) {
        reset = true;

        if (calculationExp.test(calculationText.textContent)) {
            calculationText.textContent = myEval(calculationText.textContent + displayText.textContent) + e.key;
        } else {
            calculationText.textContent += displayText.textContent + e.key;
        }

    } else if(reset && keys.includes(e.key)) {
        displayText.textContent = e.key;
        reset = false;
    }

    if (e.key === "Backspace") {
        displayText.textContent = displayText.textContent.slice(0, -1);
    } else if (e.key === "Escape" && displayText.textContent !== "") {
        displayText.textContent = "";
    } else if (e.key === "Escape" && displayText.textContent === "") {
        calculationText.textContent = "";
    } else if (e.key === "Enter") {

    }
})









/**
 * if (!reset && keys.includes(e.key)) {
        displayText.textContent += e.key;
    } else if (operatorKeys.includes(e.key) && !reset) {
        //debugger;
        reset = true;
        calculationText.textContent += displayText.textContent + e.key;
    } else if(reset && keys.includes(e.key)) {
        //debugger;
        displayText.textContent = e.key;
        reset = false;
    } else if (calculationExp.test(calculationText.textContent)) {
        //debugger;
        calculationText.textContent = myEval(calculationText.textContent + displayText.textContent) + e.key;
    }
 */