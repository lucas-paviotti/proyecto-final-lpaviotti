import * as fs from 'fs';
import Producto from '../models/Producto.js';
import { HOST, isAdmin } from '../config/config.js';

export const addProducto = (req, res) => {
    if (!isAdmin) {
        res.status(401).send({ error : -1, descripcion: `ruta http://${HOST}/ método ${req.method} no autorizada`});
    }
    fs.promises.readFile(`./content/product.content.json`, 'utf-8').then(
        contenido => {
            const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
            const producto = new Producto(nombre, descripcion, codigo, foto, precio, stock);
            const data = JSON.parse(contenido);
            data.push(producto.getParsedObject());
            fs.promises.writeFile(`./content/product.content.json`, JSON.stringify(data, null, 4)).catch( error => { console.log(`Error al escribir archivo de productos: ${error}`) } );
            res.status(200).json(producto);
        }
    ).catch(
        error => {
            console.log(`Error al leer archivo de productos: ${error}`);
        }
    );
};

export const getProductos = (req, res) => {
    fs.promises.readFile(`./content/product.content.json`, 'utf-8').then(
        contenido => {
            const { id } = req.params;
            const data = JSON.parse(contenido);
            if (id) {
                const filteredArray = data.find(obj => obj.id == id);
                if (filteredArray) {
                    res.status(200).json(filteredArray);
                } else {
                    res.status(404).json({error: 'Producto no encontrado'})
                }
            } else {
                res.status(200).json(data);
            }
        }
    ).catch(
        error => {
            console.log(`Error al leer archivo de productos: ${error}`);
        }
    );
};

export const updateProducto = (req, res) => {
    fs.promises.readFile(`./content/product.content.json`, 'utf-8').then(
        contenido => {
            const { id } = req.params;
            const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
            const data = JSON.parse(contenido);
            const filteredArray = data.find(obj => obj.id == id);
            if (filteredArray) {
                filteredArray.nombre = nombre;
                filteredArray.descripcion = descripcion;
                filteredArray.codigo = codigo;
                filteredArray.foto = foto;
                filteredArray.precio = precio;
                filteredArray.stock = stock;
                fs.promises.writeFile(`./content/product.content.json`, JSON.stringify(data, null, 4)).catch( error => { console.log(`Error al escribir archivo de productos: ${error}`) } );
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

export const deleteProducto = (req, res) => {
    fs.promises.readFile(`./content/product.content.json`, 'utf-8').then(
        contenido => {
            const { id } = req.params;
            const data = JSON.parse(contenido);
            const filteredArray = data.find(obj => obj.id == id);
            if (filteredArray) {
                data.splice(data.indexOf(filteredArray), 1);
                fs.promises.writeFile(`./content/product.content.json`, JSON.stringify(data, null, 4)).catch( error => { console.log(`Error al escribir archivo de productos: ${error}`) } );
                res.status(200).json(data);
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