import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import img1x from '/img/Furniture-img/1_1x-min.png';
import img2x from '/img/Furniture-img/1_2x-min.png';
import img3x from '/img/Furniture-img/2_1x-min.png';
import img4x from '/img/Furniture-img/2_2x-min.png';
import img5x from '/img/Furniture-img/3_1x-min.png';
import img6x from '/img/Furniture-img/3_2x-min.png';
import img7x from '/img/Furniture-img/4_1x-min.png';
import img8x from '/img/Furniture-img/4_2x-min.png';
import img9x from '/img/Furniture-img/5_1x-min.png';
import img10x from '/img/Furniture-img/5_2x-min.png';
import img11x from '/img/Furniture-img/6_1x-min.png';
import img12x from '/img/Furniture-img/6_2x-min.png';
import img13x from '/img/Furniture-img/7_1x-min.png';
import img14x from '/img/Furniture-img/7_2x-min.png';
import img15x from '/img/Furniture-img/8_1x-min.png';
import img16x from '/img/Furniture-img/8_2x-min.png';
import img17x from '/img/Furniture-img/9_1x-min.png';
import img18x from '/img/Furniture-img/9_2x-min.png';
import img19x from '/img/Furniture-img/10_1x-min.png';
import img20x from '/img/Furniture-img/10_2x-min.png';
import img21x from '/img/Furniture-img/11_1x-min.png';
import img22x from '/img/Furniture-img/11_2x-min.png';
import img23x from '/img/Furniture-img/12_1x-min.png';
import img24x from '/img/Furniture-img/12_2x-min.png';
import img25x from '/img/Furniture-img/13_1x-min.png';
import img26x from '/img/Furniture-img/13_2x-min.png';

const furnitureList = document.querySelector('.furniture-list');
const loader = document.querySelector('.loader');
const categoriesList = document.getElementById('categoriesList');
const loadMoreBtn = document.getElementById('load-more');

const base = import.meta.env.BASE_URL; // тільки для зображень у imgArr

const API_BASE = 'https://furniture-store.b.goit.study/api';

export const imgArr = [
  { src: img1x,  src2x: img2x,  alt: 'Меблі від Меблерія' },
  { src: img3x,  src2x: img4x,  alt: 'Меблі від Меблерія' },
  { src: img5x,  src2x: img6x,  alt: 'Меблі від Меблерія' },
  { src: img7x,  src2x: img8x,  alt: 'Меблі від Меблерія' },
  { src: img9x,  src2x: img10x, alt: 'Меблі від Меблерія' },
  { src: img11x, src2x: img12x, alt: 'Меблі від Меблерія' },
  { src: img13x, src2x: img14x, alt: 'Меблі від Меблерія' },
  { src: img15x, src2x: img16x, alt: 'Меблі від Меблерія' },
  { src: img17x, src2x: img18x, alt: 'Меблі від Меблерія' },
  { src: img19x, src2x: img20x, alt: 'Меблі від Меблерія' },
  { src: img21x, src2x: img22x, alt: 'Меблі від Меблерія' },
  { src: img23x, src2x: img24x, alt: 'Меблі від Меблерія' },
  { src: img25x, src2x: img26x, alt: 'Меблі від Меблерія' },
];

// Працюй, падлюка!

// --- Стан ---
let categories = [];
let currentCategoryId = '0'; // '0' - всі товари
let currentPage = 1;
const limit = 8;
let totalLoaded = 0;
let totalAvailable = 0;

// --- Функції ---

// Отримання категорій
async function fetchCategory() {
  try {
    const res = await axios.get(`${API_BASE}/categories`);
    return res.data;
  } catch (error) {
    iziToast.error({
      message: 'Сталася помилка при отриманні категорій',
      position: 'topRight',
    });
    return [];
  }
}

// Створення розмітки категорій з урахуванням активної
function createMarkupCategory(categories, arrImg, activeId) {
  if (!categories || !arrImg) return '';

  const firstLi = `
    <li class="category-item special-category wrapper_category ${
      activeId === '0' ? 'active' : ''
    }" data-id="0">
      <img class="img_category" src="${arrImg[0]?.src}" srcset="${
    arrImg[0]?.src2x
  } 2x" alt="${arrImg[0]?.alt}" />
      <p class="text_category">Всі товари</p>
    </li>
  `;

  const otherItems = categories
    .map(
      ({ _id, name }, i) => `
      <li class="category-item wrapper_category ${
        activeId === _id ? 'active' : ''
      }" data-id="${_id}">
        <img class="img_category" src="${arrImg[i + 1]?.src}" srcset="${
        arrImg[i + 1]?.src2x
      } 2x" alt="${name}" />
        <p class="text_category">${name}</p>
      </li>
    `
    )
    .join('');

  return firstLi + otherItems;
}

// Завантаження меблів з пагінацією та фільтрацією
async function fetchFurnitures({ category = '0', page = 2, limit = 8 } = {}) {
  loader.classList.remove('is-hidden');
  try {
    const params = { page, limit };
    if (category !== '0') params.category = category;

    const res = await axios.get(`${API_BASE}/furnitures`, { params });
    console.log(res);

    const furnitures = res.data.furnitures || [];
    const total = res.data.total || 0;

    return { furnitures, total };
  } catch (error) {
    iziToast.error({
      message: 'Помилка отримання меблів',
      position: 'topRight',
    });
    return { furnitures: [], total: 0 };
  } finally {
    loader.classList.add('is-hidden');
  }
}

// Рендер меблів, append = true додає в кінець списку
function renderFurnitureList(furnitures, append = false) {
  if (!append) furnitureList.innerHTML = '';

  if (!Array.isArray(furnitures) || furnitures.length === 0) {
    if (!append)
      furnitureList.innerHTML = '<p>Товари відсутні в цій категорії</p>';
    return;
  }

  const markup = furnitures
    .map(({ _id, name, price, images, color }) => {
      const colorsMarkup =
        Array.isArray(color) && color.length > 0
          ? color
              .map(c => {
                const cleanColorId = c.replace(/[^a-zA-Z0-9]/g, '');
                return `
                  <div class="color-checkbox">
                    <input type="checkbox" id="color-${_id}-${cleanColorId}" name="color-${_id}" value="${c}" />
                    <label for="color-${_id}-${cleanColorId}" style="background-color: ${c};" title="${c}"></label>
                  </div>
                `;
              })
              .join('')
          : '';

      return `
        <li class="furniture-item" data-id="${_id}">
          <img class="furniture-img" src="${images[0] || ''}" alt="${name}" />
          <h3 class="furniture-subtitle">${name}</h3>
          <div class="color-checkboxes">${colorsMarkup}</div>
          <p class="furniture-text">${price} грн</p>
          <button class="furniture-btn" type="button" data-id="${_id}">Детальніше</button>
        </li>
      `;
    })
    .join('');

  furnitureList.insertAdjacentHTML('beforeend', markup);
}

// Оновлення кнопки "Показати ще"
function updateLoadMoreButton() {
  if (totalLoaded >= totalAvailable) {
    loadMoreBtn.classList.add('is-hidden');
    loadMoreBtn.disabled = true;
  } else {
    loadMoreBtn.classList.remove('is-hidden');
    loadMoreBtn.disabled = false;
  }
}

// Логіка вибору категорії та оновлення списку меблів
async function onCategorySelected(categoryId) {
  if (categoryId === currentCategoryId) return;

  currentCategoryId = categoryId;
  currentPage = 1;
  totalLoaded = 0;

  // Акцент вибраної категорії
  categoriesList.querySelectorAll('.category-item').forEach(item => {
    item.classList.toggle('active', item.dataset.id === categoryId);
  });

  const { furnitures, total } = await fetchFurnitures({
    category: currentCategoryId,
    page: currentPage,
    limit,
  });
  totalAvailable = total || 0;
  totalLoaded = furnitures.length;

  renderFurnitureList(furnitures, false);
  updateLoadMoreButton();
}

// Обробник кліку по категорії
categoriesList.addEventListener('click', e => {
  const li = e.target.closest('li.category-item');
  if (!li) return;
  onCategorySelected(li.dataset.id);
});

// Обробник кнопки "Показати ще"
loadMoreBtn.addEventListener('click', async () => {
  if (totalLoaded >= totalAvailable) return;

  currentPage++;
  const { furnitures, total } = await fetchFurnitures({
    category: currentCategoryId,
    page: currentPage,
    limit,
  });

  totalAvailable = total || totalAvailable;
  totalLoaded += furnitures.length;

  renderFurnitureList(furnitures, true);
  updateLoadMoreButton();
});

// Делегування для кнопки "Детальніше" (поки що alert, можна розширити)
furnitureList.addEventListener('click', e => {
  const btn = e.target.closest('.furniture-btn');
  if (!btn) return;

  const furnitureId = btn.dataset.id;
  alert(`Відкрити деталі для меблів з id: ${furnitureId}`);
  // Тут можна розгорнути логіку для модального вікна
});

// Початкова ініціалізація
async function init() {
  categories = await fetchCategory();
  categoriesList.innerHTML = createMarkupCategory(
    categories,
    imgArr,
    currentCategoryId
  );

  currentPage = 1;
  totalLoaded = 0;

  const { furnitures, total } = await fetchFurnitures({
    category: currentCategoryId,
    page: currentPage,
    limit,
  });

  totalAvailable = total || 0;
  totalLoaded = furnitures.length;

  renderFurnitureList(furnitures, false);
  updateLoadMoreButton();
}

init();
