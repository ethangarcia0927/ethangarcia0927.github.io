//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global Variables

let randomNumber;
let attempts = 0;
let wins = 0; // Missing feature #2
let losses = 0; // Missing feature #2


initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);

    // hiding the reset button
    document.querySelector("#resetBtn").style.display = "none";

    // showing the guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); // Adding focus to textbox
    playerGuess.value = ""; // Clearing the textbox
    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; // Clearing feedback message
    document.querySelector("#guesses").textContent = "";
    document.querySelector("#attemptsLeft").textContent = "Attempts left: 7" // Missing feature #1

    attempts = 0;
}

function checkGuess() {
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Please enter a value between 1 and 99!";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    let attemptsLeft = 7 - attempts; // Missing feature #1
    document.querySelector("#attemptsLeft").textContent = "Attempts left: " + attemptsLeft; // Missing feature #1
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "darkgreen";
        wins++; // Missing feature #2
        gameOver();
    }
    else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
        feedback.textContent = "Sorry, you lost!";
        feedback.style.color = "red";
        losses++; // Missing feature #2
        gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high!";
        } else {
            feedback.textContent = "Guess was low!";
        }
    }
}

function gameOver() {
    guessBtn = document.querySelector("#guessBtn");
    resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; // hides guess button
    resetBtn.style.display = "inline"; // shows reset button

    feedback.innerHTML += `<br><span style="color: blue;">The correct number was ${randomNumber}.</span>`;

    document.querySelector("#winCount").textContent = wins; // Missing feature #2
    document.querySelector("#lossCount").textContent = losses;// Missing feature #2
}