var word = "";

//Verificación de lista de palabras
const wordsHangman = ['HTML', 'CSS', 'REACT', 'NODEJS'];
window.localStorage.getItem('list') === null ? window.localStorage.setItem('list', JSON.stringify(wordsHangman)) : false;


//Control del menu del juego
let newGame = () => {
    document.querySelector('.menu').style.display = `none`;
    document.querySelector('.game').style.display = `block`;
    aleatoryWord();
}

let addNewWord = () => {
    document.querySelector('.menu').style.display = `none`;
    document.querySelector('.newWords').style.display = `block`;
}

let cancelNewWord = () => {
    document.querySelector('.menu').style.display = `block`;
    document.querySelector('.newWords').style.display = `none`;
}

//Elección de palabra al azar
let aleatoryWord = () => {
    let hangmanList = JSON.parse(window.localStorage.getItem('list'));
    let wordIndex = Math.floor(Math.random() * hangmanList.length + 1);
    let lengthWord = hangmanList[wordIndex].length;
    word = hangmanList[wordIndex]
    var divs = "";
    
    for(let i = 0; i < lengthWord; i++){
        divs = divs + `<div class="letters" id="letter${i}"></div>\n`;
    }
    document.querySelector('.container').innerHTML = divs;
}

//Input al iniciar el juego
let gameInput = (userInput) => {
    var keycode = userInput.keyCode;
    let letter = userInput.value;
    var placeLetter = 0;
    var i = 0;

    console.log(keycode)
    if(keycode == '13'){
        if(word.indexOf(letter,0) == -1){
            showIncorrectLetter(letter);
        } else {
            while(placeLetter != -1){
                placeLetter = word.indexOf(letter,i);
                showLetter(placeLetter, letter);
                i = placeLetter + 1;
              }
        }
    } else {
        isOk(userInput);
    }
}

//Muestra las letras en su lugar
let showLetter = (place, letter) => {
    let element = document.getElementById(`letters${place}`);
    element.textContent = letter;
    element.style.borderStyle = `outset`;
    element.style.backgroundColor = `#c6dff0`;
}

//Muestra las letras que ya usaste
let showIncorrectLetter = (letter) => {
    let check = document.querySelector('.fails');
    if(check.value.indexOf(letter,0) == -1){
        check.value = `${check.value} ${letter}`;
    }
}

//Control de inputs
let isOk = (data) => {
    let x = data.validity.patternMismatch;
    let newWord = data.value;
    newWord = newWord.substring(0, newWord.length - 1);
    x ? data.value = newWord : false;
}

