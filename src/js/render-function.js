import { state } from './furnitures';

const furnitureList = document.querySelector('.furniture-list');
const categoriesList = document.getElementById('categoriesList');
const loadMoreBtn = document.getElementById('load-more');

export function categoryItemTemplate({ _id, name }, img, active) {
  return `
    <li class="category-item wrapper_category ${
      active ? 'active' : ''
    }" data-id="${_id}">
      <img class="img_category" src="${img.src}" srcset="${
    img.src2x
  } 2x" alt="${name}" />
      <p class="text_category">${name}</p>
    </li>
  `;
}

export function furnitureItemTemplate({ _id, name, price, images, color }) {
  const colorsMarkup =
    Array.isArray(color) && color.length
      ? color
          .map(c => {
            const cleanId = c.replace(/[^a-zA-Z0-9]/g, '');
            return `
          <div class="color-checkbox">
            <input type="checkbox" id="color-${_id}-${cleanId}" value="${c}" />
            <label for="color-${_id}-${cleanId}" style="background-color: ${c};" title="${c}"></label>
          </div>
        `;
          })
          .join('')
      : '';

  return `
    <li class="furniture-item" data-id="${_id}">
      <div class="furniture-img-wrap">
        <img class="furniture-img" src="${images[0] || ''}" alt="${name}" />
      </div>
        <h3 class="furniture-subtitle">${name}</h3>
        <div class="color-checkboxes">${colorsMarkup}</div>
        <p class="furniture-text">${price} грн</p>
      <button class="furniture-btn" type="button" data-id="${_id}">Детальніше</button>
    </li>
  `;
}

export function renderCategories(categories, imgArr, activeId) {
  const firstCategory = categoryItemTemplate(
    { _id: '0', name: 'Всі товари' },
    imgArr[0],
    activeId === '0'
  );

  const otherCategories = categories
    .map((cat, i) =>
      categoryItemTemplate(cat, imgArr[i + 1], activeId === cat._id)
    )
    .join('');

  categoriesList.innerHTML = firstCategory + otherCategories;
}

export function renderFurnitures(furnitures, append = false) {
  if (!append) furnitureList.innerHTML = '';

  if (!furnitures.length && !append) {
    furnitureList.innerHTML = '<p>Товари відсутні в цій категорії</p>';
    return;
  }

  const markup = furnitures.map(furnitureItemTemplate).join('');
  furnitureList.insertAdjacentHTML('beforeend', markup);
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
  loadMoreBtn.disabled = true;
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
  loadMoreBtn.disabled = false;
}





// Передаємо id та колір для замовлення

export function saveOrderData(_id, color) {
  const orderData = { _id, color };
  localStorage.setItem("orderData", JSON.stringify(orderData))
}

//? Використання
// const product = { id: "123", name: "Диван", color: "#f5f5f5" }
// saveOrderData(product.id, product.color)  // передаємо це


export function getOrderData() {
  const data = localStorage.getItem("orderData");
  return data ? JSON.parse(data) : null;
}

//? Використання
// const saveProductData = JSON.parse(localStorage.getItem('orderData'));
// console.log(saveProductData.id, saveProductData.color)