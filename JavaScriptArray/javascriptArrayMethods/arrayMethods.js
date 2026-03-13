//find, some, every, push/pop, slice e sort sono i più comuni
//find() = restituisce il primo elemento che soddisfa la condizione
//         find((element)=> element ===x)
let cibo = ["tiramisu", "coconut", "cioccolato"];
console.log(cibo.find( (element)=>element==="coconut"));

//some() = restituisce true se almeno un elemento soddisfa la condizione
let startWithC = (element) => element === "coconut"; 
console.log(cibo.some(startWithC));

//every() — restituisce true se tutti gli elementi soddisfano la condizione
let num= [1, 2, 3, 4]
let isBelow = (element) => element < 5;
console.log(num.every(isBelow));

//push() = aggiunge in fondo
console.log(num.push(5));
console.log(num);

//pop() = rimuove dall'ultimo
console.log(num.pop(4));
console.log(num);

//slice() = estrae una porzione senza mutare l'originale
//          slice(start, end)
console.log(cibo.slice(0,1));

//sort() = ordina l'array, attenzione, muta l'originale
const myNum = [2,6,3,9];
console.log(myNum.sort());

//----------------------Altri metodi----------------------------------------------

//concat() = unisce due array
let concatArray = num.concat(myNum);

//sort() = riordina gli elementi dell'array
let sortArray = concatArray.sort((a, b) => a-b);

//indexOf() = restituisce sempre la posizione della prima occorrenza di un valore
//Se pos (la posizione attuale) è diversa dalla prima occorrenza, significa che è un duplicato quindi viene scartato
let removeSame = ()=> sortArray.filter((item, pos) => sortArray.indexOf(item) == pos);
console.log(removeSame());

//Set() = Oggetti con una collezione di valori. Un valore in un Set() può occorrere solo una volta, unico all'interno del Set.
const unique = [...new Set(concatArray)];
console.log(unique);  