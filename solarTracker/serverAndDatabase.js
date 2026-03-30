
//Creo i moduli per la creazione del database, server http e per il fetching
const { DatabaseSync } = require('node:sqlite');
const { createServer } = require('node:http');
const fs = require('node:fs');

// --- DATABASE CONFIG ---
//Mi collego al database
const database = new DatabaseSync('./solartracker.db');

// Inizializzazione tabella
//eseguisco la query tramite .exec
database.exec(`
  CREATE TABLE IF NOT EXISTS solartracker (
    sensori_id INTEGER PRIMARY KEY AUTOINCREMENT,
    servopos TEXT,
    light_s TEXT,
    light_d TEXT
  );
`);

//Preparo le query per inserire e leggere i dati dal DB
const insert = database.prepare(`INSERT INTO solartracker(servopos, light_s, light_d) VALUES(?, ?, ?)`);
const query = database.prepare('SELECT * FROM solartracker ORDER BY sensori_id');

// --- SERVER CONFIG ---
//configuro l'host per ascoltare qualsiasi indirizzo IP
const hostname = '0.0.0.0';
//alla porta 3000 per lo sviluppo per server locali
const port = 3000;

//creo il server con i parametri req(request) e res(response)
const server = createServer((req, res) => {
//Creo i path per la gestione dell'HTML e del CSS
    // 1. Home Page
    if (req.url === '/' && req.method === 'GET') {
        //tramite fetch leggo il contenuto del path
        const html = fs.readFileSync('./index.html');
        //mando un'intestazione alla richiesta, in questo caso positiva tramite 200
        //specifico il tipo di contenuto
        res.writeHead(200, { 'Content-Type': 'text/html' });
        //chiudo la risposta
        res.end(html);
    } 
    
    // 2. Gestione CSS
    else if (req.url === '/style.css' && req.method === 'GET') {
        try {
            const css = fs.readFileSync('./style.css');
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(css);
        } catch (e) {
            res.writeHead(404);
            res.end("CSS non trovato");
        }
    } 

    // 3. Gestione JavaScript Frontend
    else if (req.url === '/index.js' && req.method === 'GET') {
        try {
            const js = fs.readFileSync('./index.js');
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(js);
        } catch (e) {
            res.writeHead(404);
            res.end("JS non trovato");
        }
    } 

    // 4. GET /solartracker -> restituisce i dati JSON
    else if (req.url === '/solartracker' && req.method === 'GET') {
        //utilizzo la query con INSERT prendendo tutti i dati
        const dati = query.all();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        //trasformo la query in una stringa JSON
        res.end(JSON.stringify(dati));
    } 

    // 5. POST /solartracker -> inserisce i dati nel DB
    else if (req.url === '/solartracker' && req.method === 'POST') {
        let body = '';
        //tramite chunk gestisco i piccoli pezzi di dati all'interno di 'body'
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                //converto i dati JSON in un'oggetto JS
                const dati = JSON.parse(body);
                //se i dati non sono indefiniti
                if (dati.servopos !== undefined && dati.light_s !== undefined && dati.light_d !== undefined ) {
                    //inseriscili nel database
                    insert.run(String(dati.servopos), String(dati.light_s), String(dati.light_d)); 
                    console.log(`[OK] Ricevuto dall'ESP32: ${dati.servopos}°, ${dati.light_s}, ${dati.light_d}`);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'success' }));
                } else {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Campo "servopos", "light_s", "light_d" mancante' }));
                }
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'JSON non valido' }));
            }
        });
    } 

    // 6. Pagina non trovata
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// --- AVVIO ---
server.listen(port, hostname, () => {
    console.log(`🚀 Server in ascolto su http://localhost:${port}`);
    console.log(`📡 In attesa di dati dall'ESP32...`);
});