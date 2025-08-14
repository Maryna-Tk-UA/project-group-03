import { fetchFurnitures } from './pixabay-api'; // перейменувала для ясності
import { els, state } from './refs';

export function renderCategories(categ, imgArr) {
  if (!categ || !imgArr) return;

  const firstLi = `
    <li class="category-item special-category wrapper_category active" data-id="0">
      <img class="img_category" src="${imgArr[0].src}" srcset="${imgArr[0].src2x} 2x" alt="${imgArr[0].alt}" />
      <p class="text_category">Всі товари</p>
    </li>
  `;

  const otherLi = categ
    .map(({ _id, name }, i) => `
      <li class="category-item wrapper_category" data-id="${_id}">
        <img class="img_category" src="${imgArr[i + 1].src}" srcset="${imgArr[i + 1].src2x} 2x" alt="${name}" />
        <p class="text_category">${name}</p>
      </li>
    `)
    .join('');

  els.categoriesList.innerHTML = firstLi + otherLi;
}

export function renderFurniture(furnituresArr, { append = false } = {}) {
  if (!Array.isArray(furnituresArr)) return;

  const markup = furnituresArr
    .map(({ _id, name, color, images, price }) => {
     const colorsMarkup =
  Array.isArray(color) && color.length > 0
    ? color
        .map(c => {
          const clean = String(c).replace(/[^a-zA-Z0-9]/g, '');
          const group = `color-${_id}`; // унікальна група для кожної картки
          return `
            <div class="color-checkbox">
              <input
                type="radio"
                id="${group}-${clean}"
                name="${group}"
                value="${c}"
                class="visually-hidden"
              />
              <label
                for="${group}-${clean}"
                class="color-swatch"
                style="background-color:${c};"
                title="${c}"
                aria-label="${c}"
              ></label>
            </div>
          `;
        })
        .join('')
    : '';

      return `
        <li class="furniture-item" data-id="${_id}">
          <img class="furniture-img" src="${images?.[0] ?? ''}" alt="${name ?? ''}" />
          <h3 class="furniture-subtitle">${name ?? ''}</h3>
          <div class="color-checkboxes">${colorsMarkup}</div>
          <p class="furniture-text">${price ?? ''} грн</p>
          <button class="furniture-btn" type="button" data-id="${_id}">Детальніше</button>
        </li>
      `;
    })
    .join('');

  if (!append) {
    els.furnitureList.innerHTML = markup;
  } else {
    els.furnitureList.insertAdjacentHTML('beforeend', markup);
  }
}

export async function categorySelected(categoryId) {
  // 1) активний клас
  els.categoriesList.querySelectorAll('.category-item')
    .forEach(li => li.classList.toggle('active', li.dataset.id === String(categoryId)));

  // 2) скидання стану під нову категорію
  state.categoryId = String(categoryId);
  state.page = 1;
  state.totalLoaded = 0;
  state.lastLoadedFurnitures = [];

  // 3) завантаження першої сторінки
  const { furnitures, total } = await fetchFurnitures({
    page: state.page,
    limit: state.limit,
    categoryId: state.categoryId,
  });

  state.totalItems = total;
  state.totalLoaded = furnitures.length;
  state.lastLoadedFurnitures = furnitures;

  // 4) рендер
  renderFurniture(furnitures, { append: false });
  updateLoadMoreButton(furnitures.length);
}

export function updateLoadMoreButton(lastBatchCount = state.limit) {
  // якщо API повертає total, пріоритет на ньому
  const reachedTotal =
    typeof state.totalItems === 'number' && state.totalItems > 0
      ? state.totalLoaded >= state.totalItems
      : false;

  // якщо остання партія коротша за limit — теж “кінець”
  const lastPageByBatch = lastBatchCount < state.limit;

  const noMore = reachedTotal || lastPageByBatch;

  els.loadMoreBtn.classList.toggle('is-hidden', noMore);
  els.loadMoreBtn.disabled = noMore;
}