//Audio del menu
const audioMenu = new Audio("./sound/menu.wav");
audioMenu.play();
audioMenu.loop = true;

//Control del menu del juego
let newGame = () => {
  document.querySelector(".menu").style.display = `none`;
  document.querySelector(".game").style.display = `block`;
  document.querySelector("footer").style.display = `none`;
  aleatoryWord();
  error = 0;
  audioMenu.pause();
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
  audioMenu.play();
  audioMenu.loop = true;
  document.querySelector("footer").style.display = `block`;
};

let retry = () => {
  Alert.ok();
  aleatoryWord();
  error = 0;
  document.querySelector(".hangman").src = `./img/hangman0.jpg`;
  document.querySelector(".fails").textContent = "";
  document.getElementById("hang-input").value = "";
};
