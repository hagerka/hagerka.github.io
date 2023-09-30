const speakerIcon = document.querySelector("#speaker-icon");
const muteIcon = document.querySelector("#mute-icon");
const speechSession = window.speechSynthesis;

speakerIcon.addEventListener("click", () => {
  speakerIcon.classList.add("muted");
  muteIcon.classList.remove("unmuted");
});

muteIcon.addEventListener("click", () => {
  speechSession.cancel();
  let utterance = new SpeechSynthesisUtterance("Speech turned on");
  speechSynthesis.speak(utterance);
  speakerIcon.classList.remove("muted");
  muteIcon.classList.add("unmuted");
});
