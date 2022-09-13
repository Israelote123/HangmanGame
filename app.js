let newGame = () => {
    document.querySelector('.menu').style.display = `none`
    document.querySelector('.game').style.display = `block`
}

let addNewWord = () => {
    document.querySelector('.menu').style.display = `none`
    document.querySelector('.newWords').style.display = `block`
}

let cancelNewWord = () => {
    document.querySelector('.menu').style.display = `block`
    document.querySelector('.newWords').style.display = `none`
}