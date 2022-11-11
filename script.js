const keys = [...[...Array(10).keys()].map(String), "."];
const operatorKeys = ["%", "/", "+", "-", "x"];
let displayText = document.querySelector(".display");
let calculationText = document.querySelector(".calculation");
const numberDivs = document.querySelectorAll('.number');
const clearButton = document.querySelector(".clear");
const allClearButton = document.querySelector(".all-clear");
const operators = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
let reset = false;
const calculationExp = /^\-?[0-9]\d*(\.\d+)?\s[+\-\x\/\%]\s$/;
const numsAndOperators = [...numberDivs, ...operators];

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

    if (total === Infinity) {
        return "Can't divide by 0 you DONUT";
    }

    return total;
}

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

function interpretInput(input) {
    if (calculationText.textContent.includes("=") || displayText.textContent.includes("DONUT")) {
        calculationText.textContent = "";
    };

    if (!reset && keys.includes(input) && isNumeric(displayText.textContent + input)) {
        displayText.textContent += input;
    } else if (operatorKeys.includes(input) && !reset) {
        reset = true;

        if (calculationExp.test(calculationText.textContent)) {
            calculationText.textContent = myEval(calculationText.textContent + displayText.textContent) + " " + input + " ";
        } else if (!calculationExp.test(calculationText.textContent) && displayText.textContent !== "") {
            calculationText.textContent += displayText.textContent + " " + input + " ";
        } else if(input === "-") {
            displayText.textContent = input;
        }

    } else if(reset && keys.includes(input) && isNumeric(displayText.textContent + input)) {
        displayText.textContent = (displayText.textContent === "-") ? "-" + input : input;
        reset = false;
    } else if (reset && operatorKeys.includes(input)) {
        calculationText.textContent = calculationText.textContent.slice(0,-2) + input + " ";
    }
}




window.addEventListener('keydown', function(e) {
    e.key = (e.key === "Shift") ? "" : e.key; // to ignore shift key
    interpretInput(e.key);

    if (e.key === "Backspace") {
        displayText.textContent = displayText.textContent.slice(0, -1);
    } else if (e.key === "Escape" && calculationText.textContent !== "") {
        calculationText.textContent = "";
    } else if (e.key === "Escape" && calculationText.textContent === "") {
        displayText.textContent = "";
    } else if (e.key === "Enter" || e.key === "=") {
        if (!calculationText.textContent.includes("=") && operatorKeys.some(key => calculationText.textContent.includes(key))){
            calculationText.textContent += displayText.textContent + " = ";
            displayText.textContent = myEval(calculationText.textContent.slice(0,-2));
        }
    }
})

numsAndOperators.forEach(item => {
    item.addEventListener('mousedown', () => {
        interpretInput(item.textContent);
    })
})

clearButton.addEventListener('mousedown', () => {
    calculationText.textContent = "";
})

allClearButton.addEventListener('mousedown', () => {
    calculationText.textContent = "";
    displayText.textContent = "";
})

equalsButton.addEventListener('mousedown', () => {
    if (!calculationText.textContent.includes("=") && operatorKeys.some(key => calculationText.textContent.includes(key))){
        calculationText.textContent += displayText.textContent + " = ";
        displayText.textContent = myEval(calculationText.textContent.slice(0,-2));
    } else if (calculationText.textContent.includes("=") || displayText.textContent.includes("DONUT")) {
        calculationText.textContent = "";
    }
})