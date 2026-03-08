//setTimeout() = funzione di JavaScript che permette di programmare l'esecuzione di una funzione
//               dopo un certo periodo (millisecondi)
//               Il tempo e approsimato
//               (il tempo di esecuzione potrebbe variare in base al carico di lavoro dell'ambiente di esecuzione JavasScript)

//               setTimeout(callback, delay);

//clearTimeout() = Cancella il timer impostato passandogli come argomento l'id del timer

//                 clearTimeout(timerId);

let timeoutId;

function startTimer(){
    timeoutId = setTimeout(()=> window.alert("Hello"), 3000);
    console.log("STARTED");
}

function clearTimer(){
    clearTimeout(timeoutId);
    console.log("CLEARED");
}