// src/services/api.js
import axios from 'axios';

// const API_URL = 'http://localhost:8001/api';
const API_URL = 'http://44.211.249.149:8001/';


export const getProducts = () => {
    return axios.get(`${API_URL}/products/`);
};

export const getCartItems = () => {
    return axios.get(`${API_URL}/cart-items/`);
};

export const addCartItem = (cartItem) => {
    return axios.post(`${API_URL}/cart-items/`, cartItem);
};

export const updateCartItem = (id, cartItem) => {
    return axios.put(`${API_URL}/cart-items/${id}/`, cartItem);
};

export const deleteCartItem = (id) => {
    return axios.delete(`${API_URL}/cart-items/${id}/`);
};
