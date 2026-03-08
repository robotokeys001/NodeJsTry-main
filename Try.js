//--------------------------Database------------------------------------------------------

// Importo il modulo SQLite dalla libreria standard di Node.js
const { DatabaseSync } = require('node:sqlite');

// Apro (o creo, se non esiste) il database dal file specificato
// Nota: passando ':memory:' al posto del path si crea un DB temporaneo in RAM
const database = new DatabaseSync('./nodetry.db');

// Preparo uno statement parametrizzato per l'inserimento di un nuovo record
// Il simbolo '?' è un placeholder che verrà sostituito dal valore passato a .run()
// Usare prepare() invece di exec() è fondamentale per query con parametri dinamici
const insert = database.prepare(`INSERT INTO sensoritry(valore) VALUES(?)`);

// Eseguo lo statement passando il valore concreto che sostituirà il placeholder '?'
//insert.run('hello');

// Preparo una query per recuperare tutti i record della tabella,
// ordinati per 'sensori_id' in senso crescente (ASC è il default)
const query = database.prepare('SELECT * FROM sensoritry ORDER BY sensori_id');

// Eseguo la query e stampo in console tutti i risultati come array di oggetti
console.log(query.all());

//-----------------------Server-------------------------------------------------



// Importo solo la funzione createServer dal modulo HTTP nativo di Node.js
const { createServer } = require('node:http');
const fs = require('node:fs');

// Definisco hostname e porta su cui il server sarà in ascolto
// 127.0.0.1 = localhost, accessibile solo dalla propria macchina
const hostname = '127.0.0.1';
const port = 3000;

// Creo il server: la callback viene eseguita ad ogni richiesta in arrivo
// req = oggetto con i dettagli della richiesta (url, metodo, headers...)
// res = oggetto con cui costruisco e invio la risposta
const server = createServer((req, res) => {

  // Imposto uno status code di default a 200 (OK)
  res.statusCode = 200;
  // Imposto un Content-Type di default come testo semplice
  // Verrà sovrascritto a 'application/json' nel ramo /sensori
  res.setHeader('Content-Type', 'text/plain');

  //--------------------------------Parte html-----------------------------------------

  // Controllo che la rotta sia /sensori e il metodo sia GET
  if (req.url === '/sensori' && req.method === 'GET') {
     const html = fs.readFileSync('./try.html');
     res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);

//----------------------------------Parte Json---------------------------------------

    } else if (req.url === '/sensori' && req.method === 'GET') {
      
      // Sovrascrivo gli header: status 200 e tipo di contenuto JSON
      res.writeHead(200, { 'Content-Type': 'application/json' });
      
      // Serializzo l'array di oggetti in una stringa JSON e chiudo la risposta
      res.end(JSON.stringify(dati));
      
    // POST /sensori → riceve un JSON e lo inserisce nel database
    } else if (req.url === '/sensori' && req.method === 'POST') {

        let body = '';

        // I dati arrivano a "pezzi" (chunks), li accumulo man mano
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Quando la ricezione è completa, processo i dati
        req.on('end', () => {
            const dati = JSON.parse(body);      // Converto il JSON in oggetto JS
            insert.run(dati.valore);            // Inserisco il valore nel database

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ messaggio: 'Dato inserito con successo' }));
        });
  } else {
      // Per qualsiasi rotta non gestita, rispondo con 404 (Not Found)
      res.writeHead(404);
      res.end('Pagina non trovata');
  }
});

// Avvio il server: inizia ad ascoltare le richieste su hostname:port
// La callback viene eseguita una sola volta, quando il server è pronto
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

