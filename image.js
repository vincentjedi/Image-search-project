//API key access
const accessKey = "u0xso8tig0TW9vNMTGvGqaITbRPdTrXFWRROQSVgv0I";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("inp-field");
const searchRe = document.querySelector(".search-results");
const showMo = document.getElementById("show-more");

//assigning variables 
let inputData = "";
let page = 1;

//creating a function to carry out the role of image filters
async function myImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchRe.innerHTML = "";

    }
    results.map((result) =>{
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        //append the created text nodes
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchRe.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        showMo.style.display = "block";
    }

}

formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1;
    myImages()
});

showMo.addEventListener("click", ()=> {
    myImages()
});


