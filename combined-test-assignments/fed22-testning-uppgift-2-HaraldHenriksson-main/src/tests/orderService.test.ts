import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { server } from '../mocks/server'
import * as orderAPI from '../services/orderService'
import { newOrder } from '../types/orderType'

// Boot API mocking
beforeAll(() => {
	server.listen()
})

// Reset handlers
afterEach(() => {
	server.resetHandlers()
})

// Clean up after ourselves
afterAll(() => {
	server.close()
})

const newOrderData: newOrder = {
	"customer_first_name": "Johan",
	"customer_last_name": "Nordström",
	"customer_address": "Drottninggatan 4B",
	"customer_postcode": "224 79",
	"customer_city": "Malmö",
	"customer_email": "jn@thehiveresistance.com",
	"order_total": 52,
	"order_items": [
		{
			"product_id": 1,
			"qty": 3,
			"item_price": 8,
			"item_total": 24
		},
		{
			"product_id": 2,
			"qty": 4,
			"item_price": 2,
			"item_total": 28
		}
	]
}

describe('tests for orders', () => {

	test('should get all orders', async () => {
		const orders = await orderAPI.getAll()

		expect(Array.isArray(orders)).toBe(true)
		expect(orders.length).toBeGreaterThanOrEqual(0)

		if (orders) {
			expect(orders[0]).toMatchObject({
				id: expect.any(Number),
				customer_first_name: expect.any(String),
				customer_last_name: expect.any(String),
				customer_address: expect.any(String),
				customer_postcode: expect.any(String),
				customer_city: expect.any(String),
				customer_email: expect.any(String),
				order_total: expect.any(Number)

			})
		}

	}),

		test('should create a order', async () => {
			const response = await orderAPI.createOrder(newOrderData)
			const order = response.data

			expect(order).toMatchObject({
				id: expect.any(Number),
				...newOrderData
			})

			// setTimeout(async () => {
			// 	const allOrders = await orderAPI.getAll()
			// 	expect(allOrders).toContainEqual(order)
			// }, 5000)

			test('shoudl check if the created order exists in the database', async () => {
				const allOrders = await orderAPI.getAll()
				expect(allOrders).toContainEqual(order)
			})

		})

	test('should get the created order', async () => {
		const response = await orderAPI.createOrder(newOrderData)
		const order = response.data


		const allOrders = await orderAPI.getAll()
		const fetchedOrder = await allOrders.find((order: any) => order.id === order.id)

		test('should check if the created order exists in the database', () => {
			expect(fetchedOrder).toEqual(order)
		})

	})
})
