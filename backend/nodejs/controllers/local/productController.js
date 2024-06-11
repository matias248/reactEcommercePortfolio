import { validatePartialProduct, validateProduct } from '../../models/ProductModel.js';
import { readJSON } from '../../utils.js';
import { getNextId } from '../../models/ProductModel.js';

const products = readJSON('./localData/products.json')
const stores = readJSON('./localData/stores.json')


export class ProductController {
    getAll = async (req, res) => {

        const storeId = req.storeId;
        const store = stores.find((element) => element.id === +storeId)
        if (!store) {
            return res.status(404).json({ message: 'Store not found' })
        }
        let response;
        response = products.filter((product) => product.storeId === +storeId);
        if (req.query.storedata === "true") {
            return res.json({ store: store, products: response })
        }
        return res.json(response);
    }


    getById = async (req, res) => {
        const { id } = req.params
        const storeId = req.storeId;
        const store = stores.find((element) => element.id === +storeId)
        if (!store) {
            return res.status(404).json({ message: 'Store not found' })
        }

        const product = products.filter((product) => { return product.storeId === +storeId && product.id === +id })
        if (product.length > 0) {
            if(req.query.storedata === "true"){
                return res.json({store:store,product:product[0]})
            }
            return res.json(product[0])
        }
        res.status(404).json({ message: 'Product not found' })
    }

    create = async (req, res) => {
        const storeId = req.storeId;

        const store = stores.find((element) => element.id === +storeId)
        if (!store) {
            return res.status(404).json({ message: 'Store not found' })
        }
        else {

            const newProduct = {
                ...req.body,
                id: getNextId(products),
                storeId: store.id,
                storeName: store.storeName
            }
            const result = validateProduct(newProduct)

            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) })
            }
            products.push(result.data)
            res.status(201).json(result.data)
        }
    }

    delete = async (req, res) => {
        const { id } = req.params
        const storeId = req.storeId;

        const store = stores.find((element) => element.id === +storeId)
        if (!store) {
            return res.status(404).json({ message: 'Store not found' })
        }
        else {
            const productIndex = products.findIndex(product => product.id === +id)
            if (productIndex === -1) return res.status(404).json({ message: 'Product not found' })
            products.splice(productIndex, 1)
            return res.json({ message: 'Product deleted' })
        }
    }

    update = async (req, res) => {
        const storeId = req.storeId;
        const store = stores.find((element) => element.id === +storeId)
        if (!store) {
            return res.status(404).json({ message: 'Store not found' })
        }
        else {
            const result = validatePartialProduct(req.body)
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) })
            }
            const { id } = req.params
            const productIndex = products.findIndex(product => product.id === +id)
            if (productIndex === -1) return res.status(404).json({ message: 'Product not found' })


            products[productIndex] = {
                ...products[productIndex],
                ...req.body,
            }
            return res.json(products[productIndex])
        }
    }
}
