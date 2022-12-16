const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let msecs = 0;

startBtn.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 50);
    }
})
pauseBtn.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
})
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    msecs = 0;
    timeDisplay.textContent = "00:00:00:000";
})

function updateTime() {
    elapsedTime = Date.now() - startTime;
    secs = pad(Math.floor((elapsedTime / 1000) % 60));
    mins = pad(Math.floor(elapsedTime / (1000 * 60) % 60));
    hrs = pad(Math.floor(elapsedTime / (1000 * 60 * 60) % 60));
    msecs = pad1(Math.floor(elapsedTime % 100));
    timeDisplay.textContent = `${hrs}:${mins}:${secs}:${msecs}`;

    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
    function pad1(unit) {
        if (unit < 10) {
            return "00" + unit;
        } else if (unit >= 10 && unit < 100) {
            return "0" + unit;
        } else
            return unit;
    }
}