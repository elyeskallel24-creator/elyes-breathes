let isRunning = false;
let currentStep = 0; // 0: Inhale 1, 1: Exhale 1, 2: Inhale 2, 3: Exhale 2
let countdown = 0;
let timerId = null;

const circle = document.getElementById('breathCircle');
const statusText = document.getElementById('statusText');
const timerText = document.getElementById('timerText');
const startBtn = document.getElementById('startBtn');

function getDurations() {
    return [
        parseInt(document.getElementById('inhale1Time').value) || 4,
        parseInt(document.getElementById('exhale1Time').value) || 4,
        parseInt(document.getElementById('inhale2Time').value) || 4,
        parseInt(document.getElementById('exhale2Time').value) || 4
    ];
}

function startBreathing() {
    isRunning = true;
    startBtn.textContent = "Pause";
    currentStep = 0;
    runStep();
}

function runStep() {
    if (!isRunning) return;
    
    const durations = getDurations();
    countdown = durations[currentStep];
    
    // Update visual patterns based on your rule
    if (currentStep === 0 || currentStep === 2) {
        statusText.textContent = "Inhale";
        circle.style.transform = "scale(1.5)";
        circle.style.backgroundColor = "rgba(100, 255, 218, 0.4)";
        circle.style.boxShadow = "0 0 50px rgba(100, 255, 218, 0.6)";
    } else {
        statusText.textContent = "Exhale";
        circle.style.transform = "scale(0.9)";
        circle.style.backgroundColor = "rgba(26, 115, 232, 0.3)";
        circle.style.boxShadow = "0 0 20px rgba(26, 115, 232, 0.4)";
    }

    // Set CSS transition timing perfectly to match current custom user input
    circle.style.transition = `all ${countdown}s linear`;
    
    updateTimerText();

    if (timerId) clearInterval(timerId);
    
    timerId = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            clearInterval(timerId);
            currentStep = (currentStep + 1) % 4; // Cycles through the 4 custom breathes indefinitely
            runStep();
        } else {
            updateTimerText();
        }
    }, 1000);
}

function updateTimerText() {
    timerText.textContent = `${countdown}s`;
}

function pauseBreathing() {
    isRunning = false;
    clearInterval(timerId);
    startBtn.textContent = "Begin";
    statusText.textContent = "Paused";
    circle.style.transform = "scale(1)";
    circle.style.transition = "all 1s ease";
}

startBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseBreathing();
    } else {
        startBreathing();
    }
});

