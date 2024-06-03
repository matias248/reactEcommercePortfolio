import { Outlet, useNavigate } from "react-router-dom";
import { StoreDTO } from "../models/Store";
import { getUrlProductList, getUrlStoreList } from "../routes/RoutesConfigs";
import { useState } from "react";
import { NavigationPath } from "./navigationPath";
import { Header } from "./Header";

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

    const handlerPathData = (pathData: PathData) => {
        setPathData(pathData)
    }

    return <>
        <Header />

        <div>{pathData &&
            <NavigationPath pathData={pathData} />
        }
            <Outlet context={{ handlerPathData: handlerPathData } satisfies ContextPathData} />
        </div >
    </>;
}
