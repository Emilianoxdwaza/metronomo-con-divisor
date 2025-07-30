let bpm = 60;
let intervalId;

const audio = new Audio("click.mp3");

const bpmInput = document.getElementById("bpm");
const bpmDisplay = document.getElementById("bpmDisplay");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const divideButton = document.getElementById("divide"); // NUEVO

bpmInput.addEventListener("input", () => {
  bpm = parseInt(bpmInput.value);
  bpmDisplay.textContent = bpm;
  if (intervalId) {
    stopMetronome();
    startMetronome();
  }
});

startButton.addEventListener("click", startMetronome);
stopButton.addEventListener("click", stopMetronome);

divideButton.addEventListener("click", () => {
  bpm = Math.max(1, Math.round(bpm / 2)); // mínimo 1 BPM
  bpmInput.value = bpm;
  bpmDisplay.textContent = bpm;
  if (intervalId) {
    stopMetronome();
    startMetronome();
  }
});

function startMetronome() {
  const interval = 60000 / bpm;

  intervalId = setInterval(() => {
    audio.currentTime = 0;
    audio.play();

    // Detener el sonido después de 0.2 segundos (solo suena el 'tic')
    setTimeout(() => {
      audio.pause();
    }, 200);
  }, interval);
}


function stopMetronome() {
  clearInterval(intervalId);
  intervalId = null;
}
