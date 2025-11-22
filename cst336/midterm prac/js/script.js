// ============================
// GLOBAL VARIABLES
// ============================

// Stores currently displayed quote for trnaalsation or author info
let currentQuote;

// Define available languages for translation (used in rubric point 4)
const languages = [
    { code: "EN", name: "English", flag: "img/english_flag.png" },    // English
    { code: "ES", name: "Esperanto", flag: "img/esperanto_flag.png" },  // Esperanto
    { code: "FR", name: "French", flag: "img/french_flag.png" },     // French
    { code: "SP", name: "Spanish", flag: "img/spanish_flag.png" }     // Spanish
];

// ============================
// PAGE LOAD EVENTS
// ============================

// When page loads:
// 1. Display a random quote (Rubric 1)
// 2. Display languages in random order (Rubric 4)
// 3. Set a random background image (Rubric 9)
window.addEventListener("load", () => {
    fetchRandomQuote(); // Rubric 1: random quote on page load
    displayLanguages();   // Rubric 4: randomize radio buttons for language
    setRandomBackground();// Rubric 9: random background image
});

// ============================
// FETCH RANDOM QUOTE (Rubric 1)
// ============================

async function fetchRandomQuote() {
     // Rubric 1
    const response = await fetch('https://csumb.space/api/famousQuotes/getRandomQuote.php');
    const data = await response.json();

    currentQuote = data; // Store globally for translation & author info
        currentQuote.quoteId = data.quoteId; 

    // Display the quote and author
    document.querySelector("#quoteText").textContent = `"${data.quoteText}"`; // Rubric 1
    document.querySelector("#quoteAuthor").textContent = `- ${data.firstName} ${data.lastName}`; // Rubric 1
}

// ============================
// DISPLAY AUTHOR INFO (Rubric 2 & 3)
// ============================
document.querySelector("#displayAuthorInfo").addEventListener("click", () => {
    // Rubric 2: Display author picture
    document.querySelector("#authorPic").innerHTML = `<img src="${currentQuote.picture}" alt="${currentQuote.firstName} ${currentQuote.lastName}">`;


    // Rubric 2: Display author bio
    document.querySelector("#authorBio").textContent = currentQuote.bio;

    // Rubric 3: Two-column flex layout handled via CSS class `flex-container`
});

// ============================
// DISPLAY LANGUAGES (Rubric 4)
// ============================
function displayLanguages() {
    // Copy the languages array names into a new array for shuffling
    let languageNamesArray = ["English", "Esperanto", "French", "Spanish"];
    
    // Shuffle the array using Underscore.js (like HW2)
    languageNamesArray = _.shuffle(languageNamesArray);
    
    // Loop through each language and append a radio button + label
    for (let i = 0; i < languageNamesArray.length; i++) {
        document.querySelector("#languageChoices").innerHTML += `
            <input type="radio" name="language" id="${languageNamesArray[i]}" value="${languageNamesArray[i]}">
            <label for="${languageNamesArray[i]}">${languageNamesArray[i]}</label>
        `;
    }
}

// ============================
// TRANSLATE QUOTE (Rubric 5 & 6) SCUFFED DOESNT WORK DONT USE IT
// ============================
document.querySelector("#translateBtn").addEventListener("click", async () => {
    const selectedLang = document.querySelector("input[name=language]:checked");

    // Validation
    if (!selectedLang) {
        return alert("Please select a language"); 
    }

    const langCode = selectedLang.value;

    // API call to translate quote using quoteId and language (Rubric 6)
    const res = await fetch(`https://csumb.space/api/famousQuotes/translateQuote.php?lang=${langCode}&quoteId=${currentQuote.quoteId}`);
    const data = await res.json();

    // Rubric 6: Display translated quote
    document.querySelector("#translatedQuote").textContent = data.translation;

    // Rubric 5: Display the corresponding language flag
    const lang = languages.find(l => l.code === langCode);
    document.querySelector("#flag").innerHTML = `<img src="${lang.flag}" alt="${lang.name}" width="50">`;
    
});



// ============================
// GET MULTIPLE QUOTES (Rubric 7 & 8)
// ============================
document.querySelector("#getQuotesBtn").addEventListener("click", async () => {
    const numInput = document.querySelector("#numQuotes").value;
    const errorSpan = document.querySelector("#numQuotesError");
    const results = document.querySelector("#quotesResults");

    // Clear previous errors/results
    errorSpan.textContent = "";
    results.innerHTML = "";

    const num = Number(numInput);

    // Rubric 7: Validation
    if (!num || num < 1 || num > 5) {
        errorSpan.textContent = "Please enter a number between 1 and 5."; // Rubric 7
        return;
    }


        // Fetch multiple quotes from API (Rubric 8)
    const res = await fetch(`https://csumb.space/api/famousQuotes/getQuotes.php?n=${num}`);
    const data = await res.json();

        // Display each quote with author (Rubric 8)
        data.forEach(q => {
    results.innerHTML += `<p>"${q.quoteText}" - ${q.firstName} ${q.lastName}</p>`;
});
});

// ============================
// RANDOM BACKGROUND IMAGE (Rubric 9)
// ============================
async function setRandomBackground() {

        const res = await fetch("https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=flowers");
        const data = await res.json();

        // Pick a random image from the API results
        const images = data.hits;
        if (images.length === 0) return;

        const randomImage = images[Math.floor(Math.random() * images.length)];

        // Set as page background
        document.body.style.backgroundImage = `url(${randomImage.webformatURL})`; // Rubric 9
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
}