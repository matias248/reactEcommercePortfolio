import { Router } from "express";


export const createStoreRouter = ({ StoreController,authMiddleware }) => {
    const StoreRouter = Router()
    const storeController = new StoreController();

    //to add auth 
    //StoreRouter.get('/',authMiddleware,StoreController.getAll)

    StoreRouter.get('/',storeController.getAll)
    StoreRouter.post('/', storeController.create)
    StoreRouter.get('/:id', storeController.getById)
    StoreRouter.delete('/:id', storeController.delete)
    StoreRouter.patch('/:id',storeController.update)

    return StoreRouter;
}