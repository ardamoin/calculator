const operatorKeys = ["%", "/", "+", "-", "x"];
let displayText = document.querySelector(".display");
const numberDivs = document.querySelectorAll('.number');
const clearButton = document.querySelector(".clear");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector(".dot");
const equalsButton = document.querySelector(".equals");

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

function updateText() {
    if (operatorKeys.includes(this.textContent)) {
        displayText.textContent += " " + this.textContent + " "; // if an operator is used, adds empty space on both sides
    } else {
        displayText.textContent += this.textContent;
    }
}

function doWhichKey(e) { 
    e = e || window.event; 
    let charCode = e.keyCode || e.which;
    return charCode; 
    // return String.fromCharCode(charCode); 
} 

function clearDisplay() {
    displayText.textContent = "";
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

function updateResult(expression) {
    clearDisplay;
    displayText.textContent = myEval(expression);
}


[...numberDivs, ...operators, decimal].forEach(button => {
    button.addEventListener('click', updateText);
});

equalsButton.addEventListener('click', () => {
    updateResult(displayText.textContent);
})


clearButton.addEventListener('click', () => {
    clearDisplay();
})

window.addEventListener('keypress', function(e) {
    console.log("You pressed " + doWhichKey(e));
    let key = doWhichKey(e)
    if ((key >= 48 && key <= 57) || key === 46) {
        displayText.textContent += String.fromCharCode(key); // (48, 57) is keycode range for numbers 0-9. 46 is keycode for decimal (.)
    } else if (key === 37 || key === 47 || key === 43 || key === 45 || key === 120) {
        displayText.textContent += " " + String.fromCharCode(key) + " ";
        // key codes for operators
        /**
         * 37: %
         * 47: /
         * 43: +
         * 45: -
         * 120: x
         */
    }
})

window.addEventListener('keydown', (e) => {
    if (e.key === "Backspace") {
        displayText.textContent = displayText.textContent.slice(0, -1);
    } else if (e.key === "Enter") {
        updateResult(displayText.textContent);
    } else if (e.key === "Escape") {
        clearDisplay();
    }
})