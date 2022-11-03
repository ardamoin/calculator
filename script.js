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