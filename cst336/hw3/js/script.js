document.querySelector("#catForm").addEventListener("submit", getCats);


async function getCats(e) {
    e.preventDefault();

    let limit = Number(document.querySelector("#limit").value);
    console.log("Limit is:", Number(document.querySelector("#limit").value)); // Debugging
    let error = document.querySelector("#limitError");
    let results = document.querySelector("#results");

    error.innerHTML = "";
    results.innerHTML = "";

    // Validation
    if (!limit || limit < 1 || limit > 25) {
        error.innerHTML = "Please enter a number between 1 and 10."
        error.style.color = "red";
        return;
    }

    // Fetch cat images
    let url = `https://api.thecatapi.com/v1/images/search?limit=${limit}`

    let response = await fetch(url);
    let data = await response.json();

    // Display cat images
    for (let i = 0; i < limit; i++) {
        results.innerHTML += `
        <img src="${data[i].url}" width="275" style="margin:10px; border-radius:10px;">
        `;
    }
}