import axios from 'axios'
import { orderResponse } from '../types/response'
import { newOrder } from '../types/orderType'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Generic get request
 */
export const getAll = async () => {
	const res = await axios.get<orderResponse>(BASE_URL + '/orders')
	return res.data.data
}

/**
 * Generic get orders request
 */
export const getOrder = async (id: string) => {
	const res = await axios.get<orderResponse>(BASE_URL + `/orders/${id}`)
	return res.data.data
}

/**
 * Generic create order
 */
export const createOrder = async (orderData: newOrder) => {
	const res = await axios.post<orderResponse>(BASE_URL + '/orders', orderData)
	return res.data
}
