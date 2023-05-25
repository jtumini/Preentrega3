import express from 'express';
import ticketManager from './ticketManager';

const app = express();
const manager = new ticketManager('./Productos.json');  

app.get('/', (req, res) => {
res.send('<h1>Hola Mundo!!!</h1><hr><div style="background-color: red">Soy un div</div>');
});

app.get('/products', async (req, res) => {
const id = req.query.id;
if (!id) {
    const products = await manager.getProduct();
    res.json(products);
} else {    
    const product = await manager.getProductById(id);
    if (!product) return res.send({ error: 'El producto no existe' });
    res.send(product);
}
});

app.listen(8080, () => console.log('Servidor en funcionamiento en el puerto 8080'));

