import  cartModel from "../models/cartModel.js"
import ProductManager from "./productManagerM.js"

const pm = new ProductManager()

class cartManager {

    getCarts = async () => {
        try {
            const carts = await cartModel.find();
            return carts;
        } catch (error) {
            console.error('Error al obtener el carrito:', error.message);
            return [];
        }
    };

    getCartById = async (cartId) => {
        try {
            const cart = await cartModel.findById(cartId);
            return cart;
        } catch (error) {
            console.error('Error al obtener el carrito por ID:', error.message);
            return error;
        }
    };

    addCart = async (products) => {
        try {
            let cartData = {};
            if (products && products.length > 0) {
                cartData.products = products;
            }

            const cart = await cartModel.create(cartData);
            return cart;
        } catch (error) {
            console.error('Error al crear el carrito:', error.message);
            return error;
        }
    };

    addProductInCart = async (cid, obj) => {
        try {
            const filter = { _id: cid, "products._id": obj._id };
            const cart = await cartModel.findById(cid);
            const findProduct = cart.products.some((product) => product._id.toString() === obj._id);

            if (findProduct) {
                const update = { $inc: { "products.$.quantity": obj.quantity } };
                await cartModel.updateOne(filter, update);
            } else {
                const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
                await cartModel.updateOne({ _id: cid }, update);
            }

            return await cartModel.findById(cid);
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error.message);
            return error;
        }
    };


};

export default cartManager;