const modal = document.querySelector(".furniture-detail-modal");
const backdrop = document.querySelector(".backdrop");
const closeBtn = document.querySelector(".close-btn");
const modalContent = document.querySelector(".modal-content");

export function openProductModal(product) {
  if (!product) {
    console.error("Продукт не переданий у openProductModal");
    return;
  }

  backdrop.classList.add("is-open");
  document.body.classList.add("no-scroll");

  modalContent.innerHTML = `
    <div class="images">
      <div class="main-image-wrapper">
        <img src="${product.images?.[0] || ''}" alt="${product.name || ''}" class="main-image">
      </div>
      <ul class="small-images-list">
        ${(product.images || [])
          .slice(1)
          .map(
            img => `
              <li class="small-images-list-item">
                <img src="${img}" alt="${product.name || ''}" class="thumb">
              </li>
            `
          )
          .join("")}
      </ul>
    </div>
    <div class="descr">
      <h3 class="furniture-name">${product.name || ''}</h3>
      <p class="furniture-category-text">${product.category?.name || ""}</p>
      <form>
        <p class="price">${product.price || ''} <span class="currency">грн</span></p>
        <div class="rating">${"★".repeat(product.rate || 0)}</div>
        <p class="color">Колір</p>
        <ul class="color-list">
  ${(product.color || [])
    .map(
      (color, index) => `
        <li class="color-list-item">
          <input type="checkbox" id="color-${index}" name="color-${index}" value="${color}">
          <label for="color-${index}" style="background:${color};"></label>
        </li>
      `
    )
    .join("")}
</ul>
        <p class="descr-text">${product.description || ""}</p>
        <p class="product-size">Розміри: ${product.sizes || ""}</p>
        <button type="submit" class="form-btn">Перейти до замовлення</button>
      </form>
    </div>
  `;

  // Слухач для мініатюр
  const smallImages = modalContent.querySelector(".small-images-list");
  if (smallImages) {
    smallImages.addEventListener("click", e => {
      const thumb = e.target.closest(".thumb");
      if (!thumb) return;
      const mainImage = modalContent.querySelector(".main-image");
      const tempSrc = mainImage.src;
      mainImage.src = thumb.src;
      thumb.src = tempSrc;
    });
  }

  // Слухач для форми
  const form = modalContent.querySelector("form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const checkedColor = form.querySelector('input[name="color"]:checked');
      if (!checkedColor) {
        alert("Виберіть колір!");
        return;
      }
      console.log("Обраний колір:", checkedColor.value);
      closeModal();
    });
  }
}

function closeModal() {
  backdrop.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

if (backdrop) {
  backdrop.addEventListener("click", e => {
    if (e.target === backdrop) closeModal();
  });
}
