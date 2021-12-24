const apiKey = "my-api-key";
const imagePath = "https://image.tmdb.org/t/p/w1280";

const mainEl = document.querySelector("main");
const formEl = document.querySelector("form");

const search = document.getElementById("search");

getMovies("https://api.themoviedb.org/3/discover/movie?sort_bypopularity.desc=&api_key=" + apiKey);

async function getMovies(url) {
    const movies = await fetch(url);
    let res = await movies.json();
    showMovies(res);
}

function getClassByRating(rating) {
    if (rating >= 8) return "high-rating";
    else if (rating < 8 && rating >= 5) return "medium-rating";
    else return "low-rating";
}

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm.length > 0) {
        let searched = await getMovies("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + searchTerm);
        if (searched.results.length > 0) {
            showMovies(searched);
        }
    }

});

function showMovies(res) {
    mainEl.innerHTML = "";
    res.results.forEach(element => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        let temp;

        if(element.poster_path) 
        temp = `<img src = "${imagePath + element.poster_path}" alt="${element.title}">`;
        else temp = `<div class="no-image-found">No image found</div>`
        temp +=  `
        <div class="movie-title">
            <h3>${element.title}</h3>
            <span class="${getClassByRating(element.vote_average)}">
            ${element.vote_average}</span>
        </div>
        <div class="overview">
        <h4>Overview: </h4>${element.overview}</div>`;

        movieEl.innerHTML = temp;
        mainEl.appendChild(movieEl);

    });
}

async function getSearchedMovie(searchValue) {
    const movies = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + searchValue);
    let res = await movies.json();
    return res;
}
