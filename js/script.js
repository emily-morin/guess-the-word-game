// GUESS THE WORD JS

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// querySelector

// selecting ul of letters that the user has guessed 
const guessedLetters = document.querySelector(".guessed-letters");

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

const hiddenLetters = function (word) {
    wordInProgress.innerText = "●".repeat(word.length);
    console.log(wordInProgress);
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
    const userGuess = letterInput.value;
    console.log(userGuess);
    letterInput.value = "";
});