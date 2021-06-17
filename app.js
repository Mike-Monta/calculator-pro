// Set screen
const numKeys = document.querySelectorAll('.num');
const opKeys = document.querySelectorAll('.op');
const key = document.querySelectorAll('.button');
const onScreen = document.querySelector('#screen');
const onScreenOp = document.querySelector('#screenOp');
let num1 = 0;
let num2 = 0;
let opKey= "";
let operator="";
let memNumber= 0;
let screenText = 0;
let keyId = "";
let opId = "";
let result = 0;
let operationInCurse= "off";
screenText = document.querySelector('#screen').textContent;

function clrScreen(){
    onScreen.textContent= 0;
    onScreenOp.textContent = "";
    console.log(typeof screenText);
    //screenText = document.getElementById('screen').textContent;
    screenText = parseFloat(document.getElementById('screen').textContent);
}
clrScreen();

function updateScreen(set){
    if(onScreen.textContent === 0 || onScreen.textContent === "0" ){
        onScreen.textContent = set;
    }else if (screenText !== 0 || screenText !== "0"){
        onScreen.textContent += set;
    }
    screenText = parseFloat(document.getElementById('screen').textContent);
}
function resolveOp(oper){
       if (oper == "+"){
         return num1+num2;
       }
    if (oper == "-"){
         return num1-num2;
       }
    if (oper == "/"){
        if(num1 > 10000){ 
            return (num1/num2).toFixed(2);
        }else return (num1/num2);
       }
    if (oper == "x"){
        return num1*num2; 
    }
}
//  Nums
numKeys.forEach(key => {
    key.addEventListener('click', Event =>{
        //console.log(operationInCurse);
        document.getElementById('audio').play();
        if(operationInCurse === "on"){
            onScreen.textContent = "0";
            operationInCurse = "off";
        }
        if(key.id ==="."){
            keyId = key.id;
        }else {
            keyId = parseFloat(key.id);
        }
        if(onScreen.textContent.toString().length < 12){
            if (onScreen.textContent === "0" && keyId=== "."){
                onScreen.textContent = "0.";
            }else {
                if (key.id === "."){
                     if (!onScreen.textContent.includes('.')){
                        updateScreen(keyId);
                    }
                 } else if(key.id !=='0' && onScreen.textContent == 0) {
                           //clrScreen();
                           updateScreen(keyId);
                 }else if (key.id ==='0' && onScreen.textContent === "0"){ 
                                
                 }else{
                    updateScreen(keyId);
                 } 

                }              
        }     
    })
}) 

//  Operators

opKeys.forEach(key =>{
    key.addEventListener('click', Event =>{
        document.getElementById('audio').play();
        opId = key.id;
        console.log(opId);
        if (opId == "AC"){
            clrScreen();
        }
        if (opId == "+" || opId== "-" || opId == "/" || opId == "x"){
            num1 = parseFloat(onScreen.textContent);
            onScreenOp.textContent = opId;
            operator = opId;
            operationInCurse = "on";
        }
         //  ToDo calculate %

        if (opId === "="){              //  Do the operation and set on Screen
            num2 = parseFloat(onScreen.textContent);
            //console.log(num2);
            if (num2 == 0){
                onScreen.textContent= "Error";
            }else{
            onScreen.textContent = Math.round(resolveOp(operator)*10000000000)/10000000000; // fits numbers to screen
            }
            operator = "";
            onScreenOp.textContent = "";
            operationInCurse = "off";  
        }    
     })
})

//  Set keys to run functions

window.addEventListener('keypress', function(e) {
    let targetKey = e.key;
    if(e.key === "Enter") targetKey = '=';
    if(e.key === "*") targetKey = 'x';
    document.getElementById(targetKey).click();
   
});
// Backspace key needs to be listen by keyDown instead of KeyPress
window.addEventListener('keydown', function(e) {
    let targetKey = e.key;
    if(targetKey === "Backspace") document.getElementById("AC").click();
     
})

