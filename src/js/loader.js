export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('is-hidden');
}
