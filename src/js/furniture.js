import { imgArr } from "./img-for-furniture";
import { fetchCategories, fetchFurnitures } from "./pixabay-api";
import { renderCategories, renderFurniture } from "./render-functions";

// Стан пагінації:
const state = {
    page: 1,            // номер початкової сторінки
                    // при кліку на "Завантажити ще", збільшувати
    limit: 8,           // кілкість елементів, отриманих за раз
    totalItems: 0,      // загальна кількість елементів на сервері 
                    // для розрахунку кількості сторінок і визначення коли товари закінчилися      
    totalPage: 0,       // скільки сторінок доступно (Math.ceil(totalItems / limit))
                    // для порівняння з page і знати, чи показувати кнопку "Завантажити ще"
    isLoading: false,    // прапорець, чи триває зараз завантаження
                    // запобігає повторним запитам
    categories: [],
    categoryId: '0',
    lastLoadedFurnitures: [] // сюди зберігаємо завантажені меблі                
}
// const state = {
//   categories: [],
//   currentCategoryId: '0',
//   currentPage: 1,
//   limit: 8,
//   totalLoaded: 0,
//   totalAvailable: 0,
//   lastLoadedFurnitures: []
// }

async function init() {
    try {
const getCateg = await fetchCategories();
renderCategories(getCateg, imgArr);

const getFurnitures = await fetchFurnitures(state);
renderFurniture (getFurnitures);

} catch(error) {
    console.error(error)
}
}

init();