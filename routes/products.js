import { Router } from 'express'
//import manager from "../dao/managers/productmanager";
import ProductManager from "../dao/mongomanagers/productManagerM.js";

//const productsFilePath = '/product.json';
//const manager1 = new ProductManager(__dirname + "/product.json");
const router = Router();
router.get('/api/products', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    res.json(products);
});

router.get('/api/products/:pid', (req, res) => {
    const pid = req.params.pid;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const product = products.find((p) => p.id === pid);
    if (product) {
    res.json(product);
    } else {
    res.status(404).json({ message: 'Not found' });
    }
});

router.post('/api/products', (req, res) => {
    const newProduct = req.body;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    newProduct.id = generateNewProductId(products);
    products.push(newProduct);
    fs.writeFileSync(productosFilePath, JSON.stringify(products, null, 2));
    res.json(newProduct);
});

router.put('/api/products/:pid', (req, res) => {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const index = products.findIndex((p) => p.id === pid);
    if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.json(products[index]);
    } else {
    res.status(404).json({ message: 'Not found' });
    } 
});

router.delete('/api/products/:pid', (req, res) => {
    const pid = req.params.pid;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const index = products.findIndex((p) => p.id === pid);
    if (index !== -1) {
    products.splice(index, 1);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.json({message: 'Deleted product'});
    } else {
    res.status(404).json({message: 'Not found'});
    }
});

export default router