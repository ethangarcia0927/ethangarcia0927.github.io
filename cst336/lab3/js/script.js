// event listeners
document.querySelector("#zip").addEventListener("change",displayCity);
document.querySelector("#state").addEventListener("change",displayCounties);
document.querySelector("#username").addEventListener("change",checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
});
document.querySelector("#password").addEventListener("focus", suggestPassword);

// functions

// Displaying city from Web API after entering a zip code
async function displayCity() {
    //alert(document.querySelector("#zip").value);
    let zipCode = document.querySelector("#zip").value;

    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();

    if (!data || !data.city) {
    document.querySelector("#city").innerHTML = "Zip code not found";
    document.querySelector("#latitude").innerHTML = "";
    document.querySelector("#longitude").innerHTML = "";
    } else {
     document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
    }
    
}

// Displaying counties from Web API based on the two-letter abbreviation of a state
async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i=0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

// Checking whether the username is available
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError")
    if (data.available) {
        usernameError.innerHTML = " Username available!";
        usernameError.style.color = "green";
    }
    else {
        usernameError.innerHTML = " Username taken";
        usernameError.style.color = "red";
    }
}

// Validating form data
function validateForm(e) {
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let retypePassword = document.querySelector("#retypePassword").value;

    let usernameError = document.querySelector("#usernameError");
    let passwordError = document.querySelector("#passwordError");

    // Clear previous errors
    usernameError.innerHTML = "";
    passwordError.innerHTML = "";


    // Username checks
    if (username.length === 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required!";
        isValid = false;
    } else if (username.length <= 5) {
        usernameError.innerHTML = "Username must be greater than five characters!";
        isValid = false;
    }

    // Password Checks
    if (password.length < 6) {
        passwordError.innerHTML = "Password must be at least six characters!";
        isValid = false;
    } 
    else if (password !== retypePassword) {
        passwordError.innerHTML = "Passwords do not match!";
        isValid = false;
    }
    
    if (!isValid) {
        e.preventDefault();
    }
}

// Suggest password generator
// Source: https://stackoverflow.com/questions/1497481/javascript-password-generator
function suggestPassword() {
    let suggestedPwd = document.querySelector("#suggestedPwd");
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        password = "";
    for (var i = 0, n = charset.length; i < 9; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    suggestedPwd.innerHTML = `Try this: ${password}`;
    suggestedPwd.style.color = "blue";
}

window.onload = displayStates;
async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    let stateDropdown = document.querySelector("#state");
    stateDropdown.innerHTML = "<option>Select One</option>";

    for (let state of data) {
        stateDropdown.innerHTML += `<option value="${state.usps}">${state.state}</option>`;
    }
}