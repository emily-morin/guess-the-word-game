// GUESS THE WORD JS

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// querySelector

// selecting ul of letters that the user has guessed 
const lettersList = document.querySelector(".guessed-letters");

// selecting Guess! button
const guessButton = document.querySelector(".guess");

// selecting the text input where the user guesses a letter
const letterInput = document.querySelector(".letter");

// selecting the word in progress p element
const wordInProgress = document.querySelector(".word-in-progress");

// selecting the remaining guesses p element
const howManyGuesses = document.querySelector(".remaining");

// selecting the span inside remaining guesses p element
const numRemainingGuesses = document.querySelector(".remaining span");

// selecting the p element where messages appear after user guesses a letter
const guessMessage = document.querySelector(".message");

// selecting the button that allows the user to play again
const playAgainButton = document.querySelector(".play-again");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~ GLOBAL VARIABLES ~~~~~~~~~~~~~~~~~~~

// starting word for test
let word = "magnolia";

// array holding letters that the user has guessed
let guessedLetters = [];

// number of remaining guesses
let remainingGuesses = 8;

// ~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~

// async function to get new random word
const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    let randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    console.log(word);
    hiddenLetters(word);
}

// function that creates placeholders for letters in the word
const hiddenLetters = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
}

getWord();

// event listener for guess button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    // empty the message p
    guessMessage.innerText = "";
    // capture what user entered in the input field
    const userGuess = letterInput.value;
    // use validateInput function to make sure guess was a single letter
    const validGuess = validateInput(userGuess);
    // add the valid guess
    if (validGuess) {
        makeGuess(userGuess);
    }
    // empty guess input field
    letterInput.value = "";
});

// function to validate user input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        guessMessage.innerText = "Please enter a letter!";
    } else if (input.length > 1) {
        guessMessage.innerText = "Please enter only one letter at a time!";
    } else if (!input.match(acceptedLetter)) {
        guessMessage.innerText = "Please enter a letter from A to Z!";
    } else {
        return input;
    }
}

// function to capture user's guesses and add them to the guessedLetters array
const makeGuess = function (letter) {
    const upperCaseLetter = letter.toUpperCase();
    if (guessedLetters.includes(upperCaseLetter)) {
        guessMessage.innerText = "You already guessed that letter. Try again!";
    } else {
        guessedLetters.push(upperCaseLetter);
        displayGuessedLetters();
        guessesLeft(letter);
        revealCorrectLetters(guessedLetters);
    }
}

// function to display guessed letters
const displayGuessedLetters = function () {
    lettersList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        lettersList.append(li);
    }
}

// function to update the word in progress when a letter guess is correct
const revealCorrectLetters = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const correctLettersArray = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            correctLettersArray.push(letter.toUpperCase());
        } else {
            correctLettersArray.push("●");
        }
    }
    wordInProgress.innerText = correctLettersArray.join("");
    playerWon();
}

// function to update number of remaining guesses
const guessesLeft = function (guess) {
    word.toUpperCase();
    if (!word.includes(guess)) {
        guessMessage.innerText = "Sorry, your guess was incorrect.";
        remainingGuesses -= 1;
        numRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    } else {
        guessMessage.innerText = "Good guess!";
    }
    if (remainingGuesses === 0) {
        guessMessage.innerText = `Game over. The word was ${word.toUpperCase()}.`;
        startOver();
    } 
}

// function to check if the player won
const playerWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
        startOver();
    }
};

// function to restart game
const startOver = function () {
    guessButton.classList.add("hide");
    howManyGuesses.classList.add("hide");
    lettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
}

// play again button event listener
playAgainButton.addEventListener("click", function () {
    guessMessage.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    numRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    guessMessage.innerText = "";
    lettersList.innerHTML = "";

    getWord();

    guessButton.classList.remove("hide");
    howManyGuesses.classList.remove("hide");
    lettersList.classList.remove("hide");
    playAgainButton.classList.add("hide");
});
