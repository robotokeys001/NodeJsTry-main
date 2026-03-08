//  callback = una funzione che viene passata come argomento ad un'altra funzione

//             Utilizzata per gestire le operazioni asincrone:
//             1. Leggere file
//             2. Richieste network
//             3. Interagire con i database

//             "Ehi, quando hai finito, chiama questo dopo."

sum(displayPage, 1, 2);

function sum(callback, x, y){
    let result = x + y;
    callback(result);
}

function displayConsole(result){
    console.log(result);
}

function displayPage(result){
    document.getElementById("myH1").textContent = result;
}