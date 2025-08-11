import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { sendOrder } from './api';

const orderModal = document.querySelector('.backdrop');
const orderModalForm = document.querySelector('.modal-form');
const orderModalCloseBtn = document.querySelector('.modal-close-btn');

function openOrderModal() {
  orderModal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', closeModalOnEsc);
  orderModal.addEventListener('click', closeModalOnOverlayClick);
}

function closeOrderModal() {
  orderModal.classList.add('is-hidden');
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

  const name = orderModalForm.elements['user-name'].value;
  const phone = orderModalForm.elements['user-phone'].value;
  const comment = orderModalForm.elements['user-comment'].value;

  const orderData = {
    name,
    phone,
    comment,
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
