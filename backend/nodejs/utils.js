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
