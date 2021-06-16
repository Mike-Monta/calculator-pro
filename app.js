// LOGIC

const getAdd =(a,b) =>parseFloat(a)+parseFloat(b);
const getMinus = (a,b)=> parseFloat(a)-parseFloat(b);
const getMulti = (a,b)=> parseFloat(a)*parseFloat(b);
const getDivide = (a,b)=> parseFloat(a)/parseFloat(b);

// Set on screen

function clrScreen(){
    onScreen.textContent="";
}
function updateScreen(){
    onScreen.textContent += key.id;
    //screenText = parseInt(document.getElementById('screen').textContent);
}

const numKeys = document.querySelectorAll('.num');
const key = document.querySelectorAll('.button');
const onScreen = document.querySelector('#screen');
const screenText = parseFloat(document.getElementById('screen').textContent);

numKeys.forEach(key => {
    key.addEventListener('click', Event =>{
        if (key.id === "."){
            if (!onScreen.textContent.includes('.')){
                onScreen.textContent += key.id;
            }
         } else if(key.id !=='0' && onScreen.textContent == '0') {
                    clrScreen();
                    onScreen.textContent += key.id;
         }else if (key.id ==='0' && onScreen.textContent == '0'){ 
            
            
         }else{
            onScreen.textContent += key.id;
         }
            //onScreen.textContent.includes('.') 
       
        
            



            console.log(parseFloat(document.getElementById('screen').textContent)); 
            console.log(screenText);
         
    })
})  


