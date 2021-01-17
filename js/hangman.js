var programming_languages = [
    'javascript',
    'c',
    'c sharp',
    'php',
    'sql'
]

let answer = '';
let maxWrong = 7;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnoprstuvqwyz'.split('').map(letter =>
        ` <button class="btn btn-lg btn-primary m-2" 
       id='` + letter + `' onClick="handleGuess('` + letter + `')">
       ` + letter + `
       </button>`
    ).join('');
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfLost();
        updatePic();
    }
}

function updatePic() {
    document.getElementById('hangPic').src = './images/' + mistakes + '.jpg';
}

function checkIfWon() {
    if (wordStatus == answer) {
        document.getElementById('hangPic').src = './images/winner.png';
        document.getElementById('intro').style.display = 'none';
        document.getElementById('wordSpotlight').innerHTML = "The correct answer was: " + "<b>" + answer + "</b>";
        document.getElementById('keyboard').innerHTML = "Congratulations, you won!"
    }
}

function checkIfLost() {
    if (mistakes == maxWrong) {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('wordSpotlight').innerHTML = "The correct answer was: " + "<b>" + answer + "</b>";
        document.getElementById('keyboard').innerHTML = "Noooo, you' ve lost!"
    }
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangPic').src = './images/0.jpg';
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

document.getElementById('maxWrong').innerHTML = maxWrong;


randomWord();
generateButtons();
guessedWord();
