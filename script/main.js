const displayText = document.querySelector('#result');
displayText.textContent = "0";

const buttons = document.querySelectorAll('button');
let currentText = '0';


function add(a, b){
 
        return Number(b) + Number(a);

}

function minus(a,b){
var x = Number(a);
var y = Number(b);
var z = Math.abs(x) - Math.abs(y);
        return z;
    }


 
    


function multiply(a,b){

    return( Number(a) * Number(b));
}

function division(a,b){
  if (b > 0) {
    return (Number(a) / Number(b));
  }
  else { 
    alert("Can't make that");

  }
   
  
}
function square(a) {
 return Math.sqrt(a);

}

function percentage(a){
    return Number(a)/100;
}

function clearDisplay(){
    displayText.textContent = '0';
    currentText = '0';
}


function operate(x){
    let i = '';
    i = x.indexOf('+');
    if( i >= 0 )
    x = add(operate(x.slice(0, i)) , operate(x.slice(i+=1)) );
    else {
        i = x.indexOf('-');
        if( i >= 0)
        x = minus( operate(x.slice(0, i)) , operate(x.slice(i +1)));

        else {
            i=x.indexOf('x');
            if( i >= 0 )
            x = multiply( operate(x.slice(0,i)) , operate(x.slice(i+1)) );
            else {
                i=x.indexOf('÷');
                if( i >= 0 )
                x = division( operate(x.slice(0,i)) , operate(x.slice(i+1)) );
                else{
                    i=x.indexOf('%');
                    if( i >= 0 )
                    x = percentage( operate(x.slice(0,i)) ) + x.slice(i+1);
                 }}}}

              
    if(!isNaN(x))
    return '' + x;
}


function addText(a){
    if (displayText.textContent.length > 18 ) {
  
  alert("I'm not that smart!");
  clearDisplay();
  return;
   
} if (a < 0) {
    a = Math.abs(a)
}
    if(a == 'C') {
    clearDisplay();
    return;
    }

    if(displayText.textContent == "Not defined" || displayText.textContent == "Infinity" )
    clearDisplay();

    if(a == '='){ 
      let numDecimal = Math.round(operate(currentText)*1e11) /1e11;
    currentText = displayText.textContent = numDecimal.toString().slice(0, 4);
 
    if(isNaN(displayText.textContent))
      displayText.textContent = "Divide by 0 error";
  


    return;
    }else if(a == '⬅'){
              
        if(displayText.textContent.length == 1){
        clearDisplay();
        return;
        }
        else if(displayText.textContent[displayText.textContent.length-1] == ' ')
                displayText.textContent = displayText.textContent.slice(0, displayText.textContent.length -3 );
            else
                displayText.textContent = displayText.textContent.slice(0, displayText.textContent.length -1 );
        
        
        currentText = currentText.toString().slice(0, currentText.length -1);
    
        return;

    }else   if(['x','÷','+','-'].includes(a))
            displayText.textContent += ' ' + a + ' ';
                else if(currentText == '0')
                    displayText.textContent = a;
                    else
                    displayText.textContent += a;
    
    if(displayText.textContent != '0')
    currentText += a;

} 

function entry (t){
    let checkIndex = currentText.length -1;
    if(['x','÷','+','-','='].includes(t)  && ['x','÷','+','-'].includes(currentText[checkIndex]) )
    return;

    if(t == '%' && ['x','÷','+','-'].includes(currentText[checkIndex]))
    addText('C');

    while(['x','÷','+','-','.'].includes(currentText[checkIndex]) == false && checkIndex > 0) {
        --checkIndex;
    }
    
    if (currentText[checkIndex] == '.' && t == '.')
    return;

    addText(t);
}

buttons.forEach( button => {
    button.addEventListener('click', (e) => {
        if(e.screenX != 0)
        entry(e.target.textContent);
    });

});

window.addEventListener('keydown', (e) => {
      
        if(['+','-','=','%','1','2','3','4','5','6','7','8','9','0','.'].includes(e.key))
        entry(e.key);
        console.log(e);

        switch(e.key){
            case '*': entry('x');
            break;

            case '/': entry('÷');
            break;

            case 'Enter': entry('=');
            break;

            case 'Escape': entry('clear');
            break;

            case 'Backspace': entry('C');
        }
});