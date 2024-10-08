import { inventoryStatusType, validatePartialProduct, validateProduct } from '../../models/ProductModel.js';
import { calculateTotalPages, readJSON, getPaginatedItems, productAccordingToTheFilter } from '../../utils.js';
import { getNextId } from '../../models/ProductModel.js';
import { stores, products } from '../../localData/exportsData.js'

export class ProductController {

    getAllPublic = async (req, res) => {
        try {
            const categories = req.query.categories ? req.query.categories.split(',') : [];
            const pageIndex = req.query.page ?? 1;
            const elementsPerPage = req.query.pagelength ?? products.length;
            const textfilter = req.query.textfilter ?? "";
            const storeid = req.query.storeid ;

            let productsfiltered = products.filter((product) => {
                return (categories.length == 0 || categories.includes(product.category)) &&
                    inventoryStatusType.OUTOFSTOCK != product.inventoryStatus
                    && productAccordingToTheFilter(product, textfilter, storeid)

            });

            if (+elementsPerPage > 0 && +pageIndex > 0) {
                let productsfilteredPaged = getPaginatedItems(productsfiltered, +pageIndex - 1, +elementsPerPage)
                return res.json({ products: productsfilteredPaged, totalPages: calculateTotalPages(productsfiltered.length, elementsPerPage) });
            }
            res.json({ products: productsfiltered, totalPages: 1 });
        }
        catch (error) {
            console.log(error)
        }
    }

    getAll = async (req, res) => {
        try {
            const categories = req.query.categories ? req.query.categories.split(',') : [];

            const storeId = req.storeId;
            let response = products;
            if (categories.length > 0) {
                response = response.filter((product) => categories.includes(product.category));
            }
            if (storeId != undefined) {
                const store = stores.find((element) => element.id === +storeId)
                if (!store) {
                    return res.status(404).json({ message: 'Store not found' })
                }
                response = response.filter((product) => product.storeId === +storeId);
                if (req.query.storedata === "true") {
                    return res.json({ store: store, products: response })
                }
                return res.json(response);
            }
            res.json(response);
        }
        catch (error) {
            console.log(error)
        }
    }

    getById = async (req, res) => {
        const { id } = req.params
        const storeId = req.storeId;

        if (storeId != undefined) {
            const store = stores.find((element) => element.id === +storeId)
            if (!store) {
                return res.status(404).json({ message: 'Store not found' })
            }
            const product = products.filter((product) => { return product.storeId === +storeId && product.id === +id })
            if (product.length > 0) {
                if (req.query.storedata === "true") {
                    return res.json({ store: store, product: product[0] })
                }
                return res.json(product[0])
            }
            return res.status(404).json({ message: 'Product not found' })
        }
        else {
            const product = products.filter((product) => { return product.id === +id })
            if (product.length > 0) {
                return res.json(product[0])
            }
            return res.status(404).json({ message: 'Product not found' })
        }

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
