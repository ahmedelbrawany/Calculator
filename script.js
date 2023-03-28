const divide = ()=>op1/op2;
const multiply = ()=>op1*op2;
const subtract = ()=>op1-op2;
const add = ()=>op1+op2;

function calculate(){
    switch(operator){
        case '/': return divide();
        case 'x': return multiply();
        case '-': return subtract();
        case '+': return add();
    }
}



function display(event) {

    if ("+-/x=".includes(this.value)) {
        resultScreen.textContent = `${op1} ${operator}`
        if(!operator){
            if(!op1){
                op1 = parseFloat(opScreen.textContent);
            }
            operator = this.value
            resultScreen.textContent = `${op1} ${operator}`
        }
        else{
            op2 = parseFloat(opScreen.textContent)
            console.log(calculate());
            result = Math.round(calculate()*100)/100;

            if(this.value == "="){
                resultScreen.textContent = `${op1} ${operator} ${op2} =`;
                operator = null;
            }
            else{
                operator = this.value;
                resultScreen.textContent = `${result} ${operator} `;
            }
            opScreen.textContent = result;
            op1 = result;
            op2 = null;

            
        }
    }
    else if(this.value=="clear"){
        op1 = null;
        op2 = null;
        opScreen.textContent = 0;
        resultScreen.textContent = "";
    }
    else if(this.value=="delete"){
        opScreen.textContent = opScreen.textContent.slice(0, opScreen.textContent.length-1)
    }
    else {

        if (opScreen.textContent == "0" ||opScreen.textContent==`${op1}`) {
            opScreen.textContent = this.value;
            
        }
        else {
            opScreen.textContent += this.value;
        }
    }
}

let op1 = null;
let op2 = null;
let result  = null;
let operator = null;

let resultScreen = document.querySelector('.screen-result')
let opScreen = document.querySelector('.screen-op')

let buttons = document.querySelectorAll('button')

buttons.forEach((button) => button.addEventListener('click', display))