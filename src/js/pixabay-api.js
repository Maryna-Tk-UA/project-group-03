import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hideLoader, showLoader } from './loader';

const API_BASE = 'https://furniture-store.b.goit.study/api';
const endpoints = {
  category: '/categories',
  furniture: '/furnitures',
  order: '/orders',
};

export async function fetchCategories() {
  showLoader();
  try {
    const { data } = await axios.get(`${API_BASE}${endpoints.category}`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    iziToast.error({ message: 'Не вдалося отримати категорії', position: 'topRight' });
    return [];
  } finally {
    hideLoader();
  }
}

export async function fetchFurnitures({ page = 1, limit = 8, categoryId = '0' }) {
  showLoader();
  try {
    const params = { page, limit };
    if (categoryId !== '0') params.category = categoryId;

    const { data } = await axios.get(`${API_BASE}${endpoints.furniture}`, { params });

    const furnitures = Array.isArray(data.furnitures) ? data.furnitures : [];
    const total =
      Number(
        data.total ??
        data.totalItems ??
        data.totalCount ??
        data.totalFurnitures ??
        0
      ) || 0;

    return { furnitures, total };
  } catch (error) {
    iziToast.error({ message: 'Помилка отримання товарів', position: 'topRight' });
    return { furnitures: [], total: 0 };
  } finally {
    hideLoader();
  }
}