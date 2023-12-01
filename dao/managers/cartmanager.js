import fs from "fs";

export class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        if (fs.existsSync(this.path)) {
            const cartsFile = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(cartsFile);
        } else {
            return [];
        }
    }

    async getCart(id) {
        const cartsFile = await this.getCarts();
        const cart = cartsFile.find((cart) => cart.id === id);
        if (cart) {
            return cart;
        } else {
            return null;
        }
    }

    async createCart() {
        const cartsFile = await this.getCarts();
        const newCart = {
            id: this.#idGenerator(cartsFile),
            products: [],
        };
        cartsFile.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
        return newCart;
    }

    async addProductToCart(cid, pid) {
        const cart = await this.getCart(cid);
        if (!cart) return "Carrito no existente";
        if (pid <= 0) {
            return "Product ID Invalido";
        } else {
            const productIndex = cart.products.findIndex((p) => p.product === pid);
            if (productIndex === -1) {
                cart.products.push({ product: pid, quantity: 1 });
            } else {
                cart.products[productIndex].quantity++;
            }
        }

        const cartsFile = await this.getCarts();
        const cartIndex = cartsFile.findIndex((c) => c.id === cid);
        cartsFile.splice(cartIndex, 1, cart);
        await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));

        return "Producto agregado";
    }
	#idGenerator = (carts) => {
        let id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;
        return id;
    };
}
