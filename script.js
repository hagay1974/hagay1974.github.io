const light = document.getElementById('stoplight');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const countdownDisplay = document.getElementById('countdown');
const cycleCounterDisplay = document.getElementById('cycleCounter');

let timer;
let cycleCount = 0;
const inhaleTime = 4000;
const holdTime = 7000;
const exhaleTime = 8000;

let breathing = false;
let currentPhaseTimer;

function startBreathing() {
    if (breathing) {
        return;
    }
    breathing = true;
    cycleCount = 0;
    updateCycleCounter();
    startCycle();
}

function stopBreathing() {
    breathing = false;
    clearTimeout(timer);
    clearInterval(currentPhaseTimer);
    light.classList.remove("green", "yellow", "red");
    light.classList.add("gray");
    countdownDisplay.textContent = "";
}

function resetBreathing(){
    stopBreathing(); // Stop any running exercise
    cycleCount = 0; // Reset cycle count
    updateCycleCounter();
}

function updateCycleCounter(){
    cycleCounterDisplay.textContent = `Cycles: ${cycleCount}`;
}

function startCycle() {
    if (!breathing) {
        return;
    }
    cycleCount++;
    updateCycleCounter();
    light.classList.remove("red", "gray", "yellow");
    light.classList.add("green");

    let remainingTime = inhaleTime / 1000;
    countdownDisplay.textContent = remainingTime;
    currentPhaseTimer = setInterval(() => {
        remainingTime--;
        countdownDisplay.textContent = remainingTime;
        if (remainingTime <= 0) {
            clearInterval(currentPhaseTimer);
        }
    }, 1000);

    timer = setTimeout(() => {
        light.classList.remove("green");
        light.classList.add("yellow");

        remainingTime = holdTime / 1000;
        countdownDisplay.textContent = remainingTime;
        currentPhaseTimer = setInterval(() => {
            remainingTime--;
            countdownDisplay.textContent = remainingTime;
            if (remainingTime <= 0) {
                clearInterval(currentPhaseTimer);
            }
        }, 1000);

    timer = setTimeout(() => {
        light.classList.remove("yellow");
        light.classList.add("red");

        remainingTime = exhaleTime / 1000;
        countdownDisplay.textContent = remainingTime;
        currentPhaseTimer = setInterval(() => {
            remainingTime--;
            countdownDisplay.textContent = remainingTime;
            if (remainingTime <= 0) {
                clearInterval(currentPhaseTimer);
            }
        }, 1000);

        timer = setTimeout(() => {
            if (breathing) startCycle();
        }, exhaleTime);
    }, holdTime);
    }, inhaleTime);
}

startButton.addEventListener('click', startBreathing);
stopButton.addEventListener('click', stopBreathing);
resetButton.addEventListener('click', resetBreathing);