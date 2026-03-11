//Ripasso dei metodi String più comuni 

//------------Ricerca e controllo----------------------------------------
//includes() = controlla se una stringa contiene un valore
let ciao = "Hello";
console.log(ciao.includes("e"));

//startsWith() = controlla se l'inizio di una stringa corrisponde con quanto dato
//  endsWith() = controlla se la fine di una stringa corrisponde con quanto dato  
let str = "Ciao";
console.log(str.startsWith("C"));
console.log(str.endsWith("o"));

//indexOf() = restituisce la posizione della prima occorenza
let msg = "Word";
console.log(msg.indexOf("r"));

//--------------------Estrazione--------------------------------------------
//slice() = estrae una porzione indicandone l'indice di inizio(escluso) e di fine(escluso)
//          slice(start, end);
console.log(str.slice(1, 3));
console.log(`Riga tagliata per restituire l'ultimo carattere ${str.slice(-1)}`);            

//substring() = simile a slice, ma non accetta indici negativi
console.log(str.substring(0, 3));

//charAt() = restituisce il carattere a quella posizione 
//           charAt(index);
console.log(str.charAt(0));

//------------------Trasformazione-------------------------------------------
//toUpperCase() / toLowerCase() = rendono la stringa in maiuscolo/minuscolo
console.log(msg.toLowerCase());
console.log(msg.toUpperCase());
console.log(msg.charAt(0).toLowerCase());

//trim() = rimuove spazi bianchi a inizio e fine
let cibo = " Grandi palle ";
console.log(cibo.trim());

//replace() = sostituisce la prima occorrenza
//                    replace(old, new)
console.log(cibo.replace("palle", "capibara"));

//replaceAll() = sostituisce tutte le occorrenze
//               replaceAll(old, new)

console.log(cibo.replaceAll("e", "palle"));

//repeat() = ripete la stringa n volte 
console.log(cibo.repeat(3));

//--------------------Split e Join--------------------------------
//split() = divide una stringa in array
//          split(separator) 

console.log(cibo.split(""));

//join() — non è un metodo String ma di Array, però si usa spesso insieme a split

const frutta = ["pere","mele"];


console.log(frutta.join("-"));

//----------------------Informazioni-------------------------------------------
//.length — lunghezza della stringa (è una proprietà, non un metodo)
console.log(cibo.length);

//padStart() / padEnd() = aggiunge caratteri per raggiungere una lunghezza
//                        padEnd(n, char) 
//                        n = numero lunghezza desiderata, char = carattere da aggiungere 
//                        padStart(n, char) 

console.log(cibo.padStart(19, "peffo"));
console.log(cibo.padEnd(19, "peffo"));