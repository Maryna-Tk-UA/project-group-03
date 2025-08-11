import { Notify } from 'notiflix/build/notiflix-notify-aio';

async function sendOrder(orderData) {
  const response = await fetch('https://furniture-store.b.goit.study/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    // Спробуємо прочитати текст або JSON, якщо є
    let errorText;
    try {
      errorText = await response.text();
    } catch {
      errorText = 'No response body';
    }
    throw new Error(`Failed to send order: ${response.status} ${response.statusText} - ${errorText}`);
  }
  return response.json();
}
const orderModal = document.querySelector('.backdrop-modal');
const orderModalForm = document.querySelector('.modal-form');
const orderModalCloseBtn = document.querySelector('.modal-close-btn');

function openOrderModal(furnitureId, color) {
   orderModal.classList.add('is-open');
  console.log("opened");
  
  document.body.style.overflow = 'hidden';

  // Встановлюємо значення прихованих полів у формі
  orderModalForm.querySelector('#furnitureId').value = furnitureId || '';
  orderModalForm.querySelector('#color').value = color || '';

  document.addEventListener('keydown', closeModalOnEsc);
  orderModal.addEventListener('click', closeModalOnOverlayClick);
}

function closeOrderModal() {
    orderModal.classList.remove('is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', closeModalOnEsc);
  orderModal.removeEventListener('click', closeModalOnOverlayClick);
}

function closeModalOnEsc(event) {
  if (event.key === 'Escape') {
    closeOrderModal();
  }
}

function closeModalOnOverlayClick(event) {
  if (event.target === orderModal) {
    closeOrderModal();
  }
}

orderModalCloseBtn.addEventListener('click', closeOrderModal);

orderModalForm.addEventListener('submit', async event => {
  event.preventDefault();

  const email = orderModalForm.elements['user-email'].value;
  const phoneRaw = orderModalForm.elements['user-phone'].value.trim();
  const comment = orderModalForm.elements['user-comment'].value;

  // Тепер беремо furnitureId та color із прихованих полів
  const furnitureId = orderModalForm.elements['furnitureId'].value;
  const color = orderModalForm.elements['color'].value;

  const phone = phoneRaw.replace(/\D/g, '');
  const orderData = {
    email,
    phone,
    comment,
    modelId: furnitureId,
    color,
  };

  try {
    const response = await sendOrder(orderData);
    Notify.success('Your order has been placed successfully!');
    orderModalForm.reset();
    closeOrderModal();
  } catch (error) {
    Notify.failure('Something went wrong. Please try again later.');
  }
});

export { openOrderModal, closeOrderModal };