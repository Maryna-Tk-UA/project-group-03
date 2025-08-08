import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const furnitureList = document.querySelector('.furniture-list');
const loader = document.querySelector('.loader');
const categoriesList = document.getElementById('categoriesList');
const loadMoreBtn = document.getElementById('load-more');

const API_BASE = 'https://furniture-store.b.goit.study/api';
const imgArr = [
  {
    src: '../img/Furniture-img/1_1x-min.png',
    src2x: '../img/Furniture-img/1_2x-min.png',
    alt: 'Опис зображення',
  },
  {
    src: '../img/Furniture-img/2_1x-min.png',
    src2x: '../img/Furniture-img/2_2x-min.png',
    alt: 'Опис зображення',
  },
  {
    src: '../img/Furniture-img/3_1x-min.png',
    src2x: '../img/Furniture-img/3_2x-min.png',
    alt: 'Опис зображення',
  },
  {
    src: '../img/Furniture-img/4_1x-min.png',
    src2x: '../img/Furniture-img/4_2x-min.png',
    alt: 'Опис зображення',
  },
  {
    src: '../img/Furniture-img/5_1x-min.png',
    src2x: '../img/Furniture-img/5_2x-min.png',
    alt: 'Опис зображення',
  },
  {
    src: '../img/Furniture-img/6_1x-min.png',
    src2x: '../img/Furniture-img/6_2x-min.png',
    alt: 'Опис зображення',
  },
  {
    src: '../img/Furniture-img/7_1x-min.png',
    src2x: '../img/Furniture-img/7_2x-min.png',
    alt: 'Опис зображення',
  },
  {
    src: '../img/Furniture-img/8_1x-min.png',
    src2x: '../img/Furniture-img/8_2x-min.png',
    alt: 'Опис зображення',
  },
  {
    src: '../img/Furniture-img/9_1x-min.png',
    src2x: '../img/Furniture-img/9_2x-min.png',
    alt: 'Опис зображення',
  },
  {
    src: '../img/Furniture-img/10_1x-min.png',
    src2x: '../img/Furniture-img/10_2x-min.png',
    alt: 'Опис зображення',
  },
  {
    src: '../img/Furniture-img/11_1x-min.png',
    src2x: '../img/Furniture-img/11_2x-min.png',
    alt: 'Опис зображення',
  },
  {
    src: '../img/Furniture-img/12_1x-min.png',
    src2x: '../img/Furniture-img/12_2x-min.png',
    alt: 'Опис зображення',
  },
  {
    src: '../img/Furniture-img/13_1x-min.png',
    src2x: '../img/Furniture-img/13_2x-min.png',
    alt: 'Опис зображення',
  },
];
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
