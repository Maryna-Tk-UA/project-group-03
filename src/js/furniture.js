import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

import { imgArr } from './img-for-furniture';
import { fetchCategories, fetchFurnitures } from './pixabay-api'; // було "pixabay-api"
import { categorySelected, renderCategories, renderFurniture, updateLoadMoreButton } from './render-functions';
import { els, state } from './refs';


// Клік по категорії (делегування)
els.categoriesList.addEventListener('click', e => {
  const li = e.target.closest('li.category-item');
  if (!li) return;
  categorySelected(li.dataset.id);
});



// Клік по "Показати ще"
els.loadMoreBtn.addEventListener('click', onLoadMore);

async function onLoadMore() {
  if (state.isLoading) return;
  if (state.totalItems && state.totalLoaded >= state.totalItems) return;

  state.isLoading = true;
  try {
    const nextPage = state.page + 1;
    const { furnitures } = await fetchFurnitures({
      page: nextPage,
      limit: state.limit,
      categoryId: state.categoryId,
    });

    // оновлюємо лічильники
    state.page = nextPage;
    state.totalLoaded += furnitures.length;
    state.lastLoadedFurnitures = [...state.lastLoadedFurnitures, ...furnitures];

    // дорисовуємо
    renderFurniture(furnitures, { append: true });
    updateLoadMoreButton(furnitures.length);

    if (state.totalItems && state.totalLoaded >= state.totalItems) {
      iziToast.info({ message: 'Це всі товари в цій категорії.', position: 'topRight' });
    }
  } catch (err) {
    iziToast.error({ message: 'Не вдалося завантажити ще товари', position: 'topRight' });
  } finally {
    state.isLoading = false;
  }
}

// Початкова ініціалізація
async function init() {
  try {
    // 1) Категорії
    const categories = await fetchCategories();
    renderCategories(categories, imgArr);

    // 2) Початковий стан
    state.categoryId = '0';
    state.page = 1;
    state.totalLoaded = 0;

    // підсвітити "Всі товари" (на випадок змін у верстці/стилях)
    const allLi = els.categoriesList.querySelector('[data-id="0"]');
    if (allLi) allLi.classList.add('active');

    // 3) Перша сторінка товарів
    const { furnitures, total } = await fetchFurnitures({
      page: state.page,
      limit: state.limit,
      categoryId: state.categoryId,
    });

    state.totalItems = total;
    state.totalLoaded = furnitures.length;
    state.lastLoadedFurnitures = furnitures;

    renderFurniture(furnitures, { append: false });
    updateLoadMoreButton(furnitures.length);
  } catch (error) {
    iziToast.warning({ message: 'Щось пішло не так при ініціалізації', position: 'topCenter' });
  }
}

init();

