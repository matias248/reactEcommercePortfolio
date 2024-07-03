import { ProductModel, inventoryStatusType } from '../../models/ProductModel.js';
import { getNextSequentialId } from '../../models/ProductModel.js';
import { StoreModel } from '../../models/StoreModel.js';
import { takeOutIdAndV } from '../../utils.js';
import { calculateTotalPages } from '../../utils.js';


export class ProductController {

    getAllPublic = async (req, res) => {
        try {
            const categories = req.query.categories ? req.query.categories.split(',') : [];
            const pageIndex = req.query.page ?? 1;
            const elementsPerPage = req.query.pagelength;

            const textfilter = req.query.textfilter;
            const storeid = req.query.storeid;

            let query = {};

            if (textfilter != undefined) {
                const regex = new RegExp(textfilter, 'i');
                query = {
                    $or: [
                        { description: { $regex: regex } },
                        { name: { $regex: regex } },
                    ]
                };
            }

            let optionsFind = {};
            let filter = { inventoryStatus: { $ne: inventoryStatusType.OUTOFSTOCK }, ...query };
            let products;
            let count = undefined;

            if (categories.length > 0) {
                filter.category = { $in: categories };
            }
            if (+storeid > 0) {
                filter.storeId = +storeid;
            }
            if (!isNaN(elementsPerPage) && !isNaN(pageIndex) && +elementsPerPage > 0 && +pageIndex > 0) {
                const skip = (pageIndex - 1) * elementsPerPage;
                optionsFind = { skip: skip, limit: +elementsPerPage }
                count = await ProductModel.countDocuments(filter);
            }
            products = await ProductModel.find(filter, null, optionsFind)
            if (count === undefined) {
                count = products.length;
            }
            const productsToSend = products.map((element) => { return takeOutIdAndV(element.toObject()) });
            return res.json({ products: productsToSend, totalPages: calculateTotalPages(count, !isNaN(elementsPerPage) ? elementsPerPage : count) });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getAll = async (req, res) => {
        try {
            const storeId = req.storeId;
            const categories = req.query.categories ? req.query.categories.split(',') : [];
            if (!storeId) {
                let products;
                if (categories.length > 0) {
                    products = await ProductModel.find({ category: { $in: categories } });
                }
                else {
                    products = await ProductModel.find({})
                }
                const productsToSend = products.map((element) => { return takeOutIdAndV(element.toObject()) });
                return res.json(productsToSend);
            }

            const store = await StoreModel.findOne({ id: storeId });
            if (!store) {
                return res.status(404).json({ message: "Store not found" });
            }

            let products;
            if (categories.length > 0) {
                products = await ProductModel.find({ storeId: +store.id, category: { $in: categories } });
            }
            else {
                products = await ProductModel.find({ storeId: +store.id })
            }
            const productsToSend = products.map((element) => { return takeOutIdAndV(element.toObject()) });
            if (req.query.storedata === "true") {
                return res.json({ store: store, products: productsToSend })
            }
            res.json(productsToSend);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getById = async (req, res) => {
        const { id } = req.params

        try {
            const storeId = req.storeId;
            if (!storeId) {
                const products = await ProductModel.find({ id: id }, { '__v': 0, '_id': 0 });
                return res.json(products[0]);
            }

            const store = await StoreModel.findOne({ id: storeId });
            if (!store) {
                return res.status(404).json({ message: "Store not found" });
            }

            const products = await ProductModel.find({ storeId: store.id, id: id }, { '__v': 0, '_id': 0 });
            if (req.query.storedata === "true") {
                return res.json({ store: store, product: products[0] })
            }
            if (products.length === 0) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.json(products[0]);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    }

    create = async (req, res) => {

        try {
            const storeId = req.storeId;
            if (!storeId) {
                return res.status(400).json({ message: "Missing storeId parameter" });
            }

            const store = await StoreModel.findOne({ id: storeId });
            if (!store) {
                return res.status(404).json({ message: "Store not found" });
            }

            // Generate a new custom ID for the product
            const newId = await getNextSequentialId();
            // Create an instance of the Product model with the provided data and the generated ID
            const product = new ProductModel({
                ...req.body // Other data for the product
            },);
            product.id = newId;
            product.storeId = store.id;
            product.storeName = store.name;
            const productToSend = takeOutIdAndV(product.toObject());


            // Save the product to the database
            await product.save();

            if (req.query.storedata === "true") {
                return res.json({ store: store, product: productToSend })
            }
            return res.status(201).json(productToSend)
        } catch (error) {
            res.status(400).json({ error });
        }

    }


    delete = async (req, res) => {
        const { id } = req.params

        try {
            const product = await ProductModel.findOne({ id: +id });

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            await product.deleteOne();
            const productToSend = takeOutIdAndV(product.toObject());
            res.status(200).json(productToSend);
        } catch (error) {
            res.status(500).json({ error: "Error deleting product", details: error });
        }


    }



    update = async (req, res) => {
        const { id } = req.params
        ProductModel.findOne({ id: +id })
            .then(product => {
                if (!product) {
                    return res.status(404).json({ message: "Not found" });
                }
                Object.assign(product, req.body);

                return product.save()
                    .then(updatedProduct => {
                        const productToSend = takeOutIdAndV(updatedProduct.toObject());

                        res.status(200).json(productToSend);
                    })
                    .catch(error => {
                        res.status(500).json({ error: "Error updating product", details: error });
                    });
            })
            .catch(error => {
                res.status(400).json({ error: "Error finding product", details: error });
            });
    }
}