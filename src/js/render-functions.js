const categoriesList = document.querySelector(".categories-list");
const furnitureList = document.querySelector(".furniture-list");


export function renderCategories(categ, imgArr) {
  if(!categ || !imgArr) return '';

  const firstLi = `
  <li class="category-item special-category wrapper_category"
   data-id="0">
     <img class="img_category" src="${imgArr[0].src}" 
     srcset="${imgArr[0].src2x} 2x" alt=${imgArr[0].alt}"/>
     <p class="text_category">Всі товари}</p>
   </li>
  `;

  const otherLi = categ.map(({ _id, name }, i) => `
   <li class="category-item wrapper_category"
   data-id=${_id}>
     <img class="img_category" src="${imgArr[i + 1].src}" 
     srcset="${imgArr[i + 1].src2x} 2x" alt=${name}"/>
     <p class="text_category">${name}</p>
   </li>
  `).join('');

  categoriesList.innerHTML = firstLi+otherLi;
}


export function renderFurniture (furnituresArr) {
    const markup = furnituresArr.map (({ _id, name, color, images, price }) => {
        const colorsOfFurnitures = Array.isArray(color) && color.length > 0
        ? color.map(c => {
            const cleanColorId = c.replace(/[^a-zA-Z0-9]/g, '');
            return `
            <div class="color-checkbox">
              <input type="checkbox" id="color-${_id}-${cleanColorId}" name="color-${_id}" value="${c}" />
              <label for="color-${_id}-${cleanColorId}" style="background-color: ${c};" title="${c}"></label>
            </div>
            `
        }
        ).join('')
        : ''
     return `
      <li class="furniture-item" data-id="${_id}">
          <img class="furniture-img" src="${images[0] || ''}" alt="${name}" />
          
          <h3 class="furniture-subtitle">${name}</h3>
          <div class="color-checkboxes">${colorsOfFurnitures}</div>
          <p class="furniture-text">${price} грн</p>
          
          <button class="furniture-btn" type="button" data-id="${_id}">Детальніше</button>
      </li>
    `    
    }).join('');
   
    furnitureList.insertAdjacentHTML("beforeend", markup);
}