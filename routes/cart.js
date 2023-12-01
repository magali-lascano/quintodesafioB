import { Router } from 'express';
//const fs = require('fs');
const router = Router();
const cartFilePath = '../json/carrito.json';
import cartManager  from "../dao/mongomanagers/cartManagerM.js";

//const carts = [];
const cartManager2 = new cartManager("/carrito.json");

router.post('/api/carts', (req, res) => {
    const newCart = req.body;
    newCart.id = generateNewCartId();
    fs.writeFileSync(cartFilePath, JSON.stringify(newCart, null, 2));
    res.json(newCart);
});

router.get('/api/carts/:cid', (req, res) => {
    const cid = req.params.cid;
    const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
    if (cart.id === cid) {
    res.json(cart.products);
    } else {
    res.status(404).json({ message: 'Carrito no existente' });
    }
});

router.post('/api/carts/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
    const productIndex = cart.products.findIndex((p) => p.product_id === pid);
    if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
        } else {
        cart.products.push({ id: pid, quantity: quantity });
    }
    fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));
    res.json(cart);
});

function NewProductId(products) {
    let mId = 0;
    for (const product of products) {
    if (product.id > mId) 
    {mId = product.id;}
    }
return mId + 1;
}

function generateNewCartId() {
    let mId = 0;
    const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
    if (cart && cart.id) {
    mId = parseInt(cart.id);
    }
    return (mId + 1).toString();
}

export default router