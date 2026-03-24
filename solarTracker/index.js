 window.addEventListener('DOMContentLoaded', () => {
   // Qui fai partire il Solar Tracker
   startAutoUpdate(); 
   console.log("Tutti i sistemi (e i file JS) sono pronti!");
});
 
 let valoreRandom = () => Math.floor(Math.random() * 100);
                // --- DATI (Simulati) ---
        // Valore iniziale del Solar Tracker (Azimut)
        let datiSolarTracker = {
            azimut: 135 // Il valore attuale
        };

        // --- CONFIGURAZIONE SOGLIA ---
        // Definiamo cosa costituisce un "cambiamento significativo" (es. > 0.5 gradi)
        const SOGLIA_CAMBIAMENTO_AZIMUT = 0.5;

        // Memorizziamo l'ultimo valore che abbiamo visualizzato
        let ultimoValoreVisualizzatoAzimut = datiSolarTracker.azimut;

        // --- FUNZIONE DI AGGIORNAMENTO VISTA ---
        // Questa funzione si occupa ESCLUSIVAMENTE di aggiornare l'elemento HTML/Canvas
        function aggiornaVistaAzimut(nuovoValore) {
            console.log(`[VISTA] Aggiornamento visivo dell'Azimut a: ${nuovoValore}°`);
            
            // ESEMPIO HTML: Aggiorna un testo in un elemento HTML
            const elementoAzimutText = document.getElementById('valoreSole');
            if (elementoAzimutText) {
                elementoAzimutText.innerText = `Il valore attuale è ${nuovoValore}°`;
            }

            // ESEMPIO CANVAS: Chiamerebbe la tua funzione di disegno del Canvas
            // (es. ridisegnare la lancetta o il gauge)
            // drawArch(nuovoValore);
        }

// --- FUNZIONE DI AGGIORNAMENTO DATI E VERIFICA REATTIVA ---
// Questa è la funzione centrale che riceve i nuovi dati grezzi
    function riceviNuovoDatoAzimut(valoreGrezzo) {
        // 1. Verifichiamo se il dato è un numero valido
        let valoreVerificato = parseFloat(valoreGrezzo);
        if (isNaN(valoreVerificato)) return;

        // 2. Calcoliamo la differenza assoluta rispetto all'ultimo valore visualizzato
        let differenza = Math.abs(valoreVerificato - ultimoValoreVisualizzatoAzimut);

        // 3. Verifichiamo la significatività
        if (differenza >= SOGLIA_CAMBIAMENTO_AZIMUT) {
            // Il cambiamento è significativo! Aggiorniamo!
            console.log(`[DATI] Rilevato cambiamento significativo (${differenza}°).`);
            
            // Aggiorniamo lo stato dei dati
            datiSolarTracker.azimut = valoreVerificato;
            ultimoValoreVisualizzatoAzimut = valoreVerificato;

            // Istruiamo la vista ad aggiornarsi
            aggiornaVistaAzimut(valoreVerificato);
        } else {
            // Il cambiamento è troppo piccolo, non facciamo nulla
            // (Ottimizzazione: evita ridisegni inutili)
            console.log(`[DATI] Cambiamento trascurabile (${differenza}°). Nessun aggiornamento visivo.`);
        }
    }

        // --- SIMULAZIONE FLUSSO DATI (TEST) ---

        // Chiamata iniziale per impostare la vista
        aggiornaVistaAzimut(datiSolarTracker.azimut);

        console.log("--- Inizio Simulazione ---");

        // Test 1: Riceviamo un dato con un cambiamento piccolissimo (0.1°)
        
        setTimeout(() => riceviNuovoDatoAzimut(valoreRandom()), 2000); 

//----------------------Disegno arco--------------------------------------------------------------------------------------
        const arch = document.getElementById('arch');
            const ctx = arch.getContext('2d');
            const arch_radius = 300;
            
            let pos_arch_x = arch.width/2;
            let pos_arch_y = 500;
            let arch_dimension = Math.PI;
            let arch_section = (Math.PI)/3;
            const inner_radius = arch_radius - 50; // Raggio interno

        function drawArch(){
            for (let i = 0; i < 3; i++){
                
                const startAngle = i * arch_section + arch_dimension;
                const endAngle = startAngle + arch_section; 
                ctx.fillStyle = `rgb(
                255
                ${Math.floor(255-71 * i)}
                ${Math.floor(255-87 * i)})`;
                
                ctx.beginPath();
                ctx.arc(pos_arch_x, pos_arch_y, arch_radius, startAngle, endAngle);
                ctx.arc(pos_arch_x, pos_arch_y, inner_radius, endAngle, startAngle, true);
                ctx.closePath();
                ctx.fill();

                
                
                }
                
            }
        
        drawArch();
      
//------------------------------------Disegno ago------------------------------------------------------------------

        let gaugeInterval = null;
        const needle = document.getElementById('needle');
        const label = document.getElementById('label');
        
        function updateGauge(value) {
            const min = 0;
            const max = 100;
            
            // Limitiamo il valore tra 0 e 100
            const clampedValue = Math.max(min, Math.min(max, value));
            
            // Calcolo rotazione: 0% = -90deg, 100% = 90deg
            const degrees = (clampedValue / 100) * 180 - 90;
            
            // Applichiamo i cambiamenti
            needle.style.transform = `rotate(${degrees}deg)`;
            label.innerText = `Il valore è ${Math.floor(clampedValue)}`;
            
        }

        /**
         * Genera un valore random e aggiorna il grafico
         */
        function setRandomValue() {
            const randomVal = Math.floor(Math.random() * 101);
            updateGauge(randomVal);
        }

        /**
         * Avvia l'intervallo automatico
         */
        function startAutoUpdate() {
            if (gaugeInterval) return;

            // Avvio ciclo: aggiorna ogni 2 secondi
            gaugeInterval = setInterval(setRandomValue, 2000);
            setRandomValue(); // Esecuzione immediata del primo valore
        }

        // --- INIZIALIZZAZIONE AUTOMATICA ---
        window.onload = () => {
            // Avviamo direttamente l'aggiornamento automatico
            startAutoUpdate();
            
            // Log di debug come nel tuo esempio
            console.log("Gauge avviato correttamente");
        };