const fs = require('fs');


class ticketManager {

    constructor(path){
        this.path = path
        this.format = 'utf-8'
    }

    addProduct = async( title, description, price, thumbnail, code, stock) => {
        const product  = await this.getProduct()
        const id = product.length === 0 ? 1 : product[product.length-1].id + 1
        product.push({id, title, description, price, thumbnail, code, stock})
        await fs.promises.writeFile(this.path, JSON.stringify(product, null, '\t'))
        return id    }

    getProduct = async () => {  
        return JSON.parse(await fs.promises.readFile(this.path, this.format) )
    }

    getProductById = async (id) => {
        const products = await this.getProduct();
        const product = products.find((item) => item.id === id);
        return product ? product : 'Not Found';
    }

    updateProduct = async (id, campo, valor) => {
        const products = await this.getProduct()
        const productoAModificar = products.find(item => item.id === id)
    
        if (!productoAModificar) {
            console.log(`El producto con el id ${id} no existe`)
            return
        }
    
        productoAModificar[campo] = valor
    
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
    
        console.log(`El producto con el id ${id} fue modificado correctamente`)
    }

    deleteProduct = async (id) => {
        const products = await this.getProduct();
        const updatedProducts = products.filter((item) => item.id !== id);
        return await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, '\t'));
    }


}

export default ticketManager;

const manager = new ticketManager ('./Productos.json')

// Agregar un producto
await manager.addProduct( 'botin kappa', 'botin kappa color verde', '$1500', 'asd', '2389234', '25');

// Obtener un producto por id
const product = await manager.getProductById('2');
console.log(product);

// Actualizacion de un producto
await manager.updateProduct('2', 'title', 'botin adidassssss');
const updatedProduct = await manager.getProductById('2');
console.log(updatedProduct);

// Eliminar un producto
await manager.deleteProduct('31');
const eliminarProduct = await manager.getProductById('31');
console.log(eliminarProduct); // null porque el producto ya no existe




