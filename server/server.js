import express from 'express';
import productRouter from './routes/product.route.js';
import carritoRouter from './routes/carrito.route.js';
import { PORT, envType } from './config/config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/productos', productRouter);
app.use('/carrito', carritoRouter);

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));

/*
OBJETO PARA PRUEBA:
{
    "nombre": "Juego de mesa Carcassonne",
    "descripcion": "Carcassonne es un juego de mesa de estilo alemán, diseñado por Klaus-Jürgen Wrede y publicado en 2000 por Hans im Glück en alemán y por Devir en castellano.",
    "codigo": "JUE-04",
    "foto": "https://http2.mlstatic.com/D_NQ_NP_824823-MLA45578263264_042021-O.webp",
    "precio": 5840,
    "stock": 3
}
*/