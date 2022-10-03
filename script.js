let childArray = document.querySelectorAll('[id^="float-child"]');
let focusFlag = false;
childArray.forEach((element) => {
  let ghostEl = element.getElementsByTagName("p")[0];
  element.addEventListener("mouseover", (event) => {
    ghostEl.classList.add("focused");
    ghostEl.classList.remove("unfocused");
  });
  element.addEventListener("focus", (event) => {
    ghostEl.classList.add("focused");
    ghostEl.classList.remove("unfocused");
    focusFlag = true;
  });

  element.addEventListener("mouseout", (event) => {
    if (!focusFlag) {
      ghostEl.classList.add("unfocused");
      ghostEl.classList.remove("focused");
    }
  });
  element.addEventListener("blur", (event) => {
    ghostEl.classList.add("unfocused");
    ghostEl.classList.remove("focused");
    focusFlag = false;
  });
});
