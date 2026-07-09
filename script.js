const anniversaryDate = new Date(2025, 11, 14, 0, 0, 0);
let clearKeyAccess = false;
let currentQuestionIdx = 0;

// Setup background particles dynamically
const canvas = document.querySelector('.game-sky-bg');
for (let i = 0; i < 18; i++) {
    let p = document.createElement('div');
    p.className = 'ambient-particle';
    p.style.width = Math.random() * 3 + 1 + 'px';
    p.style.height = p.style.width;
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = Math.random() * 5 + 6 + 's';
    p.style.animationDelay = Math.random() * 4 + 's';
    canvas.appendChild(p);
}

const questions = [
    { q: "If it's raining then what should be the ideal plan?", o: ["Cuddles", "Maggi", "Cozy blankets", "Horror movie"], a: 1 },
    { q: "If I am not invited in a gathering but you are, what will you do?", o: ["Attend single", "Take me with you", "Cancel going", "Don't think much"], a: 2 },
    { q: "What is my absolute favorite, go-to nickname for you when I'm being sweet?", o: ["Handsome", "Bachha", "Baby", "Tanush"], a: 1 },
    { q: "If I am super frustrated, angry, or giving you a hard time, what is your ultimate move?", o: ["Give me space until I calm down", "Try to logically argue your point", "Pull me close, don't give up, and tell me to hug you"], a: 2 },
    { q: "What is my absolute favorite thing to see when you randomly send it to me?", o: ["A long text paragraph", "A voice note explaining your day", "A random selfie of your handsome face", "A link to a song you like"], a: 2 },
    { q: "What was our record-breaking routine before your hectic schedule started?", o: ["Sending 100+ reels a day", "Quick 10-minute catch-up calls", "8-hour nightly video calls where we fell asleep together"], a: 2 },
    { q: "When the screen feels irritating and distance gets tough, what is the one thing I am SUPERRR sure of?", o: ["That things will always be shiny", "That the distance will win", "That I will still choose you over anything and everything"], a: 2 },
    { q: "How has our current situation and the distance changed my perspective on our relationship?", o: ["It has made me anxious", "It has taught me true patience with your time", "It has made me want to give up"], a: 1 },
    { q: "How do I genuinely view our entire journey, including how our paths crossed?", o: ["Just a random accident", "A temporary chapter", "A beautiful plan that God already knew was going to happen"], a: 2 },
    { q: "Even when I'm challenging your thoughts or testing your patience, what do you never do?", o: ["Walk away angry", "Let me feel down", "Ignore my texts"], a: 1 }
];

function executeCinematicFlash() {
    document.getElementById('portalMediaTrack').play().catch(e => console.log("Media initialization cycle handled."));
    const overlay = document.getElementById('entrance-overlay');
    overlay.classList.add('flash-active');
    setTimeout(() => {
        overlay.style.display = 'none';
        document.getElementById('main-dashboard').style.display = 'flex';
        runActiveClock();
        loadPuzzleNode();
    }, 1500);
}

function runActiveClock() {
    setInterval(() => {
        const diff = new Date() - anniversaryDate;
        document.getElementById('days').innerText = Math.floor(diff / 86400000).toString().padStart(2, '0');
        document.getElementById('hours').innerText = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
        document.getElementById('mins').innerText = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
        document.getElementById('secs').innerText = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
    }, 1000);
}

function navigateHub(pageId) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active-page'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active-tab'));
    document.getElementById(`page-${pageId}`).classList.add('active-page');
    event.target.classList.add('active-tab');
}

function loadPuzzleNode() {
    if (currentQuestionIdx >= questions.length) {
        document.getElementById('quizBox').innerHTML = "<h4 style='color:var(--electric-glow); text-align:center;'>BLOCK INTEGRATION TERMINATED. LOADING ENTRY FIELD...</h4>";
        setTimeout(() => { document.getElementById('riddle-modal').style.display = 'flex'; }, 1100);
        return;
    }
    const node = questions[currentQuestionIdx];
    document.getElementById('questionText').innerText = `DATA UNIT ${currentQuestionIdx + 1}: ${node.q}`;
    const container = document.getElementById('optionsBox'); container.innerHTML = '';
    node.o.forEach((opt, idx) => {
        const btn = document.createElement('button'); btn.className = 'option-btn'; btn.innerText = opt;
        btn.onclick = () => validateSelection(idx); container.appendChild(btn);
    });
}

function validateSelection(selectedIdx) {
    if (selectedIdx === questions[currentQuestionIdx].a) {
        document.getElementById(`p${currentQuestionIdx + 1}`).classList.add('unlocked');
        currentQuestionIdx++; loadPuzzleNode();
    } else { alert("ALIGNED NODE CORRUPTION: Review baseline trace records."); }
}

function executeRiddleValidation() {
    if (document.getElementById('riddleAnswer').value.trim().toLowerCase() === 'hugs') {
        clearKeyAccess = true; document.getElementById('riddle-modal').style.display = 'none';
        navigateHub('box');
        document.getElementById('boxStatus').innerText = "SIGNATURE VERIFIED. VAULT CORE SECTOR READY.";
        document.getElementById('boxStatus').style.color = 'var(--electric-glow)';
    } else { alert("ACCESS DISALLOWED: Token mismatch."); }
}

function attemptBoxActivation() {
    if (!clearKeyAccess) { return; }
    const box = document.getElementById('physicalBox');
    box.removeAttribute('onclick'); box.classList.add('box-rotate-animation');
    document.getElementById('boxStatus').innerText = "SPINNING KINETIC PERSPECTIVE AXIS...";

    setTimeout(() => {
        document.getElementById('boxStatus').style.display = 'none';
        box.style.display = 'none';
        initializeExtendedDelayReveal();
    }, 2400);
}

function initializeExtendedDelayReveal() {
    const timerBox = document.getElementById('revealTimerBox');
    timerBox.style.display = 'block';
    let durationLeft = 300; // 5 Minutes
    
    const timerEngine = setInterval(() => {
        durationLeft--;
        let mins = Math.floor(durationLeft / 60).toString().padStart(2, '0');
        let secs = (durationLeft % 60).toString().padStart(2, '0');
        document.getElementById('countdownDisplay').innerText = `${mins}:${secs}`;
        
        let percent = ((300 - durationLeft) / 300) * 100;
        document.getElementById('timerProgress').style.width = `${percent}%`;

        if (durationLeft <= 0) {
            clearInterval(timerEngine);
            timerBox.style.display = 'none';
            document.getElementById('secretVault').style.display = 'block';
        }
    }, 1000);
}
