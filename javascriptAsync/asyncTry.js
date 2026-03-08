//Async/Await 
//      Async = fa in modo che una funzione restituisca una 'promessa'
//      Await = fa in modo che una funzione asincrona aspetti per una promessa

//      Ti permette di scrivere codice asincrono in maniera sincrona
//      Async non possiede parametri di risoluzione o rifiuto
//      Tutto cio dopo Await viene messo in un evento coda

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


async function doChores() {

   try{
    const walkDogResult = await walkDog();
    console.log(walkDogResult);

    const cleanKitchenResult = await cleanKitchen();
    console.log(cleanKitchenResult);

    const takeOutTrashResult = await takeOutTrash();
    console.log(takeOutTrashResult);

    console.log("You finished all the chores!");
}
    catch(error){
        console.error(error);
        console.log("You haven't finished the chores!");
    }

    
}

doChores();