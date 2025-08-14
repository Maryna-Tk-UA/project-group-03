import iziToast from "izitoast";
import { imgArr } from "./img-for-furniture";
import { fetchCategories, fetchFurnitures } from "./pixabay-api";
import { categorySelected, renderCategories, renderFurniture } from "./render-functions";
import { categoriesList, state } from "./refs";


categoriesList.addEventListener('click', e => {
  const li = e.target.closest('li.category-item');
  if (!li) return;
  categorySelected(li.dataset.id);

});

async function init() {
    try {
        // 1. Малюємо категорії
const getCateg = await fetchCategories();
renderCategories(getCateg, imgArr);

        // 2. Початковий стан - всі товари
state.categoryId = '0',
state.page = 1;  

       // (опційно) дублююче підсвітимо "0", якщо css або розмітка змінилася
const allLi = categoriesList.querySelector('[data-id="0"]');
if(allLi) allLi.classList.add('active');

       // 3. Товари для всіх категорій categoryId='0' => параметр category не підійде
const getFurnitures = await fetchFurnitures({
    page: state.page,
    limit: state.limit,
    categoryId: state.categoryId,
});
renderFurniture (getFurnitures);

} catch(error) {
    iziToast.warning({
        message: error,
        position: "topCenter"
    })
}
}

init();