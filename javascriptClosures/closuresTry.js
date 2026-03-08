// closure = Una funzione definita all'interno di un'altra,
//           la funzione interna ha accesso alle variabili
//           e lo scopo della funzione esterna.
//           Permette alle variabili private e mantenimenti di stato.
//           Usato frequentemente nei framework: React, Angular e Vue

//----------Esempio 1------------------------------------

function outer(){

    let message = "Hello";

    function inner(){
        console.log(message);
    }
    inner();
}

outer();

//--------Esempio 2--------------------------------------

function createCounter(){

    let count = 0;

    function increment(){
        count++
        console.log(`Counter incresed to ${count}`);

    }

    function getCount(){
        return count;
    }

    return { increment, getCount};
}

const counter = createCounter();

counter.increment();
counter.increment();

console.log(counter);

//--------Esempio 3--------------------------------------
function createGame(){
    let score = 0;

    function increaseScore(points){
        score += points;
        console.log(`+${points}pts`);
    }

    function decreaseScore(points){
        score -= points;
        console.log(`-${points}pts`);
    }

    function getScore(){
        return score;
    }

    return{ increaseScore, decreaseScore, getScore};

    }

const game = createGame();

game.increaseScore(1);
game.decreaseScore(2);
game.increaseScore(5);
console.log(`The final score is ${game.getScore()}pts`);