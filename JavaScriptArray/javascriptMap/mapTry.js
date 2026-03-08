//.map() = Acetta una callback e applica quella funzione
//         ad ogni elemento di un'array, dopo di che restituisce un nuovo array

//--------Esempio 1 ------------------------------------
const numbers = [1, 2, 3, 4, 5];

const squared = numbers.map(toSquare);
const cubed = numbers.map(toCube);

function toSquare(element){
    return Math.pow(element, 2);
}

function toCube(element){
    return Math.pow(element, 3);
}


console.log(numbers);
console.log(squared);
console.log(cubed);

//------------------Esempio 2-------------------------------

const students = ["Spongebob", "Patrick", "Suidward", "Sandy"];
const studentsUpper= students.map(upperCase);
const studentsLower= students.map(lowerCase);

console.log(studentsUpper);
console.log(studentsLower);

function upperCase(element){
    return element.toUpperCase();
}


function lowerCase(element){
    return element.toLowerCase();
}

//------------------Esempio 3----------------------------------

const dates = ["2024-01-10", "2025-2-20", "2026-3-30"];
const formattedDates = dates.map(formatDates);

console.log(formattedDates);

function formatDates(element){
    const parts = element.split("-");
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
}