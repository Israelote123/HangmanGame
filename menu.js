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

let retry = () => {
  Alert.ok();
  aleatoryWord();
  error = 0;
  document.querySelector(".hangman").src = `./img/hangman0.jpg`;
  document.querySelector(".fails").textContent = "";
  document.getElementById("hang-input").value = "";
};
