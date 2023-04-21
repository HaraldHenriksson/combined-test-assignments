import { rest } from 'msw'
import { order } from '../types/orderType';
import { product } from '../types/productType'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const dummyProduct: product[] = [{
	id: 1,
	name: "Solo: A Star Wars Story",
	description: "<p>A standalone film set before the events of A New Hope, it follows the backstory of the character Han Solo.</p>",
	price: 230,
	images: {
		large: "https://image.jpg",
		thumbnail: "https://image.jpg"
	},
	stock_status: "instock",
	stock_quantity: 40,
	on_sale: false

},
{
	id: 2,
	name: "Solo: A Star Wars Story",
	description: "<p>A standalone film set before the events of A New Hope, it follows the backstory of the character Han Solo.</p>",
	price: 230,
	images: {
		large: "https://image.jpg",
		thumbnail: "https://image.jpg"
	},
	stock_status: "instock",
	stock_quantity: 40,
	on_sale: false

}
]

const dummyOrder: order[] = [{
	id: 1,
	customer_first_name: "Stefan",
	customer_last_name: "Stefansson",
	customer_address: "Drottninggatan 4B",
	customer_postcode: "224 79",
	customer_city: "Malmö",
	customer_email: "jn@thehiveresistance.com",
	order_total: 52,
	order_items: [
		{
			product_id: 1,
			qty: 3,
			item_price: 8,
			item_total: 24,
		},
		{
			product_id: 2,
			qty: 4,
			item_price: 2,
			item_total: 28,
		},
	],
}, {
	id: 2,
	customer_first_name: "Ulf",
	customer_last_name: "Ulfsson",
	customer_address: "Drottninggatan 4B",
	customer_postcode: "224 79",
	customer_city: "Malmö",
	customer_email: "jn@thehiveresistance.com",
	order_total: 52,
	order_items: [
		{
			product_id: 1,
			qty: 3,
			item_price: 8,
			item_total: 24,
		},
		{
			product_id: 2,
			qty: 4,
			item_price: 2,
			item_total: 28,
		},
	],
}]

export const handlers = [

	// Mock get all products
	// GET http://localhost:3000/products
	rest.get(`${BASE_URL}/products`, (_req, res, ctx) => {

		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				data: dummyProduct
			}),
		)
	}),

	// Mock create a new product
	// POST http://localhost:3000/products
	rest.post(`${BASE_URL}/products`, async (req, res, ctx) => {
		const payload = await req.json<product>()
		const id = Math.max(0, ...dummyProduct.map(p => p.id)) + 1

		const newProduct: product = {
			...payload,
			id: id,
		}

		dummyProduct.push(newProduct)

		return res(
			ctx.status(201),
			ctx.json({
				status: "sucsess",
				data: newProduct
			})
		)
	}),

	// Mock get the created product
	//GET http://localhost:3000/products/:Id
	rest.get(`${BASE_URL}/products/:id`, (req, res, ctx) => {
		const productId = Number(req.params.productId)

		const product = dummyProduct.find(product => product.id === productId)

		if (!product) {
			return res(
				ctx.status(404),
				ctx.json({})
			)
		}

		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				data: product
			})
		)
	}),

	// Mock get all orders
	//GET http://localhost:3000/orders
	rest.get(`${BASE_URL}/orders`, (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				data: dummyOrder
			})
		)
	}),

	// Mock create a new order
	//POST http://localhost:3000/orders
	rest.post(`${BASE_URL}/orders`, async (req, res, ctx) => {
		const payload = await req.json<order>()
		const id = Math.max(0, ...dummyOrder.map(p => p.id)) + 1

		const order: order = {
			...payload,
			id: id,
		}

		dummyOrder.push(order)

		return res(
			ctx.status(201),
			ctx.json({
				status: "success",
				data: order
			})
		)
	}),

	// Mock can get the created order
	//GET http://localhost:3000/orders/:Id
	rest.get(`${BASE_URL}/orders/:id`, (req, res, ctx) => {
		const orderId = Number(req.params.orderId)

		const order = dummyOrder.find(order => order.id === orderId)

		if (!order) {
			return res(
				ctx.status(404),
				ctx.json({})
			)
		}

		return res(
			ctx.status(200),
			ctx.json({
				status: "sucess",
				data: order
			})
		)
	})
]
