import { describe, test, expect, afterEach, beforeAll, afterAll } from 'vitest'
import { server } from '../mocks/server'
import * as productAPI from '../services/productService'
import { newProduct } from '../types/productType'

// Boot API mocking
beforeAll(() => {
	server.listen()
	console.log('Request:')
})

// Reset handlers
afterEach(() => {
	server.resetHandlers()
})

// Clean up after ourselves
afterAll(() => {
	server.close()
})

const newProductData: newProduct = {
	"name": "Solo: A Star Wars Story",
	"description": "<p>A standalone film set before the events of A New Hope, it follows the backstory of the character Han Solo.</p>",
	"price": 230,
	"images": {
		"large": "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
		"thumbnail": "https://image.jpg"
	},
	"stock_status": "instock",
	"stock_quantity": 40,
	"on_sale": false
}

describe('test for products', () => {

	test('should get all products', async () => {
		const products = await productAPI.getAll()
		console.log(products)

		expect(Array.isArray(products)).toBe(true)
		expect(products.length).toBeGreaterThanOrEqual(0)

		if (products) {
			expect(products[0]).toMatchObject({
				id: expect.any(Number),
				name: expect.any(String),
				description: expect.any(String),
				price: expect.any(Number),
				images: expect.objectContaining({
					large: expect.any(String),
					thumbnail: expect.any(String),
				}),
				stock_status: expect.any(String),
				stock_quantity: expect.any(Number),
				on_sale: expect.any(Boolean)
			})
		}

	}, 10000)

	test('should create a new product', async () => {
		const response = await productAPI.createProduct(newProductData)
		const product = response.data

		expect(product).toMatchObject({
			id: expect.any(Number),
			...newProductData
		})

		const allProducts = await productAPI.getAll()
		expect(allProducts).toContainEqual(product)
	}, 10000)

	test('should get the created product', async () => {
		const createdProduct = await productAPI.createProduct(newProductData)

		const fetchedProduct = await productAPI.getAll()

		expect(fetchedProduct).toContainEqual(createdProduct.data)

		const product = createdProduct.data
		expect(product).toMatchObject({
			id: expect.any(Number),
			name: expect.any(String),
			description: expect.any(String),
			price: expect.any(Number),
			images: expect.objectContaining({
				large: expect.any(String),
				thumbnail: expect.any(String),
			}),
			stock_status: expect.any(String),
			stock_quantity: expect.any(Number),
			on_sale: expect.any(Boolean)
		})
	}, 10000)
})
