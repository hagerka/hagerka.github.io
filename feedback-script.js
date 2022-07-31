const allElements = document.getElementsByTagName("p");
const allIds = [];
const allFrom = [];
const allClasses = [];

const dateButton = document.getElementById("datebtn");
dateButton.addEventListener("click", orderByDate);
const fromButton = document.getElementById("frombtn");
fromButton.addEventListener("click", orderByAuthor);

function orderByDate() {
  const frag = document.createDocumentFragment();

  for (let i = 0, n = allElements.length; i < n; i++) {
    let el = allElements[i];
    if (el.id) {
      allIds.push(el.id.slice(4, 8) + el.id.slice(0, 4));
    }
  }
  allIds.sort();
  console.log(`ordered by date`);
  return allIds;
}

function orderByType() {
  for (let i = 0, n = allElements.length; i < n; ++i) {
    let el = allElements[i];
    if (el.className) {
      allClasses.push(el.className);
    }
  }
  allClasses.sort();
  return allClasses;
}

function orderByAuthor() {
  for (let i = 0, n = allElements.length; i < n; ++i) {
    let el = allElements[i];
    if (el.getAttribute("from")) {
      allFrom.push(el.getAttribute("from"));
    }
  }
  allFrom.sort();
  console.log(`ordered by author`);

  return allFrom;
}
