const categoriesList = document.querySelector(".categories-list");
const furnitureList = document.querySelector(".furniture-list");

// Стан пагінації:
const state = {
    page: 1,            // номер початкової сторінки
                    // при кліку на "Завантажити ще", збільшувати
    limit: 8,           // кілкість елементів, отриманих за раз
    totalItems: 0,      // загальна кількість елементів на сервері 
                    // для розрахунку кількості сторінок і визначення коли товари закінчилися      
    totalPage: 0,       // скільки сторінок доступно (Math.ceil(totalItems / limit))
                    // для порівняння з page і знати, чи показувати кнопку "Завантажити ще"
    totalLoaded: 0,
    isLoading: false,    // прапорець, чи триває зараз завантаження
                    // запобігає повторним запитам
    categories: [],      // ?
    categoryId: '0',     // за замовчуванням - Всі товари
    lastLoadedFurnitures: [] // сюди зберігаємо вже завантажені і відмальовані меблі                
}


export { categoriesList, furnitureList, state };