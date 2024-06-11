import { createApp, startingApp } from "./app.js"

import { ProductController } from "./controllers/local/productController.js"
import { UserController } from './controllers/local/userController.js';
import { StoreController } from './controllers/local/storeController.js';

import { authMiddleware } from "./middlewares/authLocal.js"



export const LocalApp = () => createApp({ ProductController, UserController, authMiddleware, StoreController })
const app = LocalApp();
startingApp(app);

