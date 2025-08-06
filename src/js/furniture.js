const API_BASE = 'https://furniture-store.b.goit.study/api';
const listEl = document.getElementById('furniture-list');
const filtersEl = document.getElementById('category-filters');
const loadMoreBtn = document.getElementById('load-more');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');

let currentPage = 1;
let currentCategory = null;
let totalPages = 1;

document.addEventListener('DOMContentLoaded', () => {
  fetchCategories();
  fetchFurniture();

  // Делегування кліку на кнопки "Детальніше"
  listEl.addEventListener('click', async e => {
    if (e.target.classList.contains('details-btn')) {
      const id = e.target.dataset.id;
      try {
        const res = await axios.get(`${API_BASE}/furnitures/${id}`);
        const data = res.data;
        console.log(data);

        // Якщо data.img масив — беремо перше зображення
        const imgSrc = Array.isArray(data.img) ? data.img[0] : data.img;

        modalContent.innerHTML = `
          <h2>${data.name}</h2>
          <img src="${imgSrc}" alt="${data.name}" style="width:100%; border-radius:10px; margin-top:10px;"/>
          <p>${data.description}</p>
          <p><strong>${data.price} грн</strong></p>
        `;
        modal.classList.remove('hidden');
      } catch (err) {
        console.error('❌ Помилка при отриманні деталей:', err.message);
      }
    }
  });
});

filtersEl.addEventListener('click', e => {
  if (e.target.classList.contains('filter-btn')) {
    document
      .querySelectorAll('.filter-btn')
      .forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    const categoryId = e.target.dataset.category;
    currentCategory = categoryId === 'all' ? null : categoryId;
    currentPage = 1;
    listEl.innerHTML = '';
    fetchFurniture();
  }
});

loadMoreBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchFurniture();
  }
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

async function fetchCategories() {
  try {
    const res = await axios.get(`${API_BASE}/categories`);
    const categories = res.data;

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.category = cat._id;
      btn.style.backgroundImage = `url(${cat.img})`;
      btn.textContent = cat.name;
      filtersEl.appendChild(btn);
    });
  } catch (error) {
    console.error('❌ Помилка отримання категорій:', error.message);
  }
}

async function fetchFurniture() {
  try {
    const params = {
      page: currentPage,
      limit: 8,
    };
    if (currentCategory) params.category = currentCategory;

    const res = await axios.get(`${API_BASE}/furnitures`, { params });
    const data = res.data.furnitures;
    console.log(data);

    // Загальна кількість сторінок (підставляй, якщо API дає це в іншому полі)
    totalPages = res.data.totalPages || 1;

    data.forEach(item => {
      const li = document.createElement('li');
      li.className = 'furniture-item';
      li.innerHTML = `
        <img src="${
          item.images && item.images.length > 0
            ? item.images[0]
            : 'placeholder.jpg'
        }" alt="${item.name}">
        <div class="furniture-info">
          <h3>${item.name}</h3>
          <div class="colors">
            ${
              item.colors
                ? item.colors
                    .map(
                      c =>
                        `<span class="color-dot" style="background:${c}"></span>`
                    )
                    .join('')
                : ''
            }
          </div>
          <p class="price">${item.price} грн</p>
          <button class="details-btn" data-id="${item._id}">Детальніше</button>
        </div>
      `;
      listEl.appendChild(li);
    });

    loadMoreBtn.style.display = currentPage < totalPages ? 'block' : 'none';
  } catch (error) {
    console.error('❌ Помилка отримання меблів:', error.message);
  }
}
