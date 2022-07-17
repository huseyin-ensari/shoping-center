import axios, { URL } from './serviceConfig';
import { AxiosResponse } from 'axios';
import { Category } from '../types/categoryType';

export function getCategories(): Promise<AxiosResponse<Category[]>> {
    return axios.get(URL.categories);
}
