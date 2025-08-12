import{i as p,a as j,S as D,N as H,P as V}from"./assets/vendor-4sAmoOmz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();const m=document.querySelector(".header-menu"),g=document.querySelector(".burger-btn"),f=document.querySelector(".mobile-menu-button"),W=document.querySelectorAll(".header-menu-link");function C(e){e.matches?(m.classList.remove("is-hidden"),g.classList.add("is-hidden"),f.classList.add("is-hidden")):(m.classList.add("is-hidden"),g.classList.remove("is-hidden"),f.classList.add("is-hidden"))}const P=window.matchMedia("(min-width: 1440px)");P.addEventListener("change",C);C(P);g.addEventListener("click",()=>{g.classList.add("is-hidden"),m.classList.remove("is-hidden"),f.classList.remove("is-hidden"),window.innerWidth<768&&document.body.classList.add("no-scroll")});f.addEventListener("click",()=>{g.classList.remove("is-hidden"),m.classList.add("is-hidden"),f.classList.add("is-hidden"),document.body.classList.remove("no-scroll")});W.forEach(e=>{e.addEventListener("click",()=>{f.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),window.innerWidth<1440&&(g.classList.remove("is-hidden"),m.classList.add("is-hidden"))})});document.addEventListener("click",e=>{const t=window.innerWidth,o=m.contains(e.target),i=g.contains(e.target),s=f.contains(e.target);t>=768&&t<=1439&&!o&&!i&&!s&&!m.classList.contains("is-hidden")&&(m.classList.add("is-hidden"),g.classList.remove("is-hidden"),f.classList.add("is-hidden"),document.body.classList.remove("no-scroll"))});const O=document.getElementById("loaderOverlay");function S(){O.classList.remove("visually-hidden")}function v(){O.classList.add("visually-hidden")}async function z(e){const t=await fetch("https://furniture-store.b.goit.study/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok){let o;try{o=await t.text()}catch{o="No response body"}throw new Error(`Failed to send order: ${t.status} ${t.statusText} - ${o}`)}return t.json()}const L=document.querySelector(".backdrop-modal"),d=document.querySelector(".modal-form"),G=document.querySelector(".modal-close-btn");function K(e,t){L.classList.add("is-open"),document.body.style.overflow="hidden",d.querySelector("#furnitureId").value=e||"",d.querySelector("#color").value=t||"",document.addEventListener("keydown",I),L.addEventListener("click",R)}function k(){L.classList.remove("is-open"),document.body.style.overflow="",document.removeEventListener("keydown",I),L.removeEventListener("click",R)}function I(e){e.key==="Escape"&&k()}function R(e){e.target===L&&k()}G.addEventListener("click",k);d.addEventListener("submit",async e=>{e.preventDefault();const t=d.elements["user-email"].value,o=d.elements["user-phone"].value.trim(),i=d.elements["user-comment"].value,s=d.elements.furnitureId.value,a=d.elements.color.value,n=o.replace(/\D/g,""),c={email:t,phone:n,comment:i,modelId:s,color:a};try{const l=await z(c);Notiflix.Notify.success("Your order has been placed successfully!"),d.reset(),k()}catch(l){const u=l&&typeof l.message=="string"?l.message:"Сталася невідома помилка. Спробуйте пізніше.";Notiflix.Notify.failure(u)}});const J="/project-group-03/assets/1_1x-min-BEGO2iRR.png",U="/project-group-03/assets/1_2x-min-lnnjaoMj.png",Z="/project-group-03/assets/2_1x-min-C__8UPDK.png",X="/project-group-03/assets/2_2x-min-D9fqBBTn.png",Y="/project-group-03/assets/3_1x-min-BvLIRqdy.png",Q="/project-group-03/assets/3_2x-min-yVXSstk5.png",ee="/project-group-03/assets/4_1x-min-C30Y0H4n.png",te="/project-group-03/assets/4_2x-min-BHXJjPO7.png",se="/project-group-03/assets/5_1x-min-wSkZBUbW.png",oe="/project-group-03/assets/5_2x-min-CgMWSMRR.png",re="/project-group-03/assets/6_1x-min-BaDuf7OS.png",ie="/project-group-03/assets/6_2x-min-B4s5M_bO.png",ae="/project-group-03/assets/7_1x-min-BZSux2Xm.png",ne="/project-group-03/assets/7_2x-min-BsKO7AHq.png",ce="/project-group-03/assets/8_1x-min-3ZbjIKlv.png",le="/project-group-03/assets/8_2x-min-wQf-TG0i.png",de="/project-group-03/assets/9_1x-min-BJ62_kU-.png",ue="/project-group-03/assets/9_2x-min-kYMeqj-0.png",me="/project-group-03/assets/10_1x-min-B2g23o63.png",pe="/project-group-03/assets/10_2x-min-DM_afex-.png",ge="/project-group-03/assets/11_1x-min-CPwpJ1tL.png",fe="/project-group-03/assets/11_2x-min-BqnmWR6N.png",ye="/project-group-03/assets/12_1x-min-DdbOnpz6.png",he="/project-group-03/assets/12_2x-min-Ca2UBeBI.png",be="/project-group-03/assets/13_1x-min-BqVEy2n1.png",Le="/project-group-03/assets/13_2x-min-DcSxlIpi.png";document.querySelector(".furniture-detail-modal");const h=document.querySelector(".backdrop"),B=document.querySelector(".close-btn"),y=document.querySelector(".modal-content");function xe(e){if(!e){p.warning({message:"Продукт не обраний",position:"topRight"});return}document.addEventListener("keydown",T);const t=e.rate||0,i=Array.from({length:5},()=>'<i class="fa-solid fa-thumbs-up thumb-icon"></i>').join("");h.classList.add("is-open"),document.body.classList.add("no-scroll"),y.innerHTML=`
    <div class="images">
      <div class="main-image-wrapper">
        <img src="${e.images?.[0]||""}" alt="${e.name||""}" class="main-image">
      </div>
      <ul class="small-images-list">
        ${(e.images||[]).slice(1).map(n=>`
              <li class="small-images-list-item">
                <img src="${n}" alt="${e.name||""}" class="thumb">
              </li>
            `).join("")}
      </ul>
    </div>
    <div class="descr">
      <h3 class="furniture-name">${e.name||""}</h3>
      <p class="furniture-category-text">${e.category?.name||""}</p>
      <form>
        <p class="price">${e.price||""} <span class="currency">грн</span></p>
        <div class="rating" data-rate="${t}">
          ${i}
        </div>
        <p class="color">Колір</p>
        <ul class="color-list">
  ${(e.color||[]).map((n,c)=>`
        <li class="color-list-item">
          <input type="checkbox" id="color-${c}" name="color-${c}" value="${n}">
          <label for="color-${c}" style="background:${n};"></label>
        </li>
      `).join("")}
</ul>
        <p class="descr-text">${e.description||""}</p>
        <p class="product-size">Розміри: ${e.sizes||""}</p>
        <button type="submit" class="form-btn">Перейти до замовлення</button>
      </form>
    </div>
  `,ve();const s=y.querySelector(".small-images-list");s&&s.addEventListener("click",n=>{const c=n.target.closest(".thumb");if(!c)return;const l=y.querySelector(".main-image"),u=l.src;l.src=c.src,c.src=u});const a=y.querySelector("form");a&&a.addEventListener("submit",n=>{n.preventDefault();const c=a.querySelector('input[type="checkbox"]:checked');if(!c){p.info({message:"Оберіть, будь ласка, колір.",position:"topRight"});return}w(),K(e._id,c.value)})}function ve(){const e=y.querySelector(".rating");if(!e)return;const t=parseFloat(e.getAttribute("data-rate")),o=e.querySelectorAll(".thumb-icon");o.forEach(i=>{i.classList.remove("fill","half")}),o.forEach((i,s)=>{setTimeout(()=>{s<Math.floor(t)?i.classList.add("fill"):s===Math.floor(t)&&t%1!==0&&i.classList.add("half")},s*200)})}function T(e){e.key==="Escape"&&h.classList.contains("is-open")&&w()}function w(){h.classList.remove("is-open"),document.body.classList.remove("no-scroll"),document.removeEventListener("keydown",T)}B&&B.addEventListener("click",w);h&&h.addEventListener("click",e=>{e.target===h&&w()});y.addEventListener("change",e=>{e.target.matches('.color-list input[type="checkbox"]')&&e.target.closest(".color-list").querySelectorAll('input[type="checkbox"]').forEach(o=>{o!==e.target&&(o.checked=!1)})});const x=document.querySelector(".furniture-list"),M=document.getElementById("categoriesList"),E=document.getElementById("load-more"),F="https://furniture-store.b.goit.study/api",ke=[{src:J,src2x:U,alt:"Меблі від Меблерія"},{src:Z,src2x:X,alt:"Меблі від Меблерія"},{src:Y,src2x:Q,alt:"Меблі від Меблерія"},{src:ee,src2x:te,alt:"Меблі від Меблерія"},{src:se,src2x:oe,alt:"Меблі від Меблерія"},{src:re,src2x:ie,alt:"Меблі від Меблерія"},{src:ae,src2x:ne,alt:"Меблі від Меблерія"},{src:ce,src2x:le,alt:"Меблі від Меблерія"},{src:de,src2x:ue,alt:"Меблі від Меблерія"},{src:me,src2x:pe,alt:"Меблі від Меблерія"},{src:ge,src2x:fe,alt:"Меблі від Меблерія"},{src:ye,src2x:he,alt:"Меблі від Меблерія"},{src:be,src2x:Le,alt:"Меблі від Меблерія"}],r={categories:[],currentCategoryId:"0",currentPage:1,limit:8,totalLoaded:0,totalAvailable:0,lastLoadedFurnitures:[]};async function we(){S();try{return(await j.get(`${F}/categories`)).data||[]}catch{return p.error({message:"Сталася помилка при отриманні категорій",position:"topRight"}),[]}finally{v()}}function $e(e,t,o){if(!e||!t)return"";const i=`
    <li class="category-item special-category wrapper_category ${o==="0"?"active":""}" data-id="0">
      <img class="img_category" src="${t[0]?.src}" srcset="${t[0]?.src2x} 2x" alt="${t[0]?.alt}" />
      <p class="text_category">Всі товари</p>
    </li>
  `,s=e.map(({_id:a,name:n},c)=>`
      <li class="category-item wrapper_category ${o===a?"active":""}" data-id="${a}">
        <img class="img_category" src="${t[c+1]?.src}" srcset="${t[c+1]?.src2x} 2x" alt="${n}" />
        <p class="text_category">${n}</p>
      </li>
    `).join("");return i+s}async function _({category:e="0",page:t=1,limit:o=8}={}){S();try{const i={page:t,limit:o};e!=="0"&&(i.category=e);const s=await j.get(`${F}/furnitures`,{params:i}),a=s.data?.furnitures||[],n=Number(s.data?.total??s.data?.totalItems??s.data?.totalCount??s.data?.totalFurnitures??0);return{furnitures:a,total:n}}catch{return p.error({message:"Помилка отримання меблів",position:"topRight"}),{furnitures:[],total:0}}finally{v()}}function q(e,t=!1){if(t?r.lastLoadedFurnitures=[...r.lastLoadedFurnitures,...e]:(x.innerHTML="",r.lastLoadedFurnitures=e),!Array.isArray(e)||e.length===0){t||(x.innerHTML="<p>Товари відсутні в цій категорії</p>");return}const o=e.map(({_id:i,name:s,price:a,images:n,color:c})=>{const l=Array.isArray(c)&&c.length>0?c.map(u=>{const A=u.replace(/[^a-zA-Z0-9]/g,"");return`
                  <div class="color-checkbox">
                    <input type="checkbox" id="color-${i}-${A}" name="color-${i}" value="${u}" />
                    <label for="color-${i}-${A}" style="background-color: ${u};" title="${u}"></label>
                  </div>
                `}).join(""):"";return`
        <li class="furniture-item" data-id="${i}">
          <img class="furniture-img" src="${n[0]||""}" alt="${s}" />
          
          <h3 class="furniture-subtitle">${s}</h3>
          <div class="color-checkboxes">${l}</div>
          <p class="furniture-text">${a} грн</p>
          
          <button class="furniture-btn" type="button" data-id="${i}">Детальніше</button>
        </li>
      `}).join("");x.insertAdjacentHTML("beforeend",o)}function b(e=r.limit){const t=typeof r.totalAvailable=="number"&&r.totalAvailable>0?r.totalLoaded>=r.totalAvailable:!1,o=e<r.limit,i=t||o;E.classList.toggle("is-hidden",i),E.disabled=i}async function Ee(e){if(e===r.currentCategoryId)return;r.currentCategoryId=e,r.currentPage=1,r.totalLoaded=0,M.querySelectorAll(".category-item").forEach(i=>{i.classList.toggle("active",i.dataset.id===e)});const{furnitures:t,total:o}=await _({category:r.currentCategoryId,page:r.currentPage,limit:r.limit});r.totalAvailable=o||0,r.totalLoaded=t.length,q(t,!1),b()}M.addEventListener("click",e=>{const t=e.target.closest("li.category-item");t&&Ee(t.dataset.id)});E.addEventListener("click",async()=>{if(r.totalLoaded>=r.totalAvailable)return;r.currentPage+=1;const{furnitures:e,total:t}=await _({category:r.currentCategoryId,page:r.currentPage,limit:r.limit});r.totalAvailable=t??r.totalAvailable,r.totalLoaded+=e.length,q(e,!0),b(),r.totalLoaded>=r.totalAvailable&&p.info({message:"Це всі товари. Більше немає що підвантажити.",position:"topRight"})});x.addEventListener("click",e=>{const t=e.target.closest(".furniture-btn");if(!t)return;const o=t.dataset.id,i=r.lastLoadedFurnitures.find(s=>s._id===o);i?xe(i):p.error({message:"Товар не знайдено",position:"topRight"})});async function je(){r.categories=await we(),M.innerHTML=$e(r.categories,ke,r.currentCategoryId);const{furnitures:e,total:t}=await _({category:r.currentCategoryId,page:r.currentPage,limit:r.limit});r.totalAvailable=t,r.totalLoaded=e.length,q(e,!1),b(),r.totalLoaded>=r.totalAvailable?(b(),p.info({message:"Більше немає товарів у цій категорії!",position:"topRight"})):b()}je();document.addEventListener("change",e=>{e.target.matches('.color-checkbox input[type="checkbox"]')&&e.target.closest(".color-checkboxes").querySelectorAll('input[type="checkbox"]').forEach(o=>{o!==e.target&&(o.checked=!1)})});const Se=document.querySelector("#feedback-list");let $=null;async function Me(){try{S();const t=(await j.get("https://furniture-store.b.goit.study/api/feedbacks")).data.feedbacks;await _e(t),Ae(),v()}catch{v(),p.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}}async function _e(e){const t=e.map(({name:o,descr:i,rate:s})=>{const a=qe(s),n=Array.from({length:5},()=>'<i class="fa-solid fa-thumbs-up thumb-icon"></i>').join("");return`
   <div class="swiper-slide feedback-card">
        <div class="rate-feedback" data-rate="${a}">
          ${n}
        </div>
        <p class="text-feedback">${i}</p>
        <p class="name-user-feedback">${o}</p>
</div>
    `}).join("");Se.innerHTML=`
   <div class="swiper feedback-swiper">
    <div class="swiper-wrapper">
      ${t}
    </div>

  </div>
`,await new Promise(o=>requestAnimationFrame(o)),N()}function qe(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:e}function N(){document.querySelectorAll(".rate-feedback").forEach(t=>{const o=parseFloat(t.getAttribute("data-rate")),i=t.querySelectorAll(".thumb-icon");i.forEach(s=>{s.classList.remove("fill","half")}),i.forEach((s,a)=>{setTimeout(()=>{a<Math.floor(o)?s.classList.add("fill"):a===Math.floor(o)&&o%1!==0&&s.classList.add("half")},a*200)})})}function Ae(){$&&$.destroy(!0,!0),$=new D(".feedback-swiper",{modules:[H,V],spaceBetween:24,slidesPerView:1,slidesPerGroup:1,loop:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{768:{slidesPerView:2,slidesPerGroup:2},1440:{slidesPerView:3,slidesPerGroup:3}},on:{slideChange:()=>{N()}}})}Me();
//# sourceMappingURL=index.js.map
