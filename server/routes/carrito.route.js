import { Router } from "express";
import { getCarrito, addCarrito, deleteCarrito } from "../controllers/carrito.controller.js";

const carritoRouter = Router();

carritoRouter.get('/listar/:id?', getCarrito);
carritoRouter.get('/agregar/:id_producto', addCarrito);
carritoRouter.get('/borrar/:id', deleteCarrito);

export default carritoRouter;