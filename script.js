let bpm = 60;
let intervalId;

const audio = new Audio("click.mp3");
const strongAudio = new Audio("click-strong.mp3"); // Si no tienes este archivo, usa "click.mp3"

const bpmInput = document.getElementById("bpm");
const bpmDisplay = document.getElementById("bpmDisplay");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");

const beatsPerBarInput = document.getElementById("beatsPerBar");
const beatsPerBarDisplay = document.getElementById("beatsPerBarDisplay");
const beatIndicator = document.getElementById("beatIndicator");

let beatsPerBar = 4;
let currentBeat = 1;

function redondearMultiplo(valor, multiplo) {
  return Math.round(valor / multiplo) * multiplo;
}

multiplyButton.addEventListener("click", () => {
  bpm = redondearMultiplo(bpm * 2, 5);
  bpm = Math.min(240, bpm);
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
  bpm = Math.max(1, Math.round(bpm / 2));
  bpmInput.value = bpm;
  bpmDisplay.textContent = bpm;
  if (intervalId) {
    stopMetronome();
    startMetronome();
  }
});

beatsPerBarInput.addEventListener("input", () => {
  beatsPerBar = parseInt(beatsPerBarInput.value);
  beatsPerBarDisplay.textContent = beatsPerBar;
  currentBeat = 1;
  if (intervalId) {
    stopMetronome();
    startMetronome();
  }
});

function startMetronome() {
  const interval = 60000 / bpm;
  currentBeat = 1;
  beatIndicator.textContent = "";
  intervalId = setInterval(() => {
    // Visualiza el tiempo actual
    beatIndicator.textContent = currentBeat;

    // Marca el primer tiempo como fuerte
    if (currentBeat === 1) {
      beatIndicator.style.color = "#00ff99";
      if (strongAudio.src !== "") {
        strongAudio.currentTime = 0;
        strongAudio.play();
        setTimeout(() => { strongAudio.pause(); }, 200);
      } else {
        audio.currentTime = 0;
        audio.play();
        setTimeout(() => { audio.pause(); }, 200);
      }
    } else {
      beatIndicator.style.color = "#fff";
      audio.currentTime = 0;
      audio.play();
      setTimeout(() => { audio.pause(); }, 200);
    }

    currentBeat++;
    if (currentBeat > beatsPerBar) currentBeat = 1;
  }, interval);
}

function stopMetronome() {
  clearInterval(intervalId);
  intervalId = null;
  beatIndicator.textContent = "";
}
