import { imgArr } from "./img-for-furniture";
import { fetchCategories } from "./pixabay-api";
import { renderCategories } from "./render-functions";


async function init() {
    try {
const getCateg = await fetchCategories();
renderCategories(getCateg, imgArr);
} catch(error) {
    console.error(error)
}
}

init();