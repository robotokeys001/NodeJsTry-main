//object = Una collezione di proprieta relazionate e/o metodi
//         Possono rappresentare oggetti esistenti( persone, prodotti, luoghi)
//         object = {key : value,
//                   function()}

const person1 = {
    firstName : "Spongebob",
    lastName : "Squarepants",
    age : 30,
    isEmployed : true,
    sayHello : () => {console.log("Hi! I am Spongebob")},
    eat : () => {console.log("I am eating a Krabby Patty!")}
}


const person2 = {
    firstName : "Patrick",
    lastName : "Star",
    age : 30,
    isEmployed : true,
    sayHello : () => {console.log("Hey, I'm Patrick...")},
    eat : () => {console.log("I am eating roast beef, chicken and pizza")}
}

console.log(person1);
