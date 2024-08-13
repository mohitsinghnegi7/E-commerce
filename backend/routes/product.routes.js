import { Router } from "express";
import { allProduct, singleProduct, uploadProduct } from "../controllers/product.controller.js";
import { authToken } from "../middleware/authToken.js";

const productRouter = Router()

productRouter.route('/upload').post(uploadProduct)
productRouter.route('/all-product').get(allProduct)
productRouter.route('/productDetail').post(singleProduct)

export default productRouter