function eval() {
    // Do not use eval!!!
    return;
}

const getTop = (arr) => {
    return arr[arr.length-1];
}

const calculate = (operation, a, b) => {
    switch (operation) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return;
    }
};

const expressionCalculator = (expr) => {
    if (Array.from(expr.matchAll(/\(/g)).length !== Array.from(expr.matchAll(/\)/g)).length) {
        throw new Error('ExpressionError: Brackets must be paired');
    }
    if (expr.includes("/ 0")) {
        throw new Error("TypeError: Division by zero.");
    }
    const priority = { '+': 1, '-': 1, '*': 2, '/': 2, '(': 0, ')': 0 };
    let nums = [], operations = [];
    let exprArray = expr.trim().split(/\s+/g);
    if (!expr.includes(" ")) { exprArray = expr.split('') };
    for (let i=0; i < exprArray.length; i++) {
        if ( !isNaN( Number(exprArray[i]) ) ) {     
            nums.push(Number(exprArray[i]));
            continue;
        }
        let currentOperation = exprArray[i];
        if ( operations.length == 0 || currentOperation == '(') {   
            operations.push(currentOperation);
            continue;
        }
        if ( priority[getTop(operations)] < priority[currentOperation] ) {  
            operations.push(currentOperation);
            continue;
        }
        while ( true ) {
            let topoperations = getTop(operations);
            if ( currentOperation == ')' && topoperations == '(' ) {
                operations.pop();
                break;
            }
            if ( topoperations == '(' ) {
                operations.push(currentOperation);
                break;
            }
            if ( priority[currentOperation] <= priority[topoperations] ) {
                let b = nums.pop();
                let a = nums.pop();
                nums.push(calculate(operations.pop(), a, b));
            } else {
                operations.push(currentOperation);
                break;
            }
        }
    }
    for (let i=0; i<=operations.length; i++) {
        let b = nums.pop();
        let a = nums.pop();
        nums.push(calculate(operations.pop(), a, b));
    }
    return nums[0];
}

module.exports = {
    expressionCalculator
}