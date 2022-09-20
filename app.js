var word = "";
var error = 0;

//Verificación de lista de palabras
const wordsHangman = ["HTML", "CSS", "REACT", "NODEJS"];
window.localStorage.getItem("list") === null
  ? window.localStorage.setItem("list", JSON.stringify(wordsHangman))
  : false;

//Manejo de pop up
var Alert = new CustomAlert();

function CustomAlert() {
  this.render = function () {
    let popUpBox = document.getElementById("popUpBox");
    let back = document.getElementById("popUpOverlay");
    back.style.display = "block";
    popUpBox.style.display = "block";
    document.getElementById(
      "closeModal"
    ).innerHTML = `<button type="button" class="btn btn-outline-success" onclick="retry();">Reintentar</button>`;
  };

  this.ok = function () {
    document.getElementById("popUpBox").style.display = `none`;
    document.getElementById("popUpOverlay").style.display = `none`;
  };
}

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
  console.log(inputGood);
  if (inputGood == word) {
    Alert.render("Ganaste!!!");
    document.getElementById("textBox").textContent = "Ganaste!!!";
  }
};

let checkLose = () => {
  if (error == 9) {
    Alert.render("Perdiste");
    document.getElementById("textBox").textContent = "Perdiste :(";
  }
};

//Control de inputs
let isOk = (data) => {
  let x = data.validity.patternMismatch;
  let newWord = data.value;
  newWord = newWord.substring(0, newWord.length - 1);
  x ? (data.value = newWord) : false;
};

//Guardado de nuevas palabras
let saveNewWord = () => {
  let wordList = JSON.parse(window.localStorage.getItem("list"));
  let data = document.getElementById("add-new-words");
  if (wordList.includes(data.value)) {
    document.querySelector(".newWordAdded").textContent =
      "La palabra ya existe";
  } else {
    document.querySelector(".newWordAdded").textContent =
      "Se guardo la nueva palabra";
    wordList.push(data.value);
    window.localStorage.setItem("list", JSON.stringify(wordList));
  }
  data.value = '';
};
