import * as fs from 'fs';
import Producto from '../models/Producto.js';
import { HOST, isAdmin } from '../config/config.js';

const productos = JSON.parse(fs.readFileSync('./content/producto.content.json', 'utf8'));

export const addProducto = (req, res) => {
    if (isAdmin == 'false') {
        return res.status(401).json({ error : -1, descripcion: `ruta http://${HOST}/ método ${req.method} no autorizado`});
    }

    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const producto = new Producto(nombre, descripcion, codigo, foto, precio, stock);
    productos.push(producto.getParsedObject());
    fs.promises.writeFile(`./content/producto.content.json`, JSON.stringify(productos, null, 4)).catch( error => { console.log(`Error al escribir archivo de productos: ${error}`) } );
    res.status(200).json(producto);
};

export const getProductos = (req, res) => {
    const { id } = req.params;
    if (id) {
        const filteredArray = productos.find(obj => obj.id == id);
        if (filteredArray) {
            res.status(200).json(filteredArray);
        } else {
            res.status(404).json({error: 'Producto no encontrado'})
        }
    } else {
        res.status(200).json(productos);
    }
};

export const updateProducto = (req, res) => {
    if (isAdmin == 'false') {
        return res.status(401).json({ error : -1, descripcion: `ruta http://${HOST}/ método ${req.method} no autorizado`});
    }

    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const filteredArray = productos.find(obj => obj.id == id);
    if (filteredArray) {
        filteredArray.nombre = nombre;
        filteredArray.descripcion = descripcion;
        filteredArray.codigo = codigo;
        filteredArray.foto = foto;
        filteredArray.precio = precio;
        filteredArray.stock = stock;
        fs.promises.writeFile(`./content/producto.content.json`, JSON.stringify(productos, null, 4)).catch( error => { console.log(`Error al escribir archivo de productos: ${error}`) } );
        res.status(200).json(filteredArray);
    } else {
        res.status(404).json({error: 'Producto no encontrado'})
    }
};

export const deleteProducto = (req, res) => {
    if (isAdmin == 'false') {
        return res.status(401).json({ error : -1, descripcion: `ruta http://${HOST}/ método ${req.method} no autorizado`});
    }

    const { id } = req.params;
    const filteredArray = productos.find(obj => obj.id == id);
    if (filteredArray) {
        productos.splice(productos.indexOf(filteredArray), 1);
        fs.promises.writeFile(`./content/producto.content.json`, JSON.stringify(productos, null, 4)).catch( error => { console.log(`Error al escribir archivo de productos: ${error}`) } );
        res.status(200).json(productos);
    } else {
        res.status(404).json({error: 'Producto no encontrado'})
    }
};