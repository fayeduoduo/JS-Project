const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const meals = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMeals = document.getElementById('single-meals')


submit.addEventListener('submit', searchMeal);

function searchMeal(e) {
    e.preventDefault();

    singleMeals.innerHTML = '';
    const term = search.value
    console.log(term)

    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                resultHeading.innerHTML = `<h2>Search results for '${term}': </h2>`;
  

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>没有查询到相关食谱，请重新输入</p>`;
                } else {
                    meals.innerHTML = data.meals.map(meal => {
                        return `<div class='meal'>
                                    <img src="${meal.strMealThumb}" alt='${meal.strMeal}'></img>
                                    <div class='meal-info' data-mealId=${meal.idMeal}>
                                        <h3>${meal.strMeal}</h3>
                                    </div>
                                </div>`
                    }).join('');
                }
            })

        search.value = ''
    } else {
        alert('请输入搜索内容')
    }
}

meals.onclick = (e) => {
    const mealInfo = e.path.find(item => {
        console.log(item)

        if (item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false;
        }
    })

    if (mealInfo) {
        const mealId = mealInfo.getAttribute('data-mealId')
        console.log(mealId) //显示的是data-mealId的值
        getMealById(mealId);
    }
}

function getMealById(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json()).then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal)
        })
}


function addMealToDOM(meal) {
    console.log(meal)
    const ingredients = [];
    for (let i = 1; i <= 20; i++){
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            )
        } else {
            break;
        }
    }
    console.log(ingredients)
    singleMeals.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class='single-meal-info'>
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>`: ''}
            </div>
            <div class='main'>
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ingredient => {
                        return `<li class='listInfo'>${ingredient}</li>`
                    }).join("")}
                </ul>
            </div>           
        </div >`
}


random.addEventListener('click',getRandomMeal)
function getRandomMeal(){
    meals.innerHTML = "";
    resultHeading.innerHTML = "";
    
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json()).then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal)
        })
}