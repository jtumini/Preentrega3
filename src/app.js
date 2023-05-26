const express = require('express');
const ticketManager = require('./ticketManager');

const app = express();
const manager = new ticketManager('./Productos.json');  

app.get('/', (request, response) => {
    response.send('<h1>Hola Mundo!!!</h1><hr><div style="background-color: red">Soy un div</div>');
});

app.get('/products', async (request, response) => {
    const id = request.query.id;
        if (!id) {
            const products = await manager.getProduct();
            response.json(products);
        } else {    
            const product = await manager.getProductById(id);
            if (!product) return response.send({ error: 'El producto no existe' });
            response.send(product);
        }
    }
);

app.listen(8080, () => console.log('Servidor en funcionamiento en el puerto 8080'));

