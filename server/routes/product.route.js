import { Router } from "express";
import { addProducto, getProductos, updateProducto, deleteProducto } from "../controllers/producto.controller.js";

const productRouter = Router();

productRouter.get('/listar/:id?', getProductos);
productRouter.post('/agregar', addProducto);
productRouter.put('/actualizar/:id', updateProducto);
productRouter.delete('/borrar/:id', deleteProducto);

export default productRouter;