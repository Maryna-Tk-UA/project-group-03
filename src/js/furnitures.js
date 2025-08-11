import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { imgArr } from './img-data.js';
import { getCategories, getFurnitures } from './pixabay-api';
import {
  hideLoadMoreButton,
  renderCategories,
  renderFurnitures,
  showLoadMoreButton,
} from './render-function';

const furnitureList = document.querySelector('.furniture-list');
const categoriesList = document.getElementById('categoriesList');
const loadMoreBtn = document.getElementById('load-more');

export let state = {
  categories: [],
  currentCategoryId: '0', // '0' = всі товари
  currentPage: 1,
  limit: 8,
  totalLoaded: 0,
  totalAvailable: 0,
};

categoriesList.addEventListener('click', e => {
  const li = e.target.closest('.category-item');
  if (!li) return;
  changeCategory(li.dataset.id);
});

loadMoreBtn.addEventListener('click', async () => {
  if (state.totalLoaded >= state.totalAvailable) {
    hideLoadMoreButton();
    return;
  }
  state.currentPage++;
  await loadFurnitures(true);
});

furnitureList.addEventListener('click', e => {
  const btn = e.target.closest('.furniture-btn');
  if (!btn) return;
  // Сюди вставити команду для відкриття модального вікна
});

// Додає слухача для перевірки вибраного кольору для мебелі. Не дає вибирати більше одного кольору.
//cb - checkbox
document.addEventListener('change', event => {
  if (event.target.matches('.color-checkbox input[type="checkbox"]')) {
    const group = event.target.closest('.color-checkboxes');
    group.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      if (cb !== event.target) cb.checked = false;
    });
  }
});

async function changeCategory(categoryId) {
  if (categoryId === state.currentCategoryId) return;

  state.currentCategoryId = categoryId;
  state.currentPage = 1;
  state.totalLoaded = 0;

  categoriesList
    .querySelectorAll('.category-item')
    .forEach(item =>
      item.classList.toggle('active', item.dataset.id === categoryId)
    );

  await loadFurnitures(false);
}

async function loadFurnitures(append) {
  const { furnitures, total } = await getFurnitures({
    category: state.currentCategoryId,
    page: state.currentPage,
    limit: state.limit,
  });

  state.totalAvailable = total;

  if (append) {
    state.totalLoaded += furnitures.length;
  } else {
    state.totalLoaded = furnitures.length;
  }

  renderFurnitures(furnitures, append);

  if (state.totalLoaded >= state.totalAvailable) {
    hideLoadMoreButton();
    iziToast.info({
      message: 'Більше немає товарів у цій категорії!',
      position: 'topRight',
    });
  } else {
    showLoadMoreButton();
  }
}

async function init() {
  const imgArr = await import('./img-data.js').then(m => m.imgArr);

  state.categories = await getCategories();
  renderCategories(state.categories, imgArr, state.currentCategoryId);

  await loadFurnitures(false);
}

init();
