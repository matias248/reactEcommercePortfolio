import { createApp, startingApp } from "./app.js"

import { ProductController } from "./controllers/mongodb/productController.js"
import { connectionDB } from "./mongooseinitDB.js"

import { UserController } from './controllers/mongodb/userController.js';
import { authMiddleware } from "./middlewares/auth.js"
import { StoreController } from './controllers/mongodb/storeController.js';


const app = createApp({ ProductController, UserController, authMiddleware, StoreController })
startingApp(app);
connectionDB();

