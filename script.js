document.addEventListener("DOMContentLoaded", function () {
  const speakerIcon = document.getElementById("speaker-icon");
  const muteIcon = document.getElementById("mute-icon");
  const webspeechContainer = document.getElementById("webspeech");
  let speaking = false;
  let speechSynthesis = window.speechSynthesis;
  let utterance;

  function toggleSpeech() {
    if (!speaking) {
      speaking = true;
      speakerIcon.classList.remove("muted");
      muteIcon.classList.add("muted");

      const textToRead = document.querySelector("main").textContent;

      utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = function () {
        resetSpeech();
      };

      speechSynthesis.speak(utterance);
    } else {
      resetSpeech();
    }
  }

  function resetSpeech() {
    speaking = false;
    speechSynthesis.cancel();
    speakerIcon.classList.add("muted");
    muteIcon.classList.remove("muted");
  }

  webspeechContainer.addEventListener("click", toggleSpeech);

  const projectItems = document.querySelectorAll("#gridded-list li");
  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  document
    .querySelector(".main-content-link")
    .addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("#main").scrollIntoView({
        behavior: "smooth",
      });
      // Set focus to the main content
      document.querySelector("#main").setAttribute("tabindex", "-1");
      document.querySelector("#main").focus();
    });
});
