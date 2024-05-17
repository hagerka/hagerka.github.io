const speakerIcon = document.querySelector("#speaker-icon");
const muteIcon = document.querySelector("#mute-icon");
const speechSession = window.speechSynthesis;

let flag = false;
speakerIcon.addEventListener("click", () => {
  flag = false;
  speakerIcon.classList.add("muted");
  muteIcon.classList.remove("unmuted");
});

muteIcon.addEventListener("click", () => {
  speechSession.cancel();
  flag = true;
  let utterance = new SpeechSynthesisUtterance("Speech turned on");
  speechSynthesis.speak(utterance);
  speakerIcon.classList.remove("muted");
  muteIcon.classList.add("unmuted");
});

document.body.addEventListener("mouseover", evt => {
  speechSession.cancel();
  let lastUtterance = "";
  let utterance = new SpeechSynthesisUtterance(evt.target.innerText);
  if (utterance !== lastUtterance && flag) {
    speechSynthesis.speak(utterance);
    utterance = lastUtterance;
  }
});
