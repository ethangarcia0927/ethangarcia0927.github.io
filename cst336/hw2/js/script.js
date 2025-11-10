// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz)

// Global variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ4Choices();
displayQ10Choices();

// Functions
function rightAnswser(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";
    score += 10;
}

function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i = 0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}"
         value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
    }
}

function displayQ10Choices() {
    let q10ChoicesArray = ["Arizona", "California", "Nevada", "New Mexico"];
    q10ChoicesArray = _.shuffle(q10ChoicesArray);
    for (let i = 0; i < q10ChoicesArray.length; i++) {
        document.querySelector("#q10Choices").innerHTML += ` <input type="radio" name="q10" id= "${q10ChoicesArray[i]}"
         value="${q10ChoicesArray[i]}"> <label for="${q10ChoicesArray[i]}"> ${q10ChoicesArray[i]}</label>`;
    }
}

function isFormValid(){
    let isValid = true;
    if (document.querySelector("#q1").value =="") {
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
    }
    return isValid;
} //isFormValid

function gradeQuiz() {
    console.log("Grading quiz...");
    document.querySelector("#validationFdbk").innerHTML = ""; //resets validation feedback
    if (!isFormValid()) {
        return;
    }

    // Variables
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q6Response = document.querySelector("input[name=q6]:checked").value;
    let q7Response = document.querySelector("#q7").value;
    let q8Response = document.querySelector("#q8").value;
    let q9Response = document.querySelector("#q9").value.toLowerCase();
    let q10Response = document.querySelector("input[name=q10]:checked").value;
    console.log(q1Response);

    // Grading question 1
    if (q1Response == "sacramento") {
        rightAnswser(1);
    }
    else {
        wrongAnswer(1);
    }

    // Grading question 2
    if (q2Response == "mo") {
        rightAnswser(2);
    }
    else {
        wrongAnswer(2);
    }

    // Grading question 3
    if (document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked) {
            rightAnswser(3);
    }
    else {
        wrongAnswer(3);
    }

    // Grading question 4
    if (q4Response == "Rhode Island") {
        rightAnswser(4);
    }
    else {
        wrongAnswer(4);
    }

    // Grading question 5
    if ( document.querySelector("#Washington").checked &&
        document.querySelector("#Montana").checked &&
        document.querySelector("#northDakota").checked &&
        !document.querySelector("#Utah").checked) {
        rightAnswser(5);
    }
    else {
        wrongAnswer(5);
    }

    // Grading question 6
    if (q6Response == "newYorkCity") {
        rightAnswser(6);
    }
    else {
        wrongAnswer(6);
    }

    // Grading question 7
    if (q7Response == "alaska") {
        rightAnswser(7);
    }
    else {
        wrongAnswer(7);
    }

    // Grading question 8
    if (q8Response == "rhodeIsland") {
        rightAnswser(8);
    }
    else {
        wrongAnswer(8);
    }

    // Grading question 9
    if (q9Response == "denali" || q9Response == "mckinley") {
        rightAnswser(9);
    }
    else {
        wrongAnswer(9);
    }

    // Grading question 10
    if (q10Response == "Arizona") {
        rightAnswser(10);
    }
    else {
        wrongAnswer(10);
    }


    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);

    // Display total score
document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;

// Change color based on score
if (score >= 80) {
    document.querySelector("#totalScore").className = "text-success"; // green
    document.querySelector("#validationFdbk").innerHTML = "Congratulations! Great job!";
    document.querySelector("#validationFdbk").className = "bg-success text-white";
} else {
    document.querySelector("#totalScore").className = "text-danger"; // red
    document.querySelector("#validationFdbk").innerHTML = "Keep trying! You can do better next time!";
    document.querySelector("#validationFdbk").className = "bg-danger text-white";
}

} //gradeQuiz
