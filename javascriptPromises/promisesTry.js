// Promises = Un'oggetto che gestisce le operazioni asincrone.
//          Avvolgi attorno a un Promise Object {codice asincrono}
//          "Prometto di restituire un valore"
//          PENDING(in attesa) -> RESOLVED o REJECTED
//          new Promise((resolve, reject) => {codice asincrono})

// Fai queste commisioni in ordine
//      1. Porta a passeggio il cane
//      2. Pulisci la cucina
//      3. Porta fuori la spazzatura

function walkDog(){
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            const dogWalked = true;

            if(dogWalked){
                resolve("You walk the dog");
            }else{
                reject("You didin't walk the dog");
            }
        }, 1500);
    });
}
function cleanKitchen(){
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            const kitchnCleaned = true;

            if(kitchnCleaned){
                resolve("You clean the kitchen!");
            }else{
                reject("You didin't clean the kitchen!");
            }
        }, 2500);
    });
}

function takeOutTrash(){
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            const trashTakenOut = true;

            if(trashTakenOut){
                resolve("You take out the trash!");
            }else{
                reject("You didin't take out the trash!");
            }
        },500);
    });
}

walkDog().then(value => {console.log(value); return cleanKitchen()})
         .then(value => {console.log(value); return takeOutTrash()})
         .then(value => {console.log(value); console.log("You finished all the chores!")})
         .catch(error => console.error(error));