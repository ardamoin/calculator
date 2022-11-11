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
const calculationExp = /^[0-9]\d*(\.\d+)?\s[+\-\x\/\%]\s$/;
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

    return total;
}

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

function inputLogic(input) {
    
}




window.addEventListener('keydown', function(e) {
    e.key = (e.key === "Shift") ? "" : e.key; // to ignore shift key

    if (!reset && keys.includes(e.key) && isNumeric(displayText.textContent + e.key)) {
        displayText.textContent += e.key;
    } else if (operatorKeys.includes(e.key) && !reset) {
        reset = true;

        if (calculationExp.test(calculationText.textContent)) {
            calculationText.textContent = myEval(calculationText.textContent + displayText.textContent) + " " + e.key + " ";
        } else if (displayText.textContent !== "") {
            calculationText.textContent += displayText.textContent + " " + e.key + " ";
        }

    } else if (operatorKeys.includes(e.key) && reset) {
        calculationText.textContent = calculationText.textContent.slice(0,-2) + e.key + " ";
    } else if(reset && keys.includes(e.key)) {
        displayText.textContent = e.key;
        reset = false;
    }

    if (e.key === "Backspace") {
        displayText.textContent = displayText.textContent.slice(0, -1);
    } else if (e.key === "Escape" && calculationText.textContent !== "") {
        calculationText.textContent = "";
    } else if (e.key === "Escape" && calculationText.textContent === "") {
        displayText.textContent = "";
    } else if (e.key === "Enter" || e.key === "=") {
        if (!calculationText.textContent.includes("=")){
            calculationText.textContent +=  displayText.textContent + " = " + myEval(calculationText.textContent + displayText.textContent);
        }
    }
})

numsAndOperators.forEach(item => {
    item.addEventListener('mousedown', () => {
        console.log(item);
        if (!reset && keys.includes(item.textContent) && isNumeric(displayText.textContent + item.textContent)) {
            displayText.textContent += item.textContent;
        } else if (operatorKeys.includes(item.textContent) && !reset) {
            reset = true;
    
            if (calculationExp.test(calculationText.textContent)) {
                calculationText.textContent = myEval(calculationText.textContent + displayText.textContent) + " " + item.textContent + " ";
            } else if (displayText.textContent !== "") {
                calculationText.textContent += displayText.textContent + " " + item.textContent + " ";
            }
    
        } else if (operatorKeys.includes(e.key) && reset) {
            calculationText.textContent = calculationText.textContent.slice(0,-2) + item.textContent + " ";
        } else if(reset && keys.includes(item.textContent)) {
            displayText.textContent = item.textContent;
            reset = false;
        }
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
    if (!calculationText.textContent.includes("=")){
        calculationText.textContent +=  displayText.textContent + " = " + myEval(calculationText.textContent + displayText.textContent);
    }
})