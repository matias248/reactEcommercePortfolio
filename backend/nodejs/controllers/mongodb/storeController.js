import { StoreModel } from '../../models/StoreModel.js';
import { getNextSequentialId } from '../../models/StoreModel.js';
import { ProductModel } from '../../models/ProductModel.js';
import { takeOutIdAndV } from '../../utils.js';

export class StoreController {
    getAll = async (req, res) => {
        const textfilter = req.query.textfilter;
        let query = {};

        if (textfilter != undefined) {
            const regex = new RegExp(textfilter, 'i');
            query = {
                $or: [
                    { 'address.city': { $regex: regex } },
                    { name: { $regex: regex } },
                    { 'address.zipCode' : { $regex: regex } }
                ]
            };
        }
        StoreModel.find(query)
            .then(stores => {
                const storesToSend = stores.map((element) => { return takeOutIdAndV(element.toObject()) });
                res.status(200).json(storesToSend)
            })
            .catch(error => res.status(400).json({ error }));
    }


    getById = async (req, res) => {
        const { id } = req.params

        StoreModel.findOne({ id: id }, '-__v')
            .then(store => {
                if (store) {
                    const storeToSend = takeOutIdAndV(store.toObject());
                    res.status(200).json(storeToSend)
                }
                else {
                    res.status(404).json({ message: "Not found" })
                }
            })
            .catch(error => res.status(400).json({ error }));

    }

    create = async (req, res) => {

        try {
            // Generate a new custom ID for the store
            const newId = await getNextSequentialId();
            // Create an instance of the store model with the provided data and the generated ID
            const store = new StoreModel({
                ...req.body // Other data for the store
            });
            store.id = newId;


            // Save the store to the database
            await store.save();
            const storeToSend = takeOutIdAndV(store.toObject())
            res.status(200).json(storeToSend)
        } catch (error) {
            res.status(400).json({ error });
        }

    }


    delete = async (req, res) => {
        const { id } = req.params

        try {
            const store = await StoreModel.findOne({ id: +id });

            if (!store) {
                return res.status(404).json({ message: "store not found" });
            }
            await store.deleteOne();

            await ProductModel.deleteMany({ storeId: +id });
            const storeToSend = takeOutIdAndV(store.toObject());
            res.status(200).json(storeToSend);
        } catch (error) {
            res.status(500).json({ error: "Error deleting store", details: error });
        }


    }



    update = async (req, res) => {
        const { id } = req.params
        StoreModel.findOne({ id: id })
            .then(store => {
                if (!store) {
                    return res.status(404).json({ message: "Not found" });
                }
                Object.assign(store, req.body);

                return store.save()
                    .then(updatedstore => {
                        const storeToSend = takeOutIdAndV(store.toObject());
                        res.status(200).json(storeToSend);
                    })
                    .catch(error => {
                        res.status(500).json({ error: "Error updating store", details: error });
                    });
            })
            .catch(error => {
                res.status(400).json({ error: "Error finding store", details: error });
            });
    }
}