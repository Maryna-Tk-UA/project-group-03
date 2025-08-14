const categoriesList = document.querySelector(".categories-list");

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