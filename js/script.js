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
const remainingGuesses = document.querySelector(".remaining");

// selecting the span inside remaining guesses p element
const numRemainingGuesses = document.querySelector(".remaining span");

// selecting the p element where messages appear after user guesses a letter
const guessMessage = document.querySelector(".message");

// selecting the button that prompts user to play again
const playAgainButton = document.querySelector(".play-again");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// starting word for test
const word = "magnolia";

// array holding letters that the user has guessed
const guessedLetters = [];

// function that creates placeholders for letters in the word
const hiddenLetters = function (word) {
    wordInProgress.innerText = "●".repeat(word.length);
    // console.log(wordInProgress);
    // vvv skillcrush solution vvv
    // const placeholderLetters = [];
    // for (const letter of word) {
    //     console.log(letter);
    //     placeholderLetters.push("●");
    // }
    // wordInProgress.innerText = placeholderLetters.join("");
}
hiddenLetters(word);

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
    // reset input field
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
        console.log(guessedLetters);
    }
}