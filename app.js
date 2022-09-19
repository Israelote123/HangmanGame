var word = "";
var error = 0;

//Verificación de lista de palabras
const wordsHangman = ["HTML", "CSS", "REACT", "NODEJS"];
window.localStorage.getItem("list") === null
  ? window.localStorage.setItem("list", JSON.stringify(wordsHangman))
  : false;

//Control del menu del juego
let newGame = () => {
  document.querySelector(".menu").style.display = `none`;
  document.querySelector(".game").style.display = `block`;
  aleatoryWord();
  error = 0;
  document.querySelector(".hangman").src = `./img/hangman0.jpg`;
};

let addNewWord = () => {
  document.querySelector(".menu").style.display = `none`;
  document.querySelector(".newWords").style.display = `block`;
};

let cancelNewWord = () => {
  document.querySelector(".menu").style.display = `block`;
  document.querySelector(".newWords").style.display = `none`;
};

let backToMenu = () => {
  document.querySelector(".game").style.display = `none`;
  document.querySelector(".menu").style.display = `block`;
  document.querySelector(".container").innerHTML = "";
  error = 0;
  document.querySelector(".hangman").src = `./img/hangman0.jpg`;
};

//Elección de palabra al azar
let aleatoryWord = () => {
  let hangmanList = JSON.parse(window.localStorage.getItem("list"));
  let wordIndex = Math.floor(Math.random() * hangmanList.length);
  let lengthWord = hangmanList[wordIndex].length;
  word = hangmanList[wordIndex];
  var divs = "";

  for (let i = 0; i < lengthWord; i++) {
    divs = divs + `<div class="letters" id="letter${i}"></div>\n`;
  }

  document.querySelector(".container").innerHTML = divs;
};

//Input al iniciar el juego
let gameInput = (userInput) => {
  var keycode = userInput.key;
  let letter = document.getElementById("hang-input").value.toUpperCase();
  var placeLetter = 0;
  var i = 0;

  if (keycode == "Enter") {
    document.getElementById("hang-input").value = "";
    if (word.indexOf(letter, 0) == -1) {
      showIncorrectLetter(letter);
      checkLose();
    } else {
      while (placeLetter != -1) {
        placeLetter = word.indexOf(letter, i);
        showLetter(placeLetter, letter);
        i = placeLetter + 1;
      }
      checkWin();
    }
  }
};

//Muestra las letras en su lugar
let showLetter = (place, letter) => {
  try {
    let element = document.querySelector(`#letter${place}`);
    element.textContent = letter;
    element.style.borderStyle = `outset`;
    element.style.backgroundColor = `#c6dff0`;
  } catch (error) {
    console.error(error);
  }
};

//Muestra las letras que ya usaste
let showIncorrectLetter = (letter) => {
  let check = document.querySelector(".fails");
  if (check.textContent.indexOf(letter, 0) == -1) {
    check.textContent = `${check.textContent} ${letter}`;
    error++;
    document.querySelector(".hangman").src = `./img/hangman${error}.jpg`;
  }
};

//Checa si ganaste o perdiste
let checkWin = () => {
  let inputGood = document.querySelector(".container").textContent;
  inputGood = inputGood.split("\n").join("");
  inputGood == word ? true : false;
};

let checkLose = () => {
  error == 9 ? true : false;
};

//Control de inputs
let isOk = (data) => {
  let x = data.validity.patternMismatch;
  let newWord = data.value;
  newWord = newWord.substring(0, newWord.length - 1);
  x ? (data.value = newWord) : false;
};

//Guardado de nuevas palabras
let saveNewWord = (data) => {
  let wordList = JSON.parse(window.localStorage.getItem("list"));
  wordList.push(data.value);
  window.localStorage.setItem("list", JSON.stringify(wordList))
  data.value = '';
}