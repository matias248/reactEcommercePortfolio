import { validatePartialStore, validateStore } from '../../models/StoreModel.js';
import { filterStores } from '../../utils.js';
import { stores, products } from '../../localData/exportsData.js'

export class StoreController {
    getAll = async (req, res) => {
        const textfilter = req.query.textfilter;
        let response;
        if (textfilter != undefined && textfilter != "") {
            response = filterStores(stores, textfilter)
        }
        else {
            response = stores;
        }

        return res.json(response);
    }

    getById = async (req, res) => {
        const { id } = req.params
        const store = stores.find(store => store.id === +id)
        if (store) return res.json(store)
        res.status(404).json({ message: 'store not found' })
    }

    create = async (req, res) => {
        const newstore = {
            ...req.body,
            id: stores.length + 1
        }
        const result = validateStore(newstore)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        stores.push(result.data)
        res.status(201).json(result.data)
    }

    delete = async (req, res) => {
        const { id } = req.params
        const storeIndex = stores.findIndex(store => store.id === +id)
        if (storeIndex === -1) return res.status(404).json({ message: 'store not found' })
        stores.splice(storeIndex, 1);
        for (let i = products.length - 1; i >= 0; i--) {
            if (products[i].storeId === +id) {
                products.splice(i, 1);
            }
        }
        return res.json({ message: 'store deleted' })
    }

    update = async (req, res) => {
        const result = validatePartialStore(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const { id } = req.params
        const storeIndex = stores.findIndex(store => store.id === +id)
        if (storeIndex === -1) return res.status(404).json({ message: 'store not found' })

        stores[storeIndex] = {
            ...stores[storeIndex],
            ...req.body,
        }

        return res.json(stores[storeIndex])

    }
}
