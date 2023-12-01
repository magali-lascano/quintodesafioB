import fs from 'fs';

export default class ProductsManager {
    constructor(path) {
        this.path = path
        this.currentId = 0
        this.products = []
    }
    
    async addProduct(product) {
        this.currentId += 1
        thisProducts.push(newProduct)
        await fs.promises.writeFile(this.file, JSON.stringify(currentId, null))
        product.id = this.currentId
    }
    async readProducts () {
        let answ = await fs.readFile(this.file)
        return JSON.parse(answ)
    }
    async getProducts () {
        let answ2 = await fs.promises.readProducts()
        return console.log(answ2)
    }

    async getProductById(id) {
        let answ3 = await fs.readProducts()
        if(!answ3.find(product => product.id === id)){
            console.log("Lo sentimos, no se encuentra el producto.")
        } else{
            console.log(answ3.find(product => product.id === id));
        }
    }


    async deleteProduct(id) {
        let answ3 = await this.readProducts()
        let productFilter = answ3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
    }
    
    async updateProduct(id) {
        await this.deleteProduct(id);
        let firstProduct = await this.readProducts()
        let modifiedProduct = [{ ...producto, id }, ...firstProduct];
        await fs.writeFile(this.patch, JSON.stringify(modifiedProduct));
    }

}

//const manager = new ProductManager('../public/product.json')