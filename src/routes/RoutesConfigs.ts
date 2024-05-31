export const URLS = {
    storeURl: `stores`,
    productURL: `products`
}
export const getUrlProductList = (storeId: string | undefined) => {
    if(storeId){
    return `${URLS.storeURl}/${storeId}/${URLS.productURL}`;
    }
    return `${URLS.storeURl}/${storeId}`;
};

export const getUrlStoreList = () => {
    return `${URLS.storeURl}`;
};