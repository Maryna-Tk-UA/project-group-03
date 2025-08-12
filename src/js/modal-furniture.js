import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

// === DOM-елементи ===
const modalFurniture = document.querySelector('.modal-furniture');
const closeBtn = modalFurniture.querySelector('.close-btn');
const modalContent = modalFurniture.querySelector('.modal-content');
const modalForm = document.querySelector('.modal-form');
const modalBackdrop = document.querySelector('[data-modal]');

// === Відкриття модалки товару ===
export function openProductModal(product) {
  modalFurniture.classList.add('is-open');
  document.body.classList.add('no-scroll');

  modalContent.innerHTML = `
    <h2>${product.name}</h2>
    <p>Категорія: ${product.category?.name || ''}</p>
    <p>Ціна: ${product.price} грн</p>
    <p>Опис: ${product.description || ''}</p>
    <p>Розміри: ${product.sizes || ''}</p>
    <button
      class="form-btn"
      data-order-btn
      data-id="${product._id || product.id}"
      data-marker="${product.color || ''}"
    >Перейти до замовлення</button>
  `;

  const orderBtn = modalContent.querySelector('.form-btn');
  if (orderBtn) {
    orderBtn.onclick = event => {
      const btn = event.currentTarget;
      const furnitureIdInput = document.getElementById('furnitureId');
      const colorInput = document.getElementById('color');

      if (furnitureIdInput && colorInput) {
        furnitureIdInput.value = btn.dataset.id || '';
        colorInput.value = (btn.dataset.marker || '').replace(/^#/, '');
      }

      closeModal();

      modalBackdrop.classList.remove('is-hidden');
      modalBackdrop.classList.add('is-open');
    };
  }
}

// === Закриття модалки товару ===
export function closeModal() {
  modalFurniture.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  modalContent.innerHTML = '';
}

closeBtn.addEventListener('click', closeModal);

modalFurniture.addEventListener('click', e => {
  if (e.target === modalFurniture) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalFurniture.classList.contains('is-open')) {
    closeModal();
  }
});

// === Сабміт форми замовлення ===
modalForm.addEventListener('submit', async event => {
  event.preventDefault();

  if (!modalForm.checkValidity()) {
    modalForm.reportValidity();
    return;
  }

  const rawData = new FormData(modalForm);

  const formData = {
    email: rawData.get('user-email')?.trim() || '',
    phone: rawData.get('user-phone')?.trim() || '',
    comment: rawData.get('user-comment')?.trim() || '',
    modelId: rawData.get('furnitureId')?.trim() || '',
    color: rawData.get('color')?.trim() || '',
  };

  // Перевірки перед відправкою
  if (!formData.modelId) {
    Notify.failure('Не вибрано товар для замовлення');
    return;
  }

  if (!formData.color) {
    Notify.failure('Не обрано колір товару');
    return;
  }

  try {
    const response = await fetch('https://furniture-store.b.goit.study/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    let result = {};
    try {
      result = await response.json();
    } catch {
      result = {};
    }

    if (response.ok) {
      Notify.success("Заявку на зворотний зв'язок надіслано.");
      modalForm.reset();
      closeOrderModal(); // ця функція є нижче — усе добре
    } else {
      const errorMessage =
        typeof result.message === 'string' && result.message.trim()
          ? result.message
          : 'Сталася помилка при відправці заявки.';
      Notify.failure(errorMessage);
    }
  // } catch (error) {
  //   Notify.failure('Не вдалося надіслати заявку. Спробуйте пізніше.');
  // }
});

// === Закриття модалки замовлення ===
function closeOrderModal() {
  modalBackdrop.classList.remove('is-open');
  modalBackdrop.classList.add('is-hidden');
}



