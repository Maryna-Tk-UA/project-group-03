import axios from 'axios';


import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const postList = document.querySelector('#feedback-list');
let swiperInstance = null;

async function feedbackCards() {
  try {
    const response = await axios.get('https://furniture-store.b.goit.study/api/feedbacks');
    const feedbacks = response.data.feedbacks;

    await renderFeedbacks(feedbacks);
    initSwiper();
  } catch (error) {
    console.error(error);
    postList.innerHTML = "<div>Сталася помилка при завантаженні відгуків.</div>";
  }
}

async function renderFeedbacks(feedbacks) {
  const slides = feedbacks.map(({ name, descr, rate }) => {
    const simplifiedRate = simplifyValue(rate);
    const thumbs = Array.from({ length: 5 }, () => {
      return `<i class="fa-solid fa-thumbs-up thumb-icon"></i>`;
    }).join("");

    return `
   <div class="swiper-slide feedback-card">
        <div class="rate-feedback" data-rate="${simplifiedRate}">
          ${thumbs}
        </div>
        <p class="text-feedback">${descr}</p>
        <p class="name-user-feedback">${name}</p>
</div>
    `;
  }).join('');

    postList.innerHTML = `
   <div class="swiper feedback-swiper">
    <div class="swiper-wrapper">
      ${slides}
    </div>

  </div>
`;

  await new Promise(resolve => requestAnimationFrame(resolve));
  animateThumbs();
}

function simplifyValue(value) {
  if (value >= 3.3 && value <= 3.7) {
    return 3.5;
  } else if (value >= 3.8 && value <= 4.2) {
    return 4;
  } else {
    return value;
  }
}

function animateThumbs() {
  const allRatings = document.querySelectorAll('.rate-feedback');

  allRatings.forEach(container => {
    const rate = parseFloat(container.getAttribute('data-rate'));
    const icons = container.querySelectorAll('.thumb-icon');

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
  });
}



function initSwiper() {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper('.feedback-swiper', {
    modules: [Navigation, Pagination],
    
    spaceBetween: 24,
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
     
  dynamicBullets: true,
  dynamicMainBullets: 5,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1440: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        },
      },
      on: {
          slideChange: () => {
              animateThumbs();
        },
      }
  });
}



feedbackCards();






















// import axios from 'axios';


// const postList = document.querySelector('.feedback-list');
// const leftBtn = document.querySelector('.fa-circle-left');
// const rightBtn = document.querySelector('.fa-circle-right');
// const dotsContainer = document.querySelector('.feedback-dots');

// let feedbacks = [];
// let currentPage = 0;
// let cardsPerPage = 1;
// let swiperInstance = null;

// async function feedbackCards() {
//   try {
//     const response = await axios.get('https://furniture-store.b.goit.study/api/feedbacks');
//     feedbacks = response.data.feedbacks;

//     calculateCardsPerPage();
//     showFeedbackGroup();
//     createDots();
//     updateDots();
//     updateButtonStates();
//   } catch (error) {
//     console.error(error);
//     postList.innerHTML = "<li>Сталася помилка при завантаженні відгуків.</li>";
//   }
// }

// function showFeedbackGroup() {
//   const start = currentPage * cardsPerPage;
//   const end = start + cardsPerPage;
//   const visibleFeedbacks = feedbacks.slice(start, end);

//   const markup = visibleFeedbacks.map(({ name, descr, rate }) => {
//   const simplifiedRate = simplifyValue(rate);
//   const thumbs = Array.from({ length: 5 }, () => {
//     return `<i class="fa-solid fa-thumbs-up thumb-icon"></i>`;
//   }).join("");

//   return `
//     <div class="swiper-slide">
//       <li class="feedback-card">
//         <div class="rate-feedback" data-rate="${simplifiedRate}">
//           ${thumbs}
//         </div>
//         <p class="text-feedback">${descr}</p>
//         <p class="name-user-feedback">${name}</p>
//       </li>
//     </div>
//   `;
//   }).join("");
    
//     postList.innerHTML = markup;
//     new Swiper('.feedback-swiper', {
//   slidesPerView: cardsPerPage,
//   spaceBetween: 20,
//   allowTouchMove: true, // головне — дозволити свайп
//   simulateTouch: true,
//   watchOverflow: true, // не дозволяти свайп, якщо мало слайдів
// });
//   animateThumbs();
// }


// function createDots() {
//   dotsContainer.innerHTML = '';
//   const totalPages = Math.ceil(feedbacks.length / cardsPerPage);

//   for (let i = 0; i < totalPages; i++) {
//     const dot = document.createElement('span');
//     dot.classList.add('dot');
//     if (i === currentPage) dot.classList.add('active');
//     dotsContainer.appendChild(dot);
//   }
// }

// function updateDots() {
//   const allDots = dotsContainer.querySelectorAll('.dot');
//   allDots.forEach(dot => dot.classList.remove('active'));
//   if (allDots[currentPage]) {
//     allDots[currentPage].classList.add('active');
//   }
// }

// function animateThumbs() {
//   const allRatings = document.querySelectorAll('.rate-feedback');

//   allRatings.forEach(container => {
//     const rate = parseFloat(container.getAttribute('data-rate'));
//     const icons = container.querySelectorAll('.thumb-icon');

//     icons.forEach((icon, index) => {
//       setTimeout(() => {
//         if (index < Math.floor(rate)) {
//           icon.classList.add('fill');
//         } else if (index === Math.floor(rate) && rate % 1 !== 0) {
//           icon.classList.add('half');
//         }
//       }, index * 150);
//     });
//   });
// }

// function simplifyValue(value) {
//   if (value >= 3.3 && value <= 3.7) {
//     return 3.5;
//   } else if (value >= 3.8 && value <= 4.2) {
//     return 4;
//   } else {
//     return value;
//   }
// }

// function updateButtonStates() {
//   const totalPages = Math.ceil(feedbacks.length / cardsPerPage);

//   leftBtn.classList.toggle('inactive', currentPage === 0);
//   rightBtn.classList.toggle('inactive', currentPage >= totalPages - 1);
// }


// function calculateCardsPerPage() {
//   const width = window.innerWidth;

//   if (width >= 1440) {
//     cardsPerPage = 3;
//   } else if (width >= 768) {
//     cardsPerPage = 2;
//   } else {
//     cardsPerPage = 1;
//   }
// }

// leftBtn.addEventListener('click', () => {
//   if (currentPage > 0) {
//     currentPage--;
//     showFeedbackGroup();
//     updateDots();
//     updateButtonStates();
//   }
// });

// rightBtn.addEventListener('click', () => {
//   const totalPages = Math.ceil(feedbacks.length / cardsPerPage);
//   if (currentPage < totalPages - 1) {
//     currentPage++;
//     showFeedbackGroup();
//     updateDots();
//     updateButtonStates();
//   }
// });

// window.addEventListener('resize', () => {
//   calculateCardsPerPage();
//   showFeedbackGroup();
//   createDots();
//   updateDots();
//   updateButtonStates();
// });

// feedbackCards();
