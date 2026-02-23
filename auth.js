// auth.js

// Prüfen, ob der User auf Login oder Registrieren geklickt hat (Parameter aus URL)
const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode');

if (mode === 'login') {
    document.getElementById('auth-title').innerText = "Login";
    document.getElementById('auth-subtitle').style.display = 'none';
    document.getElementById('step-1').classList.add('step-hidden');
    document.getElementById('login-area').classList.remove('step-hidden');
    document.getElementById('lock-area').style.display = 'none'; // Beim reinen Login kein Schloss-Sammeln laut Doku
}

// === REGISTRIERUNGS LOGIK ===

function nextStep(step) {
    if (step === 2) {
        // E-Mail wurde eingegeben -> Schlüssel 1 fliegt rein
        document.getElementById('step-1').classList.add('step-hidden');
        document.getElementById('step-2').classList.remove('step-hidden');
        document.getElementById('auth-subtitle').innerText = "Schritt 2: Gib den Code ein.";
        
        // Animation Schlüssel 1
        document.getElementById('key-1').classList.add('key-fly-1');
    }
}

function checkCode() {
    const code = document.getElementById('reg-code').value;
    
    // Fake-Überprüfung: '000000' löst den Error aus (Schlüssel zerbricht)
    if (code === '000000' || code === '') {
        document.getElementById('error-msg').style.display = 'block';
        document.getElementById('key-2').classList.add('key-break'); // Schlüssel zerbricht
        setTimeout(() => {
            document.getElementById('key-2').classList.remove('key-break'); // Reset für erneuten Versuch
        }, 1000);
    } else {
        // Code richtig -> Schlüssel 2 fliegt rein
        document.getElementById('error-msg').style.display = 'none';
        document.getElementById('step-2').classList.add('step-hidden');
        document.getElementById('step-3').classList.remove('step-hidden');
        document.getElementById('auth-subtitle').innerText = "Schritt 3: Erstelle dein Profil.";
        
        document.getElementById('key-2').classList.add('key-fly-2');
    }
}

function finishSetup() {
    // Schritt 3 fertig -> Schlüssel 3 fliegt rein
    document.getElementById('step-3').classList.add('step-hidden');
    document.getElementById('step-final').classList.remove('step-hidden');
    document.getElementById('auth-subtitle').innerText = "Fast fertig!";
    
    document.getElementById('key-3').classList.add('key-fly-3');
    
    // Schloss Interaktion aktivieren
    setupHoldToUnlock();
}

// === SCHLOSS HALTEN (1.5 Sekunden) ===
function setupHoldToUnlock() {
    const lock = document.getElementById('the-lock');
    const circle = document.getElementById('hold-circle');
    let holdTimer;

    // Maus & Touch Events für Handys
    const startHold = (e) => {
        e.preventDefault(); // Verhindert markieren
        circle.classList.add('holding'); // Startet CSS Lade-Kreis
        
        // Timer für 1.5 Sekunden
        holdTimer = setTimeout(() => {
            // Erfolg!
            lock.style.backgroundColor = "var(--neon-blue)";
            lock.innerHTML = "<h3 style='margin-top:30px'>OFFEN!</h3>";
            setTimeout(() => {
                alert("Registrierung erfolgreich! Weiterleitung zur Main-Page...");
                // window.location.href = 'main.html';
            }, 500);
        }, 1500);
    };

    const stopHold = () => {
        clearTimeout(holdTimer);
        circle.classList.remove('holding'); // Bricht den Ladekreis ab
    };

    lock.addEventListener('mousedown', startHold);
    lock.addEventListener('mouseup', stopHold);
    lock.addEventListener('mouseleave', stopHold);
    
    // Für Handys (Touch)
    lock.addEventListener('touchstart', startHold);
    lock.addEventListener('touchend', stopHold);
}