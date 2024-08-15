import { NavigationRouter, NavigationRouterInterface } from "../routes/NavigationRouter";
import { PathData } from "./BaseTemplate";



interface navigationPath {
    pathData: PathData;
}

export const NavigationPath = (props: navigationPath): React.JSX.Element => {
    const navigationRouter: NavigationRouterInterface = NavigationRouter();
    return <>
        <div className="pl-2 text-xs sm:text-base text-gray-900 dark:text-white flex w-full gap-1 max-w-[100vh]">
            {
                props.pathData.inStores && props.pathData.storeName && <div id="NavStoresTitle" className="overflow-hidden max-w-[60px]  hover:opacity-75" onClick={navigationRouter.goToFappListOfStores}>
                    Stores
                </div>
            }
            {
                props.pathData.storeName && <>
                    <div>{">"}</div>
                    <div id="NavStoreName" className="truncate max-w-[80px]  sm:max-w-[200px] overflow-hidden text-ellipsis hover:opacity-75" onClick={() => { if (props.pathData.storeId) navigationRouter.goToFappStore(props.pathData.storeId) }}>
                        {props.pathData.storeName}
                    </div>
                </>
            }
            {
                props.pathData.inProducts && <>
                    <div>{">"}</div>
                    <div id="NavProductsTitle" className="overflow-hidden max-w-[80px]  sm:max-w-[200px] text-ellipsis  hover:opacity-75" onClick={() => { if (props.pathData.storeId) navigationRouter.goToFappListOfProducts(props.pathData.storeId) }}>
                        {"Products"}
                    </div>
                </>
            }
            {
                props.pathData.productName && <>
                    <div>{">"}</div>

                    <div className="truncate overflow-hidden max-w-[80px] sm:max-w-[200px] text-ellipsis hover:opacity-75" id="NavProductName" onClick={() => { if (props.pathData.storeId && props.pathData.productId) navigationRouter.goToFappProduct(props.pathData.productId, props.pathData.storeId) }}>
                        {props.pathData.productName}
                    </div>
                </>
            }
        </div>
    </>
}