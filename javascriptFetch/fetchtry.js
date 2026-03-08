
//  Cosa sono le fetch?
//      Funzioni per fare richieste HTTP e prenderne le risorse, che possono essere:
//      JSON, immagini, file
//      Semplificano la raccolta asincrona dei dati in Javascript
//      E per interaggire cpn le API per ricevere e spedire dati asincroni sul web
//      sintassi--->fetch(url, {options})

fetch("https://pokeapi.co/api/v2/pokemon/mew")
    .then(response => console.log(response))
    .then(data => console.log(data))
    .catch(error => console.error(error));

//Traimite async

async function fetchData() {

    try{

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response =await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");

        imgElement.src = pokemonSprite;
        //console.log(data);
    }
    catch(error){
        console.error(error);
    }
}
