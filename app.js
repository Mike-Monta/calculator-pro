// LOGIC


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
//document.querySelector('#screen').textContent= screenText;
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
    console.log(num1, num2)
    if (oper == "+"){
         onScreen.textContent= num1+num2;
       }
    if (oper == "-"){
         onScreen.textContent= num1-num2;
       }
    if (oper == "/"){
         onScreen.textContent= parseFloat(num1/num2).toFixed(10);
       }
    if (oper == "x"){
        onScreen.textContent= Math.round(num1*num2);
       }
       operator = "";
       onScreenOp.textContent = "";
       operationInCurse = "off";

}
//  Nums
numKeys.forEach(key => {
    key.addEventListener('click', Event =>{
        console.log(operationInCurse);
        if(operationInCurse === "on"){
            onScreen.textContent = "0";
            operationInCurse = "off";
        }
        if(key.id ==="."){
            keyId = key.id;
        }else {
            keyId = parseFloat(key.id);
        }
        console.log(typeof keyId + keyId);
        console.log(typeof screenText + screenText);
        if(screenText.toString().length < 12){
            
            
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
             console.log(screenText);
             //console.log(parseFloat(document.getElementById('screen').textContent)); 
             //console.log(screenText.toString.length); 
        }     
    })
}) 
//  Operators

opKeys.forEach(key =>{
    key.addEventListener('click', Event =>{
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
        if (opId === "="){
            num2 = parseFloat(screenText);
            resolveOp(operator);
            operationInCurse = "off";
        }

       // if(opId === "=" && num1 == 0){
            

        
    })
})

