export type image = {
	large: string,
	thumbnail: string
}

export type newProduct = {
	name: string,
	description: string,
	price: number,
	images: image,
	stock_status: string,
	stock_quantity: number,
	on_sale?: boolean,
}

export type product = newProduct & {
	id: number
}
