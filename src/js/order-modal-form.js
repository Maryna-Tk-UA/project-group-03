import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// === Пошук елементів DOM ==
const modalForm = document.querySelector('.modal-form');
const modalBackdrop = document.querySelector('[data-modal]');

// === Змінні для збереження даних контексту замовлення ===
let furnitureId = null;

let markerValue = null;

// === Обробка сабміту форми ===
modalForm.addEventListener('submit', async event => {
  event.preventDefault();

  if (!modalForm.checkValidity()) {
    modalForm.reportValidity();
    return;
  }

  // === Підготовка даних для відправки ===
  const formData = {
     email: modalForm['user-email'].value.trim(),
  phone: modalForm['user-phone'].value.trim(),
  comment: modalForm['user-comment'].value.trim(),
  modelId: furnitureId,
  color: markerValue,
  };

  // === Відправка POST-запиту на сервер ===
  try {
    const response = await fetch('https://furniture-store.b.goit.study/api/orders', {
      method: 'POST', // Метод запиту
      headers: {
        'Content-Type': 'application/json', // Тип тіла запиту
      },
      body: JSON.stringify(formData),
    });

    // Отримуємо відповідь сервера у форматі JSON
    const result = await response.json();

    // === Обробка відповіді сервера ===
    if (response.ok) {
      iziToast.success({
        title: 'Успіх',
        message: "Заявку на зворотний зв'язок надіслано.",
        position: 'topRight',
      });

      modalForm.reset();

      // Закрити модальне вікно (приховати бекдроп)
      modalBackdrop.classList.add('is-hidden');
      modalBackdrop.classList.remove('is-open');
    } else {
      iziToast.error({
        title: 'Помилка',
        message: result.message || 'Сталася помилка при відправці заявки.',
        position: 'topRight',
      });

      // Форма і модалка залишаються відкритими для виправлення помилок
    }
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося надіслати заявку. Спробуйте пізніше.',
      position: 'topRight',
    });
  }
});
