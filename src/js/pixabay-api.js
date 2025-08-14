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
      return res.data;
      console.log(res.data)
    } catch(error) {
        console.log(error)
    } finally {
        hideLoader();
    }  
}