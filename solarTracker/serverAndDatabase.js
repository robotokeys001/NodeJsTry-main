const { DatabaseSync } = require('node:sqlite');
const { createServer } = require('node:http');
const fs = require('node:fs');

// --- DATABASE CONFIG ---
const database = new DatabaseSync('./solartracker.db');

// Inizializzazione tabella
database.exec(`
  CREATE TABLE IF NOT EXISTS solartracker (
    sensori_id INTEGER PRIMARY KEY AUTOINCREMENT,
    valore TEXT
  );
`);

const insert = database.prepare(`INSERT INTO solartracker(valore) VALUES(?)`);
const query = database.prepare('SELECT * FROM solartracker ORDER BY sensori_id');

// --- SERVER CONFIG ---
const hostname = '0.0.0.0';
const port = 3000;

const server = createServer((req, res) => {
    
    // 1. Home Page
    if (req.url === '/' && req.method === 'GET') {
        const html = fs.readFileSync('./index.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
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

    // 4. GET /solartracker → restituisce i dati JSON
    else if (req.url === '/solartracker' && req.method === 'GET') {
        const dati = query.all();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(dati));
    } 

    // 5. POST /solartracker → inserisce i dati nel DB
    else if (req.url === '/solartracker' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const dati = JSON.parse(body);
                if (dati.valore !== undefined) {
                    insert.run(String(dati.valore)); 
                    console.log(`[OK] Ricevuto dall'ESP32: ${dati.valore}°`);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'success' }));
                } else {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Campo "valore" mancante' }));
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