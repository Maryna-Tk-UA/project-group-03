import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hideLoader, showLoader } from './loader';

const API_BASE = 'https://furniture-store.b.goit.study/api';
const endpoints = {
    category: "/categories",
    furniture: "/furnitures",
    order: "/orders"
}

export async function fetchCategories() {
    showLoader();
    try {
      const res = await axios.get(`${API_BASE}${endpoints.category}`)
    //   console.log(res.data)
      return res.data;
    } catch(error) {
        throw error;
    } finally {
        hideLoader();
    }  
}




export async function fetchFurnitures({ page, limit, categoryId }) {
    showLoader();
    try {
      const params = { page, limit };
      
      const res = await axios.get(`${API_BASE}${endpoints.furniture}`, { params })
      console.log(res.data.furnitures);
      return res.data.furnitures || [];
    } catch(error) {
        throw error;
    } finally {
        hideLoader();
    }
}