const productsDOM = document.querySelector('.content');

// getting all the products
class Products {
	async getProducts() {
		try {
			let result = await fetch('products.json');
			let data = await result.json();
			let products = data.items;
			products = products.map(item => {
				const { title, price } = item.fields;
				const { id } = item.sys;
				const image = item.fields.image.fields.file.url;
				return { title, price, id, image };
			});
			return products;
		} catch (error) {
			console.log(error);
		}
	}
}

// display products to the screen
class Screen {
	displayProduct(products) {
		let result = '';
		products.forEach(product => {
			result += `
				<!---start single product--->
				<div class="product-center">
					<img src="${product.image}" alt="product-" />
					<div></div>
					<span>
						<p>${product.title}</p>
						<p>£ ${product.price}</p>
					</span>
				</div>
				<!---end single product--->
	`;
		});
		productsDOM.innerHTML = result;
	}
}

// add data on local storage
class Storage {}

document,
	addEventListener('DOMContentLoaded', () => {
		const screen = new Screen();
		const products = new Products();

		// get all products
		products.getProducts().then(products => screen.displayProduct(products));
	});
