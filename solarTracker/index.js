// --- CONFIGURAZIONE E STATO ---
let datiSolarTracker = { azimut: 0 };
const SOGLIA_CAMBIAMENTO_AZIMUT = 0.5;
let ultimoValoreVisualizzatoAzimut = null;

// Riferimenti agli elementi (li inizializziamo dopo il caricamento del DOM)
let elementoAzimutText, elementoStatusLog, needle, label, ctx;

// --- INIZIALIZZAZIONE ---
window.addEventListener('DOMContentLoaded', () => {
    // Recuperiamo gli elementi solo quando siamo sicuri che esistano
    elementoAzimutText = document.getElementById('valoreSole');
    elementoStatusLog = document.getElementById('statusLog');
    needle = document.getElementById('needle');
    label = document.getElementById('label');
    const arch = document.getElementById('arch');
    
    if (arch) {
        ctx = arch.getContext('2d');
        drawArch();
    }

    console.log("Sistema pronto e DOM caricato.");
    
    // Facciamo partire il controllo del database
    setInterval(recuperaDatiDalDatabase, 1000);
});

// --- FUNZIONE DI AGGIORNAMENTO VISTA (Testo + Ago) ---

function aggiornaVistaAzimut(nuovoValore) {
    if (!needle) return;
    
    const min = 0;
    const max = 180; // Cambiato a 180 perché il servo dell'ESP32 va da 0 a 180
    
    const clampedValue = Math.max(min, Math.min(max, nuovoValore));
    
    // Mappa 0-180 gradi del servo su -90 a +90 gradi della rotazione CSS
    const degrees = (clampedValue / max) * 180 - 90;
    
    needle.style.transform = `rotate(${degrees}deg)`;
    if (label) label.innerText = `Angolo Servo: ${Math.floor(nuovoValore)}°`;
    
    
    
    }

// --- LOGICA REATTIVA ---
function riceviNuovoDatoAzimut(valoreGrezzo) {
    let valoreVerificato = parseFloat(valoreGrezzo);
    if (isNaN(valoreVerificato)) return;

    if (ultimoValoreVisualizzatoAzimut === null) {
        ultimoValoreVisualizzatoAzimut = valoreVerificato;
        aggiornaVistaAzimut(valoreVerificato);
        return;
    }

    let differenza = Math.abs(valoreVerificato - ultimoValoreVisualizzatoAzimut);

    if (differenza >= SOGLIA_CAMBIAMENTO_AZIMUT) {
        console.log(`[DATI] Cambiamento significativo: ${differenza}°`);
        ultimoValoreVisualizzatoAzimut = valoreVerificato;
        aggiornaVistaAzimut(valoreVerificato);
        
        if (elementoStatusLog) elementoStatusLog.innerText = "Dato aggiornato dal database.";
    }
}

// --- FUNZIONE PER PESCARE I DATI DAL SERVER ---
async function recuperaDatiDalDatabase() {
    try {
        const risposta = await fetch('/solartracker');
        if (!risposta.ok) throw new Error("Server non raggiungibile");
        
        const dati = await risposta.json();

        if (dati.length > 0) {
            const ultimoDato = dati[dati.length - 1];
            riceviNuovoDatoAzimut(ultimoDato.servopos);
        }
    } catch (errore) {
        console.error("Errore nel recupero dati:", errore);
        if (elementoStatusLog) elementoStatusLog.innerText = "Errore connessione server.";
    }
}

// --- DISEGNO ARCO (Canvas) ---
function drawArch() {
    if (!ctx) return;
    const arch_radius = 300;
    const pos_arch_x = 500; // Metà di 1000 (la larghezza del tuo canvas)
    const pos_arch_y = 450; // Posizione verticale del centro dell'arco
    const arch_section = Math.PI / 3;
    const inner_radius = arch_radius - 50;

    ctx.clearRect(0, 0, 800, 600); // Pulisce prima di disegnare

    for (let i = 0; i < 3; i++) {
        const startAngle = i * arch_section + Math.PI;
        const endAngle = startAngle + arch_section;
        ctx.fillStyle = `rgb(255, ${Math.floor(255 - 71 * i)}, ${Math.floor(255 - 87 * i)})`;

        ctx.beginPath();
        ctx.arc(pos_arch_x, pos_arch_y, arch_radius, startAngle, endAngle);
        ctx.arc(pos_arch_x, pos_arch_y, inner_radius, endAngle, startAngle, true);
        ctx.closePath();
        ctx.fill();
    }
}

