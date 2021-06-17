// Set screen
const numKeys = document.querySelectorAll('.num');
const opKeys = document.querySelectorAll('.op');
const key = document.querySelectorAll('.button');
const onScreen = document.querySelector('#screen');
const onScreenOp = document.querySelector('#screenOp');
let num1 = 0;
let num1Set= "off";
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
    result=0 , num1 = 0 , num2 = 0;
    operationInCurse = "off";
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
    num1= Number(num1);
    num2 = Number(num2);
       if (oper == "+"){
           result=num1+num2;
           num1= result;
           console.log( num1 , num2 , result);
         return result;
       }
        if (oper == "-"){
        result= num1-num2;
        num1 = result;
         return result;
       }
        if (oper == "/"){
        result =(num1/num2);
        num1 = result;
        if(num1 > 10000){ 
            return result.toFixed(2);
        }else return result;
       }
        if (oper == "x"){
        result= num1*num2;
        num1 = result;
        return result; 
        }
}
//  Nums
numKeys.forEach(key => {
    key.addEventListener('click', Event =>{
        document.getElementById('audio').play();
        if(num1Set== "on"){
            onScreen.textContent = 0;
            num1Set = "off";
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
        num1Set="on";
        opId = key.id;
        if (opId == "AC"){
            clrScreen();
        }
        if(opId == "sign"){
            if(onScreen.textContent> 0){
                onScreen.textContent= "-"+ onScreen.textContent;
            }else{
                onScreen.textContent = onScreen.textContent *-1;
            }
        }
        
        if (opId == "+" || opId== "-" || opId == "/" || opId == "x"){
            onScreenOp.textContent = opId;
            if(operationInCurse == "off") num1= onScreen.textContent;
            if(operationInCurse == "on") {
                num2= onScreen.textContent;
                onScreen.textContent = Math.round(resolveOp(operator)*10000000000)/10000000000;
            }
            console.log( operationInCurse+ "Num1: "+ num1 + " Num2: "+ num2+ " Resul: "+ result);
            operator = opId;
            if(operationInCurse == "off"){
                num1 = parseFloat(onScreen.textContent);
                operationInCurse = "on";                
            }
        }      
        if (opId === "="){             
            num2 = parseFloat(onScreen.textContent);
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

