// arrow function = un modo coinciso per scrivere le funzioni
//                  buone per funzioni semplici utilizzate solo una volta
//                  (parametro) => codice


//----------Esempio 1--------------------------------------------------------
const hello = (name, age) =>{console.log(`Hello ${name}, you are ${age} old's`)};

hello("Chiara", 24);

//-----------Esempio 2-----------------------------------
setTimeout(()=>{console.log("Hello");
                console.log("Goodbye");}, 3000);

//----------Esempio con gli array------------------------------------
const numbers = [1, 2, 3, 4, 5, 6];

const squares = numbers.map((element) => Math.pow(element, 2));
const cubes = numbers.map((element) => Math.pow(element, 3));
const evenNums = numbers.filter((element) => element % 2 ===0);
const oddNums= numbers.filter((element) => element % 2 !== 0);
const total = numbers.reduce((accumulator, element) => accumulator + element);

console.log(`Questi numeri sono stati messi alla potenza di 2: ${squares}.
             Questi invece alla potenza di 3: ${cubes}.
             Questi invece sono i numeri pari presenti: ${evenNums}.
             Questi invece sono quelli dispari: ${oddNums}.
             Per ultimo il loro totale: ${total}`);