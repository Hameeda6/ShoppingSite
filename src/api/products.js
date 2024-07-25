import axios from 'axios';

export const fetchProducts = async () => {
    // const response = await axios.get('http://127.0.0.1:8001/api/products/');
    const response = await axios.get('http://44.211.249.149:8001/products/');
    return response.data;
};
