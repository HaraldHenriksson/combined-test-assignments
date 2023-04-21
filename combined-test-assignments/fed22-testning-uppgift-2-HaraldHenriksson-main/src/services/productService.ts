import axios from 'axios'
import { newProduct } from '../types/productType'
import { productResponse } from '../types/response'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Generic get request
 */
export const getAll = async () => {
	const res = await axios.get<productResponse>(BASE_URL + '/products')
	return res.data.data
}

/**
 * Generic get product request
 */
export const getProduct = async (id: string) => {
	const res = await axios.get<productResponse>(BASE_URL + `/products/${id}`)
	return res.data
}

/**
 * Generic create product
 */
export const createProduct = async (productData: newProduct) => {
	const res = await axios.post<productResponse>(BASE_URL + '/products', productData);
	return res.data
}
