import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)

export const takeOutIdAndV = (object) => {
    const newObject = {};
    for (let key in object) {
        if (key !== '_id' && key !== '__v') {
            newObject[key] = object[key];
        }
    }
    return newObject;
}

export function getPaginatedItems(array, pageIndex, itemsPerPage) {
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = +startIndex + (+itemsPerPage);
    return array.slice(startIndex, endIndex);
}

export function calculateTotalPages(totalItems, itemsPerPage) {
    if (itemsPerPage <= 0) {
        return Math.ceil(totalItems / 10);
    }
    return Math.ceil(totalItems / itemsPerPage);
}

export function filterStores(stores, text) {
    const textLower = text.toLowerCase();
    return stores.filter(store =>
        store.name.toLowerCase().includes(textLower) ||
        store.address.city.toLowerCase().includes(textLower) ||
        store.address.zipCode.includes(textLower)
    );
}

export function productAccordingToTheFilter(product, text, storeId) {
    const textLower = text ? text.toLowerCase(): "";
    return (textLower === "" || product.name.toLowerCase().includes(textLower) || product.description.toLowerCase().includes(textLower)) && (product.storeId === +storeId || storeId == undefined);

}