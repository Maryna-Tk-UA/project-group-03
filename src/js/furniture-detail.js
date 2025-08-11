const modal = document.querySelector(".furniture-detail-modal");
const backdrop = document.querySelector(".backdrop");
const closeBtn = document.querySelector(".close-btn");
const modalContent = document.querySelector(".modal-content");

export function openProductModal(product) {
  if (!product) {
    console.error("Продукт не переданий у openProductModal");
    return;
  }

   const rate = product.rate || 0;
  const maxIcons = 5;

  const thumbsMarkup = Array.from({ length: maxIcons }, () => `<i class="fa-solid fa-thumbs-up thumb-icon"></i>`).join('');
  
  backdrop.classList.add("is-open");
  document.body.classList.add("no-scroll");

  modalContent.innerHTML = `
    <div class="images">
      <div class="main-image-wrapper">
        <img src="${product.images?.[0] || ''}" alt="${product.name || ''}" class="main-image">
      </div>
      <ul class="small-images-list">
        ${(product.images || [])
          .slice(1)
          .map(
            img => `
              <li class="small-images-list-item">
                <img src="${img}" alt="${product.name || ''}" class="thumb">
              </li>
            `
          )
          .join("")}
      </ul>
    </div>
    <div class="descr">
      <h3 class="furniture-name">${product.name || ''}</h3>
      <p class="furniture-category-text">${product.category?.name || ""}</p>
      <form>
        <p class="price">${product.price || ''} <span class="currency">грн</span></p>
        <div class="rating" data-rate="${rate}">
          ${thumbsMarkup}
        </div>
        <p class="color">Колір</p>
        <ul class="color-list">
  ${(product.color || [])
    .map(
      (color, index) => `
        <li class="color-list-item">
          <input type="checkbox" id="color-${index}" name="color-${index}" value="${color}">
          <label for="color-${index}" style="background:${color};"></label>
        </li>
      `
    )
    .join("")}
</ul>
        <p class="descr-text">${product.description || ""}</p>
        <p class="product-size">Розміри: ${product.sizes || ""}</p>
        <button type="submit" class="form-btn">Перейти до замовлення</button>
      </form>
    </div>
  `;
  animateThumbsInModal();

  // Слухач для мініатюр
  const smallImages = modalContent.querySelector(".small-images-list");
  if (smallImages) {
    smallImages.addEventListener("click", e => {
      const thumb = e.target.closest(".thumb");
      if (!thumb) return;
      const mainImage = modalContent.querySelector(".main-image");
      const tempSrc = mainImage.src;
      mainImage.src = thumb.src;
      thumb.src = tempSrc;
    });
  }

  
  const form = modalContent.querySelector("form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const checkedColor = form.querySelector('input[type="checkbox"]:checked');
      if (!checkedColor) {
        alert("Виберіть колір!");
        return;
      }
      console.log("Обраний колір:", checkedColor.value);
      closeModal();
    });
  }
}


function animateThumbsInModal() {
  const ratingContainer = modalContent.querySelector('.rating');
  if (!ratingContainer) return;

  const rate = parseFloat(ratingContainer.getAttribute('data-rate'));
  const icons = ratingContainer.querySelectorAll('.thumb-icon');

  icons.forEach(icon => {
    icon.classList.remove('fill', 'half');
  });

  icons.forEach((icon, index) => {
    setTimeout(() => {
      if (index < Math.floor(rate)) {
        icon.classList.add('fill');
      } else if (index === Math.floor(rate) && rate % 1 !== 0) {
        icon.classList.add('half');
      }
    }, index * 200);
  });
}



function closeModal() {
  backdrop.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

if (backdrop) {
  backdrop.addEventListener("click", e => {
    if (e.target === backdrop) closeModal();
  });
}
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
    closeModal();
  }
})
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
import { hideLoader, showLoader } from './loader';

const furnitureList = document.querySelector('.furniture-list');
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


const state = {
  categories: [],
  currentCategoryId: '0',
  currentPage: 1,
  limit: 8,
  totalLoaded: 0,
  totalAvailable: 0,
  lastLoadedFurnitures: []
}
// --- Стан ---
// let categories = [];
// let currentCategoryId = '0'; // '0' - всі товари
// let currentPage = 1;
// const limit = 8;
// let totalLoaded = 0;
// let totalAvailable = 0;
// let lastLoadedFurnitures = [];
// --- Функції ---

// Отримання категорій
async function fetchCategory() {
  showLoader();
  try {
    const res = await axios.get(`${API_BASE}/categories`);
    return res.data;
  } catch (error) {
    iziToast.error({
      message: 'Сталася помилка при отриманні категорій',
      position: 'topRight',
    });
    return [];
  } finally {
  hideLoader();
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
  showLoader();
  try {
    const params = { page, limit };
    if (category !== '0') params.category = category;

    const res = await axios.get(`${API_BASE}/furnitures`, { params });
   

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
    hideLoader();
  }
}

// Рендер меблів, append = true додає в кінець списку
function renderFurnitureList(furnitures, append = false) {
  if (!append) {
    state.lastLoadedFurnitures = furnitures;  // Зберігаємо нові дані при повній заміні списку
    furnitureList.innerHTML = '';
  } else {
    lastLoadedFurnitures = [...lastLoadedFurnitures, ...furnitures];  // Додаємо при дозавантаженні
  }
  
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
          <div class="furniture-img-wrap"><img class="furniture-img" src="${images[0] || ''}" alt="${name}" /></div>
          <div class="furniture-text-wrap">
          <h3 class="furniture-subtitle">${name}</h3>
          <div class="color-checkboxes">${colorsMarkup}</div>
          <p class="furniture-text">${price} грн</p>
          </div>
          <button class="furniture-btn" type="button" data-id="${_id}">Детальніше</button>
        </li>
      `;
    })
    .join('');

  furnitureList.insertAdjacentHTML('beforeend', markup);
}

// Оновлення кнопки "Показати ще"
function updateLoadMoreButton() {
  if (state.totalLoaded >= state.totalAvailable) {
    loadMoreBtn.classList.add('is-hidden');
    loadMoreBtn.disabled = true;
  } else {
    loadMoreBtn.classList.remove('is-hidden');
    loadMoreBtn.disabled = false;
  }
}

// Логіка вибору категорії та оновлення списку меблів
async function onCategorySelected(categoryId) {
  if (state.categoryId === state.currentCategoryId) return;

  state.currentCategoryId = categoryId;
  state.currentPage = 1;
  state.totalLoaded = 0;

  // Акцент вибраної категорії
  categoriesList.querySelectorAll('.category-item').forEach(item => {
    item.classList.toggle('active', item.dataset.id === categoryId);
  });

  const { furnitures, total } = await fetchFurnitures({
    category: state.currentCategoryId,
    page: state.currentPage,
    limit: state.limit
  });
  state.totalAvailable = total || 0;
  state.totalLoaded = furnitures.length;

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
  if (state.totalLoaded >= state.totalAvailable) return;

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
  
    const product = state.lastLoadedFurnitures.find(item => item._id === furnitureId);

  if (product) {
    openProductModal(product);
  } else {
    iziToast.error({
      message: 'Товар не знайдено',
      position: 'topRight',
    });
      }
});




// Початкова ініціалізація
async function init() {
  state.categories = await fetchCategory();
  categoriesList.innerHTML = createMarkupCategory(
    state.categories,
    imgArr,
    state.currentCategoryId
  );

  state.currentPage = 1;
  state.totalLoaded = 0;

  const { furnitures, total } = await fetchFurnitures({
    category: state.currentCategoryId,
    page: state.currentPage,
    limit: state.limit
  });

  state.totalAvailable = total || 0;
  state.totalLoaded = furnitures.length;

  renderFurnitureList(furnitures, false);
  await loadFurnitures(false);
  // updateLoadMoreButton();
}

init();

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

async function loadFurnitures(append) {
  const { furnitures, total } = await fetchFurnitures({
    category: state.currentCategoryId,
    limit: state.limit,
  });
  state.totalAvailable = total;
  state.totalLoaded += furnitures.length;
  renderFurnitureList(furnitures, append);
  if (state.totalLoaded >= state.totalAvailable) {
    // hideLoadMoreButton();
    iziToast.info({
      message: 'Більше немає товарів у цій категорії!',
      position: 'topRight',
    });
  } else {
    showLoadMoreButton();
  }
}