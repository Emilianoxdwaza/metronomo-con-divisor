let bpm = 60;
let intervalId;

const audio = new Audio("click.mp3");

const bpmInput = document.getElementById("bpm");
const bpmDisplay = document.getElementById("bpmDisplay");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");

// Agrega la función que faltaba
function redondearMultiplo(valor, multiplo) {
  return Math.round(valor / multiplo) * multiplo;
}

multiplyButton.addEventListener("click", () => {
  bpm = redondearMultiplo(bpm * 2, 5); // Redondea al múltiplo más cercano de 5
  bpm = Math.min(240, bpm); // Limita máximo a 240 BPM
  bpmInput.value = bpm;
  bpmDisplay.textContent = bpm;
  if (intervalId) {
    stopMetronome();
    startMetronome();
  }
});

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
  intervalId
}
