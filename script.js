let childArray = document.querySelectorAll('[id^="float-child"]');
let focusFlag = false;

childArray.forEach((element) => {
  let relatedEl = document.getElementById("text-" + element.id);

  element.addEventListener("mouseover", (event) => {
    relatedEl.classList.add("focused");
    relatedEl.classList.remove("unfocused");
  });
  element.addEventListener("focus", (event) => {
    relatedEl.classList.add("focused");
    relatedEl.classList.remove("unfocused");
    // focusFlag = true;
  });

  element.addEventListener("mouseout", (event) => {
    // if (!focusFlag) {
    relatedEl.classList.add("unfocused");
    relatedEl.classList.remove("focused");
    // }
  });
  element.addEventListener("blur", (event) => {
    relatedEl.classList.add("unfocused");
    relatedEl.classList.remove("focused");
    // focusFlag = false;
  });
});
