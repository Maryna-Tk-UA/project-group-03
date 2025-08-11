import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hideLoader, showLoader } from './loader';

const API_BASE = 'https://furniture-store.b.goit.study/api';

export async function getCategories() {
  showLoader();
  try {
    const res = await axios.get(`${API_BASE}/categories`);
    return res.data;
  } catch (error) {
    iziToast.error({
      message: 'Помилка отримання категорій',
      position: 'topRight',
    });
    return [];
  } finally {
    hideLoader();
  }
}

export async function getFurnitures({ category = '0', page = 1, limit = 8 }) {
  showLoader();
  try {
    const params = { page, limit };
    if (category !== '0') params.category = category;

    const res = await axios.get(`${API_BASE}/furnitures`, { params });
    return {
      furnitures: res.data.furnitures || [],
      total: res.data.totalItems || 0,
    };
  } catch (error) {
    iziToast.error({
      message: 'Помилка отримання меблів',
      position: 'topRight',
    });
    return { furnitures: [], total: 0 };
  } finally {
    hideLoader();
  }
}
