// Your script here.
const textInput = document.getElementById("text");
const voiceSelect = document.getElementById("voice");
const speakBtn = document.getElementById("speak");
const stopBtn = document.getElementById("stop");
const rateSlider = document.getElementById("rate");
const pitchSlider = document.getElementById("pitch");

let voices = [];
let currentUtterance = null;

function loadVoices() {
    voices = window.speechSynthesis.getVoices();

    voiceSelect.innerHTML = "";

    if (voices.length === 0) {
        const option = document.createElement("option");
        option.textContent = "No voices available";
        option.disabled = true;
        option.selected = true;
        voiceSelect.appendChild(option);
        return;
    }

    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

function speakText() {
    const text = textInput.value.trim();

    if (!text) return;

    window.speechSynthesis.cancel();

    currentUtterance = new SpeechSynthesisUtterance(text);

    const selectedVoice = voices[voiceSelect.value];
    if (selectedVoice) {
        currentUtterance.voice = selectedVoice;
    }

    currentUtterance.rate = parseFloat(rateSlider.value);
    currentUtterance.pitch = parseFloat(pitchSlider.value);

    window.speechSynthesis.speak(currentUtterance);
}

loadVoices();

window.speechSynthesis.onvoiceschanged = loadVoices;

speakBtn.addEventListener("click", speakText);

stopBtn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
});

voiceSelect.addEventListener("change", () => {
    if (window.speechSynthesis.speaking) {
        speakText();
    }
});

rateSlider.addEventListener("input", () => {
    if (window.speechSynthesis.speaking) {
        speakText();
    }
});

pitchSlider.addEventListener("input", () => {
    if (window.speechSynthesis.speaking) {
        speakText();
    }
});