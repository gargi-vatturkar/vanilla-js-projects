const APIBASE = "https://api.openweathermap.org/data/2.5/weather?q=";
const APIKEY = "my-api-key";

const main = document.getElementById("main");
const body = document.querySelector("body");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getWeatherByLocation(loc) {
    try {
        const resp = await fetch(APIBASE + loc + "&appid=" + APIKEY);
        let res = await resp.json();

        showWeather(res, loc);
    }
    catch (err) {
        showErrorCard();
    }
}

getWeatherByLocation("pune");
search.value = "Pune";

function KtoC(kelvin) {
    return (kelvin - 273.15).toFixed(2);
}

function showErrorCard() {
    main.innerHTML = `
    <div class="weather">
    <br> No results found <br>
    Please try again!
    </div>`;
}

function showWeather(res, loc) {
    const temp = KtoC(res.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
    <h2><img src="https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png">
    ${temp} &#176;C</h2>
    <p>${res.weather[0].main}</p>
    <button id="details" class="view-details">View Details</button>`;

    //cleanup main
    main.innerHTML = "";
    main.appendChild(weather);

    const btn = document.getElementById("details");
    btn.addEventListener("click", () => {
        const pop = document.createElement("div");
        pop.classList.add("pop-wrapper");
        pop.innerHTML = `
        <div class="details-pop">
        <h2>
        ${res.name} - ${res.sys.country}
        <i class="fas fa-times-circle" id="close-btn"></i>
        </h2>

        <p><strong>Current Temperature</strong> : ${temp} &#176;C</p>
        <p><strong>Minimum Temperature</strong> : ${KtoC(res.main.temp_min)} &#176;C</p>
        <p><strong>Maximum Temperature</strong> : ${KtoC(res.main.temp_max)} &#176;C</p>
        <p><strong>Pressure</strong> : ${res.main.pressure}</p>
        <p><strong>Humidity</strong> : ${res.main.humidity}</p>
        <p><strong>Latitude and Longitude</strong> : ${res.coord.lon} &#176;N, 
        ${res.coord.lat} &#176;W</p>
        </div>`
        body.appendChild(pop);

        const clBtn = document.getElementById("close-btn");
        clBtn.addEventListener("click", () => {
            const pop = document.querySelector(".pop-wrapper");
            pop.setAttribute("style", "display: none")
        });
    });
}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const loc = search.value;
    if (loc) getWeatherByLocation(loc);
})