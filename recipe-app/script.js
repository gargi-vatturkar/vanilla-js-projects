const ulEle = document.getElementById("cats");
const randomEle = document.getElementById("meal-header");
const randomName = document.getElementById("random-name");
const viewBtn = document.getElementById("view");
const randomCont = document.getElementById("random-cont");
const showRecipeCont = document.getElementById("show-id");
const searchBtn = document.getElementById("search");
const searchCont = document.getElementById("search-cont");
const catMealCont = document.getElementById("category-meal-cont");

var randomMeal;

async function getCategories() {
    const cat = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let cats = await cat.json();

    cats.categories.forEach(category => {
        ulEle.innerHTML += `<li id='${category.strCategory}'>
        <img src='${category.strCategoryThumb}' alt='${category.strCategory}'/>
        <span>${category.strCategory}</span></li>`;
    });

    const liEle = document.querySelectorAll("li");
    liEle.forEach(cat => {
        let catBtn = document.getElementById(cat.id);
        catBtn.addEventListener("click", async function () {
            let mealsByCat = await getMealByCategory(cat.id);

            let temp = ``;
            mealsByCat['meals'].forEach(meal => {
                temp += `
            <div class="meal">
            <div class="meal-header"><img src='${meal.strMealThumb}' alt='${meal.strMeal}'></div>
            <div class="meal-body" id='${meal.idMeal}'><h4>${meal.strMeal}</h4><button id="meal-view">View</button></div>
            </div>`
            });
            catMealCont.innerHTML = '';
            catMealCont.innerHTML += `<h3>${cat.id}:</h3>
            <div class='search-inner'>${temp}</div>`;

            const mealViewBtn = document.querySelectorAll("#meal-view");
            mealViewBtn.forEach(recipe => {
                let viewBtn = document.getElementById(recipe.parentElement.id);
                viewBtn.addEventListener("click", async function () {

                    //catMealCont.setAttribute("style", "display: none")
                    let fullMeal = await getMealById(recipe.parentElement.id);

                    let allContent = `
                <div class="full-recipe-cont" id="full-recipe-cont"><div class="full-wrapper">
                <div class="full-recipe-inner">
                <img src='${fullMeal.meals[0].strMealThumb}' alt='${fullMeal.meals[0].strMeal}'>
                </div>
                <div class="full-recipe-inner"><h2>${fullMeal.meals[0].strMeal}<button id="full-back"><i class="fas fa-times-circle"></i></button></h2> 
                ${fullMeal.meals[0].strInstructions}
                <br><h4>Ingredients: </h4><ul>`;

                    ingArr = [];
                    for (let i = 1; i <= 20; i++) {
                        if (fullMeal.meals[0]['strIngredient' + i])
                            allContent += `<li>${fullMeal.meals[0]['strIngredient' + i]}: ${fullMeal.meals[0]['strMeasure' + i]}</li>`;
                    }

                    allContent += `</ul><br></div></div></div>`;

                    showRecipeCont.innerHTML = allContent;

                    const backBtn = document.getElementById("full-back");

                    backBtn.addEventListener("click", function () {
                        showRecipeCont.innerHTML = "";
                        // catMealCont.setAttribute("style", "display: block");
                    });
                });
            });

        });
    });
}

async function getRandomMeal() {
    const meal = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    randomMeal = await meal.json();

    randomEle.innerHTML = `<span class="random">Recipe of the day</span>
    <img alt='${randomMeal.meals[0].strMeal}' src='${randomMeal.meals[0]["strMealThumb"]}' />`
    randomName.innerHTML = `<h4 id='random-name'>${randomMeal.meals[0].strMeal}</h4>`

}

viewBtn.addEventListener("click", async function () {
    randomCont.setAttribute("style", "display: none");

    let fullMeal = await getMealById(randomMeal.meals[0].idMeal);
    let allContent = `
                <div class="full-recipe-cont" id="full-recipe-cont"><div class="full-wrapper">
                <div class="full-recipe-inner">
                <img src='${fullMeal.meals[0].strMealThumb}' alt='${fullMeal.meals[0].strMeal}'>
                </div>
                <div class="full-recipe-inner"><h2>${fullMeal.meals[0].strMeal}<button id="full-back"><i class="fas fa-times-circle"></i></button></h2> 
                ${fullMeal.meals[0].strInstructions}
                <br><h4>Ingredients: </h4><ul>`;

    ingArr = [];
    for (let i = 1; i <= 20; i++) {
        if (fullMeal.meals[0]['strIngredient' + i])
            allContent += `<li>${fullMeal.meals[0]['strIngredient' + i]}: ${fullMeal.meals[0]['strMeasure' + i]}</li>`;
    }

    allContent += `</ul><br></div></div></div>`;

    showRecipeCont.innerHTML = allContent;

    const backBtn = document.getElementById("full-back");

    backBtn.addEventListener("click", function () {
        showRecipeCont.innerHTML = "";
        randomCont.setAttribute("style", "display: flex");;
    });
});

searchBtn.addEventListener("click", async function () {
    let searchInput = document.getElementById("searchInput");

    if (searchInput.value.length == 0) searchCont.innerHTML = "";
    else {

        let meals = await searchMeal(searchInput.value);

        if (!meals['meals']) {
            searchCont.innerHTML = "<h4>No recipes for keyword " + searchInput.value + " found!</h4>";
        }
        else {
            searchCont.innerHTML = "";
            let temp = ``;
            meals['meals'].forEach(meal => {
                temp += `
            <div class="meal">
            <div class="meal-header"><img src='${meal.strMealThumb}' alt='${meal.strMeal}'></div>
            <div class="meal-body" id='${meal.idMeal}'><h4>${meal.strMeal}</h4><button id="meal-view">View</button></div>
            </div>`
            });

            searchCont.innerHTML = `<h3>Search results for ${searchInput.value}</h3>
            <div class='search-inner'>${temp}</div>`
        }

        const mealViewBtn = document.querySelectorAll("#meal-view");
        mealViewBtn.forEach(recipe => {
            let viewBtn = document.getElementById(recipe.parentElement.id);
            viewBtn.addEventListener("click", async function () {

                searchCont.setAttribute("style", "display: none")
                let fullMeal = await getMealById(recipe.parentElement.id);
                let allContent = `
                <div class="full-recipe-cont" id="full-recipe-cont"><div class="full-wrapper">
                <div class="full-recipe-inner">
                <img src='${fullMeal.meals[0].strMealThumb}' alt='${fullMeal.meals[0].strMeal}'>
                </div>
                <div class="full-recipe-inner"><h2>${fullMeal.meals[0].strMeal}<button id="full-back"><i class="fas fa-times-circle"></i></button></h2> 
                ${fullMeal.meals[0].strInstructions}
                <br><h4>Ingredients: </h4><ul>`;

                ingArr = [];
                for (let i = 1; i <= 20; i++) {
                    if (fullMeal.meals[0]['strIngredient' + i])
                        allContent += `<li>${fullMeal.meals[0]['strIngredient' + i]}: ${fullMeal.meals[0]['strMeasure' + i]}</li>`;
                }

                allContent += `</ul><br></div></div></div>`;

                showRecipeCont.innerHTML = allContent;

                const backBtn = document.getElementById("full-back");

                backBtn.addEventListener("click", function () {
                    showRecipeCont.innerHTML = "";
                    searchCont.setAttribute("style", "display: block");
                });
            });
        });
    }
});

async function getMealById(id) {
    const meals = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    return await meals.json();
}

async function searchMeal(value) {
    const meals = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + value);
    return await meals.json();
}

async function getMealByCategory(value) {
    const meals = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + value);
    return await meals.json();
}

getCategories();
getRandomMeal();