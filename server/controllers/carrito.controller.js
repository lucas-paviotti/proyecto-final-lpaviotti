import * as fs from 'fs';
import Carrito from '../models/Carrito.js';

const carrito = JSON.parse(fs.readFileSync('./content/carrito.content.json', 'utf8'));

export const getCarrito = (req, res) => {
    const { id } = req.params;
    const productosCarrito = carrito.productos;

    if (!productosCarrito || productosCarrito.length == 0) {
        return res.status(404).json({error: 'No hay productos en el carrito'});
    }

    if (id) {
        const filteredArray = productosCarrito.find(obj => obj.id == id);
        if (filteredArray) {
            res.status(200).json(filteredArray);
        } else {
            res.status(404).json({error: 'Producto no encontrado'});
        }
    } else {
        res.status(200).json(productosCarrito);
    }
};

export const addCarrito = (req, res) => {
    fs.promises.readFile(`./content/producto.content.json`, 'utf-8').then(
        contenido => {
            const { id_producto } = req.params;
            const dataProductos = JSON.parse(contenido);
            const filteredArray = dataProductos.find(obj => obj.id == id_producto);
            const productosCarrito = carrito.productos;
            if (filteredArray) {
                if (!productosCarrito || productosCarrito.length == 0) {
                    const nuevoCarrito = new Carrito(filteredArray);
                    fs.promises.writeFile(`./content/carrito.content.json`, JSON.stringify(nuevoCarrito, null, 4)).catch( error => { console.log(`Error al escribir archivo de productos: ${error}`) } );
                    return res.status(200).json(nuevoCarrito.productos);
                }
                productosCarrito.push(filteredArray);
                fs.promises.writeFile(`./content/carrito.content.json`, JSON.stringify(carrito, null, 4)).catch( error => { console.log(`Error al escribir archivo de productos: ${error}`) } );
                res.status(200).json(filteredArray);
            } else {
                res.status(404).json({error: 'Producto no encontrado'})
            }
        }
    ).catch(
        error => {
            console.log(`Error al leer archivo de productos: ${error}`);
        }
    );
};

export const deleteCarrito = (req, res) => {
    fs.promises.readFile(`./content/producto.content.json`, 'utf-8').then(
        contenido => {
            const { id } = req.params;
            const dataProductos = JSON.parse(contenido);
            const filteredArray = dataProductos.find(obj => obj.id == id);
            const productosCarrito = carrito.productos;

            if (!productosCarrito || productosCarrito.length == 0) {
                return res.status(404).json({error: 'No hay productos en el carrito'});
            }

            if (filteredArray) {
                productosCarrito.splice(productosCarrito.indexOf(filteredArray), 1);
                fs.promises.writeFile(`./content/carrito.content.json`, JSON.stringify(carrito, null, 4)).catch( error => { console.log(`Error al escribir archivo de productos: ${error}`) } );
                res.status(200).json(filteredArray);
            } else {
                res.status(404).json({error: 'Producto no encontrado'})
            }
        }
    ).catch(
        error => {
            console.log(`Error al leer archivo de productos: ${error}`);
        }
    );
};