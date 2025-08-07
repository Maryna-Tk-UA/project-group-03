const headerMenu = document.querySelector('.header-menu');
const burgerBtn = document.querySelector('.burger-btn')
const closeBtn = document.querySelector('.mobile-menu-button');

function toggleMenuVisibility(e) {
  if (e.matches) {
    headerMenu.classList.remove('is-hidden');
    burgerBtn.classList.add('is-hidden');
    closeBtn.classList.add('is-hidden');
  } else {
    headerMenu.classList.add('is-hidden');
    burgerBtn.classList.remove('is-hidden');
    closeBtn.classList.add('is-hidden');
  }
}
const mediaQuery = window.matchMedia('(min-width: 1440px)');

mediaQuery.addEventListener('change', toggleMenuVisibility);
toggleMenuVisibility(mediaQuery);

burgerBtn.addEventListener('click', ()=>{
burgerBtn.classList.add('is-hidden');
headerMenu.classList.remove('is-hidden');
closeBtn.classList.remove('is-hidden');
});
closeBtn.addEventListener('click',()=>{
burgerBtn.classList.remove('is-hidden');
headerMenu.classList.add('is-hidden');
closeBtn.classList.add('is-hidden');
});

