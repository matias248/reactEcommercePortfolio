import { useNavigate } from "react-router-dom";
import { getUrlProductList, getUrlStoreList } from "./RoutesConfigs";

export interface NavigationRouterInterface {
    goToProduct: (idProduct: number, storeId: number) => void;
    goToStore: (storeId: number) => void;
    goToTheListOfStores: () => void;
    goToTheListOfProducts: (storeId: number) => void;
    createNewProduct: (storeId: number) => void;
    createNewStore: () => void;
}

export const NavigationRouter = (): NavigationRouterInterface => {
    const navigate = useNavigate();

    const goToProduct = (idProduct: number, storeId: number) => {
        navigate("/" + getUrlProductList(storeId + "") + "/" + idProduct);
    };
    const goToStore = (storeId: number) => {
        navigate("/" + getUrlStoreList() + "/" + storeId);
    };
    const goToTheListOfStores = () => {
        navigate("/" + getUrlStoreList());
    };

    const goToTheListOfProducts = (storeId: number) => {
        navigate("/" + getUrlProductList(storeId + ""));
    };
    const createNewStore = () => {
        navigate("/" + getUrlStoreList() + "/new");
    };
    const createNewProduct = (storeId: number) => {
        navigate("/" + getUrlProductList(storeId + "") + "/new");
    };

    return {
        goToProduct,
        goToStore,
        goToTheListOfStores,
        goToTheListOfProducts,
        createNewStore,
        createNewProduct,
    }
}