
const loaderOverlay = document.getElementById("loaderOverlay");

export function showLoader() {
  loaderOverlay.classList.remove("visually-hidden");
}

export function hideLoader() {
  loaderOverlay.classList.add("visually-hidden");
}

