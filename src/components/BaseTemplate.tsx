import { Outlet, useNavigate } from "react-router-dom";
import { StoreDTO } from "../models/Store";
import { getUrlProductList, getUrlStoreList } from "../routes/RoutesConfigs";
import { useState } from "react";
import { NavigationPath } from "./navigationPath";
import { Header } from "./Header";
import { NavigationRouterInterface, NavigationRouter } from "../routes/NavigationRouter";
import { AppNames } from "../utils/constants";

interface BaseTemplateProps {
}

export interface PathData {
    storeName: string | undefined, productName: string | undefined,
    storeId: number | undefined, productId: number | undefined,
    inStores: boolean, inProducts: boolean
}

export interface ContextPathData {
    handlerPathData: (pathData: PathData) => void;
};


export const BaseTemplate = (props: BaseTemplateProps): React.JSX.Element => {

    const [pathData, setPathData] = useState<PathData>();
    const navigationRouter: NavigationRouterInterface = NavigationRouter();
    const currentRoute: AppNames | undefined = navigationRouter.currentRoute();

    const handlerPathData = (pathData: PathData) => {
        setPathData(pathData)
    }
    const resetPathData = () => {
        setPathData(undefined);
    }

    return <>
        <Header resetPathData={resetPathData} />
        <div>{pathData && currentRoute === AppNames.FORMS &&
            <NavigationPath pathData={pathData} />
        }
            <Outlet context={{ handlerPathData: handlerPathData } satisfies ContextPathData} />
        </div >
    </>;
}
