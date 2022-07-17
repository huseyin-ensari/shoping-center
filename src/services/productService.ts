import axios, { URL } from './serviceConfig';
import { AxiosResponse } from 'axios';
import { Product } from '../types/productType';

export function getProducts(): Promise<AxiosResponse<Product[]>> {
    return axios.get(URL.products);
}

export function getProductById(id: string): Promise<AxiosResponse<Product>> {
    return axios.get(`${URL.products}/${id}`);
}

export function addProduct(newProduct: Product): Promise<AxiosResponse<Product>> {
    return axios.post(URL.products, newProduct);
}
