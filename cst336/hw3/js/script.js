document.querySelector("#catForm").addEventListener("submit", getCats);

async function getCats(e) {
    e.preventDefault();

    let limit = document.querySelector("#limit").ariaValueMax;
    let error = document.querySelector("#limitError");
    let results = document.querySelector("#results");

    error.innerHTML = "";
    results.innerHTML = "";

    // Validation
    if (limit === "" || limit < 1 || limit > 10) {
        error.innerHTML = "Please enter a number between 1 and 10."
        error.style.color = "red";
        return;
    }

    // Fetch cat images
    let url = `https://api.thecatapi.com/v1/images/search?limit=${limit}`

    let response = await fetch(url);
    let data = await response.json();

    // Display cat images
    for (let i = 0; i < data.length; i++) {
        results.innerHTML += `
        <img src="${data[i].url}" width="250" style="margin:10px; border-radius:10px;">
        `;
    }
}