const divide = ()=>op1 / op2;
const multiply = () => op1 * op2;
const subtract = () => op1 - op2;
const add = () => op1 + op2;

function calculate() {
    switch (operator) {
        case '/': return divide();
        case 'x': return multiply();
        case '-': return subtract();
        case '+': return add();
    }
}

function containsOneOperator() {
    let count = 0
    for (let i = 0; i < resultScreen.textContent.length; i++) {
        if ("+-/x=".includes(resultScreen.textContent[i])) {
            count++;
        }
        if (count > 1) {
            return false;
        }
    }
    return count;
}

function clear(){
    op1 = null;
        op2 = null;
        result = null;
        operator = null;
        opScreen.textContent = 0;
        resultScreen.textContent = 0;
}

function showErrorMessage(){
    alert("Can't divide by 0 !!!"); 
    clear();
}

function display(event) {

    if ("+-/x=".includes(this.value)) {
        if (containsOneOperator()) {
            op2 = parseFloat(opScreen.textContent);
            let prevOp1 = op1;
            if(operator=="/" && op2==0){
                showErrorMessage();
                return;
            }
            op1 = calculate();
            opScreen.textContent = op1;
            if (this.value != "=") {
                operator = this.value;
                resultScreen.textContent = `${op1} ${operator}`;
                flag = 1;
            } else {
                resultScreen.textContent = `${prevOp1} ${operator} ${op2} =`
            }

        }
        else if(this.value != "="){
            
            op1 = parseFloat(opScreen.textContent);
            operator = this.value;
            
                resultScreen.textContent = `${op1} ${operator} `
            flag = 1;
        }
    }
    else if (this.value == "clear") {
        
    }
    else if (this.value == "delete") {
        if (opScreen.textContent.length != 1) {
            opScreen.textContent = opScreen.textContent.slice(0, opScreen.textContent.length - 1)
        }
        else {
            opScreen.textContent = 0;
        }
    }
    else {
        if (!(this.value == "." && opScreen.textContent.includes(".") && !flag)) {
            if (opScreen.textContent == "0" || flag) {
                opScreen.textContent = this.value;
                flag = 0;
            }
            else {
                opScreen.textContent += this.value;

            }
        }
    }
}

let op1 = null;
let op2 = null;
let flag = 0;
let operator = null;

let resultScreen = document.querySelector('.screen-result')
let opScreen = document.querySelector('.screen-op')

let buttons = document.querySelectorAll('button')

buttons.forEach((button) => button.addEventListener('click', display))