const { DatabaseSync } = require('node:sqlite');
const { createServer } = require('node:http');
const fs = require('node:fs');

//Sincronizzazione col db
const database = new DatabaseSync('./solartracker.db');

//Creo delle query per interagire col db 
const insert = database.prepare(`INSERT INTO solartracker(valore) VALUES(?)`);
const query = database.prepare('SELECT * FROM solartracker ORDER BY sensori_id');

//-----------------------Server-------------------------------------------------

const hostname = '127.0.0.1';
const port = 3000;

//Creo il server e ne gestisco le richieste
const server = createServer((req, res) => {

    // GET / → serve la pagina HTML
    if (req.url === '/' && req.method === 'GET') {
        const html = fs.readFileSync('./index.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    // Chiudo la connessione

    // GET /solartracker → restituisce i dati del database in formato JSON
    } else if (req.url === '/solartracker' && req.method === 'GET') {
        const dati = query.all();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(dati));
    // Chiudo la connessione

    // POST /solartracker → riceve un JSON e lo inserisce nel database
    } else if (req.url === '/solartracker' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const dati = JSON.parse(body);
            insert.run(dati.valore);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ messaggio: 'Dato inserito con successo' }));
        });

    } else {
        res.writeHead(404);
        res.end('Pagina non trovata');
    }
    // Chiudo la connessione
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});