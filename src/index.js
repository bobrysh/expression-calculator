function eval() {
    // Do not use eval!!!
    return;
}

const getTop = (arr) => {
    return arr[arr.length-1];
}

const calculate = (operation, a, b) => {
    if(operation == '+'){
        return a + b;
    } else if(operation == '-' ){
        return a - b;
    }else if(operation == '*' ){
        return a * b;
    }else{
        return a / b;
    }
};

const expressionCalculator = (expr) => {
    this.priority = { '*': 2, '/': 2,'+': 1, '-': 1, '(': 0, ')': 0 };
    var nums = [], operations = [];
    var exprArray = expr.trim().split(/\s+/g);
    if (!expr.includes(" ")) { exprArray = expr.split('') };
    for (var i=0; i < exprArray.length; i++) {
        if ( !isNaN( Number(exprArray[i]) ) ) {     
            nums.push(Number(exprArray[i]));
            continue;
        }
        var currentOperation = exprArray[i];
        if ( currentOperation == '(' || operations.length == 0 ) {   
            operations.push(currentOperation);
            continue;
        }
        if ( this.priority[currentOperation]> this.priority[getTop(operations)] ) {  
            operations.push(currentOperation);
            continue;
        }
        while ( true ) {
            var topOpers = getTop(operations);
            if ( topOpers == '(' && currentOperation == ')') {
                operations.pop();
                break;
            }
            if ( topOpers == '(' ) {
                operations.push(currentOperation);
                break;
            }
            if ( this.priority[topOpers] >= this.priority[currentOperation]) {
                var b = nums.pop();
                var a = nums.pop();
                nums.push(calculate(operations.pop(), a, b));
            } else {
                operations.push(currentOperation);
                break;
            }
        }
    }
    for (var i=0; i<=operations.length; i++) {
        var b = nums.pop();
        var a = nums.pop();
        nums.push(calculate(operations.pop(), a, b));
    }

    if (expr.includes("/ 0")) {
        throw new Error("TypeError: Division by zero.");
    }
    if (Array.from(expr.matchAll(/\(/g)).length !== Array.from(expr.matchAll(/\)/g)).length) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    return nums[0];
}
module.exports = {
    expressionCalculator
}