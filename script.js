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
  let lastUtterance = "";
  speechSynthesis.speak(utterance);
  speakerIcon.classList.remove("muted");
  muteIcon.classList.add("unmuted");
});

document.body.addEventListener("mousemove", evt => {
  let lastUtterance = "";
  let utterance = new SpeechSynthesisUtterance(evt.target.innerText);
  if (utterance !== lastUtterance) {
    speechSynthesis.speak(utterance);
    utterance = lastUtterance;
  }
});
