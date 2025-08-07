import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const furnitureList = document.querySelector('.furniture-list');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.getElementById('load-more');
const API_BASE = 'https://furniture-store.b.goit.study/api';
const categoriesList = document.getElementById('categoriesList');

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
const baseURL = 'https://furniture-store.b.goit.study/api';

fetchCategory();

async function fetchCategory() {
  try {
    const response = await axios(`${baseURL}/categories`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    iziToast.error({
      message: 'Сталася помилка при отриманні категорій',
      position: 'topRight',
    });
  }
}

function createMarkupCategory(categories, arrImg) {
  if (!categories || !arrImg) return '';

  // Перший "вибраний" пункт (як у макеті)
  const firstLi = `
    <li class="category-item special-category">
      <img src="${arrImg[0]?.src}" srcset="${arrImg[0]?.src2x} 2x" alt="Особлива категорія" class="img_category" />
      <p class="text_category">Всі товари</p>
    </li>
  `;

  // Основні категорії
  const otherItems = categories
    .map(
      ({ id, name }, index) =>
        `<div class="wrapper_category">
      <li class="category-item" data-id="${id}">
         <img class="img_category" src="${arrImg[index + 1]?.src}" srcset="${
          arrImg[index + 1]?.src2x
        } 2x" alt="${name}" />
         <p class="text_category">${name}</p>
       </li>
      </div>`
    )
    .join('');

  return firstLi + otherItems;
}

// Виклик після отримання категорій з API
fetchCategory().then(categories => {
  const markup = createMarkupCategory(categories, imgArr);
  categoriesList.innerHTML = ''; // Якщо потрібно очищати перед вставкою
  categoriesList.insertAdjacentHTML('beforeend', markup);
});
