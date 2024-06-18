import express, { json } from 'express';
import { corsMiddleware } from './middlewares/corsmiddleware.js';
import { createProductRouter } from './routes/productRoute.js';
import { createUserRouter } from './routes/userRoute.js';
import { createStoreRouter } from './routes/storeRoute.js';

import dotenv from 'dotenv';


export const createApp = ({ ProductController, UserController, authMiddleware, StoreController }) => {
    dotenv.config();
    const app = express();
    app.use(json());
    app.use(corsMiddleware(0));
    app.disable('x-powered-by');

    app.use('/stores/:storeId/products', (req, res, next) => {
        req.storeId=req.params.storeId;
        next();
    },createProductRouter({ ProductController, authMiddleware }))
    app.use('/products', createProductRouter({ ProductController, authMiddleware }))

    app.use('/stores', createStoreRouter({ StoreController, authMiddleware }))

    app.use('/auth', createUserRouter({ UserController }));


    return app;
}

export const startingApp = (app) => {
    const PORT = process.env.PORT ?? 3001
    app.listen(PORT, () => {
        console.log('server listening')
    })
    return app;
}