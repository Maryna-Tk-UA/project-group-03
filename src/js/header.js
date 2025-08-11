const headerMenu = document.querySelector('.header-menu');
const burgerBtn = document.querySelector('.burger-btn')
const closeBtn = document.querySelector('.mobile-menu-button');
const mobileMenuLinks = document.querySelectorAll('.header-menu-link');

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

function onEscKey(e) {
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
}

function closeMobileMenu() {
headerMenu.classList.add('is-hidden');
  closeBtn.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onEscKey);
}


burgerBtn.addEventListener('click', ()=>{
document.addEventListener('keydown', onEscKey);
burgerBtn.classList.add('is-hidden');
headerMenu.classList.remove('is-hidden');
closeBtn.classList.remove('is-hidden');
if (window.innerWidth < 768) {
    document.body.classList.add('no-scroll');
  }
});

// close menu after ESC click
closeBtn.addEventListener('click', closeMobileMenu);

// close menu after lіnk click
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
    if (window.innerWidth < 1440){
      burgerBtn.classList.remove('is-hidden');
    }

  });
});

//  close menu after lіnk to free space

document.addEventListener('click', (event) => {
  const isClickInsideMenu = headerMenu.contains(event.target);
  const isClickOnBurgerBtn = burgerBtn.contains(event.target);
  const isClickOnCloseBtn = closeBtn.contains(event.target);

if (!isClickInsideMenu && !isClickOnBurgerBtn && !isClickOnCloseBtn && !headerMenu.classList.contains('is-hidden')) {
    headerMenu.classList.add('is-hidden');
    burgerBtn.classList.remove('is-hidden');
    closeBtn.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
  }
});

