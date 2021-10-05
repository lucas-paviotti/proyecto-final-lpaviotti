import Carrito from '../models/Carrito.js';

const carrito = new Carrito();

export const getCarrito = (req, res) => {
    return res.status(200).json(carrito);
};

export const addCarrito = (req, res) => {
    return res.status(200).json(carrito);
};

export const deleteCarrito = (req, res) => {
    return res.status(200).json(carrito);
};