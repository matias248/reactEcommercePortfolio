import { Router } from "express";


export const createProductRouter = ({ ProductController,authMiddleware }) => {
    const productRouter = Router()
    const productController = new ProductController();

    //to add auth 
    //productRouter.get('/',authMiddleware,productController.getAll)

    productRouter.get('/',productController.getAll)

    productRouter.post('/', productController.create)
    productRouter.get('/:id', productController.getById)
    productRouter.delete('/:id', productController.delete)
    productRouter.patch('/:id',productController.update)

    return productRouter;
}