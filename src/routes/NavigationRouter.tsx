import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { getUrlProductList, getUrlStoreList } from "./RoutesConfigs";
import { getCurrentApp } from "../utils/sharedComponents/utilsFunctions";
import { AppNames } from "../utils/constants";

export interface NavigationRouterInterface {
    goToFappProduct: (idProduct: number, storeId: number) => void;
    goToFappStore: (storeId: number) => void;
    goToFappListOfStores: () => void;
    goToFappListOfProducts: (storeId: number) => void;
    goToFappCreationProduct: (storeId: number) => void;
    goToFappCreationStore: () => void;
    goToFiapp: () => void;
    goToShapp: () => void;


    currentRoute: () => AppNames | undefined;
}

export const NavigationRouter = (): NavigationRouterInterface => {
    const navigate = useNavigate();
    let location = useLocation();

    const goToFappProduct = (idProduct: number, storeId: number) => {
        navigate("/" + getUrlProductList(storeId + "") + "/" + idProduct);
    };
    const goToFappStore = (storeId: number) => {
        navigate("/" + getUrlStoreList() + "/" + storeId);
    };
    const goToFappListOfStores = () => {
        navigate("/" + getUrlStoreList());
    };

    const goToFappListOfProducts = (storeId: number) => {
        navigate("/" + getUrlProductList(storeId + ""));
    };
    const goToFappCreationStore = () => {
        navigate("/" + getUrlStoreList() + "/new");
    };
    const goToFappCreationProduct = (storeId: number) => {
        navigate("/" + getUrlProductList(storeId + "") + "/new");
    };

    const goToFiapp = () => {
        navigate("/finance");
    };
    const goToShapp = () => {
        navigate("/shop");
    };

    const currentRoute = () => {
        return getCurrentApp(location.pathname)
    };

    return {
        goToFappProduct,
        goToFappStore,
        goToFappListOfStores,
        goToFappListOfProducts,
        goToFappCreationStore,
        goToFappCreationProduct,
        currentRoute,
        goToFiapp,
        goToShapp,
    }
}