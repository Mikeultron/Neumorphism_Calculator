function getHistory(){
  return document.querySelector('.history-value').innerText;
}

function printHistory(num){
  document.querySelector('.history-value').innerText = num;
}

function getOutput(){
  return document.querySelector('.output-value').innerText;
}

function printOutput(num){
  let output = document.querySelector('.output-value');
  output.innerText = (!num)? "" : getFormattedNumber(num);
}

function getFormattedNumber(num){
  if(num === "-") return "0";
  let n = Number(num);
  let value = n.toLocaleString("en");
  return value;
}

function reverseNumberFormat(num){
  return Number(num.replace(/,/g, ''));
}

let operators = document.querySelectorAll('.operator');
let numbers = document.querySelectorAll('.number');

operators.forEach(o =>{
  o.addEventListener('click', function(){
    if(this.id === "clear"){
      printHistory("");
      printOutput("");
    }
    else if(this.id === "backspace"){
      let output = reverseNumberFormat(getOutput()).toString();
      if(output){
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    }
    else{
      let output = getOutput();
      let history = getHistory();
      if(output == "" && history){
        if(isNaN(history[history.length - 1]))
          history = history.substr(0, history.length-1);
      }
      if(output || history){
        output = (!output)? output : reverseNumberFormat(output);
        history += output;
        if(this.id === "="){
          let result = eval(history);
          printOutput(result);
          printHistory("");
        }
        else{
          history += this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  })
})

numbers.forEach(n =>{
  n.addEventListener('click', function(){
    let output = reverseNumberFormat(getOutput());
    if(output != NaN){
      output += this.id;
      printOutput(output);
    }
  })
})