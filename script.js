function add(...args) {
    return args.reduce((total, current) => {
        return total + current;
    }, 0);
}


function subtract(subtractFrom, ...args) {

    subtractFrom = (typeof subtractFrom === 'undefined') ? 0 : subtractFrom;

    return args.reduce((total, current) => {
        return total - current;
    }, subtractFrom);
}

function multiply(...args) {

    if(args.length === 0){return 0};

    return args.reduce((total, current) => {
        return total * current;
    }, 1);
}

function divide(numerator, ...args) {

    numerator = (typeof numerator === 'undefined') ? 0 : numerator;

    return args.reduce((total, current) => {
        return total / current;
    }, numerator);
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);

        case '-':
            return subtract(num1, num2);

        case '*':
            return multiply(num1, num2);

        case '/':
            return divide(num1, num2);
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


let displayText = document.querySelector(".display");
const numberDivs = document.querySelectorAll('.number');
const clearButton = document.querySelector(".clear");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector(".dot");
const operatorKeys = ["%", "/", "+", "-", "x"];



[...numberDivs, ...operators, decimal].forEach(button => {
    button.addEventListener('click', updateText);
});



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
    } else if (e.key === "Escape") {
        clearDisplay();
    }
})