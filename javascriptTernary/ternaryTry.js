// operatore ternario = una scorciatoia per gli statement if{} e else{}
//                      aiuta nell'assegnare una variabile in base ad una condizione            
//                      condizione ? codeIfTrue : codeIfFalse;        

//-------------Esempio 1-------------------------------
let time = 9;
let greeting = time < 12 ? "Good morning!" : "Good afternoon!";
console.log(greeting);

//-------------Esempio 2-------------------------------

let isStudent = false;
let message = isStudent ? "You are a student" : "You are NOT a student";
console.log(message);

//-------------Esempio 3-------------------------------

let purchaseAmount = 99;
let discount = purchaseAmount >= 100 ? 10 : 0;
console.log(`Your total is $${purchaseAmount - purchaseAmount * (discount/100)}`);