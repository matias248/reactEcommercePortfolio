import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { NavigationRouterInterface, NavigationRouter } from "../../routes/NavigationRouter";
import { ContextPathData } from "../BaseTemplate";
import { StoreDTO, StoresKeysToNotDisplayInDetails } from "../../models/Store";
import { DisplayNotFound } from "../DisplayError";
import { ReactComponent as Spinner } from "../../assets/images/spinner.svg";
import { getStoreById } from "../../services/storeService";
import { formatString } from "../../utils/sharedComponents/utilsFunctions";


interface StoreDetailPageInterface {

}

const setValuesOfTheInputs = (storeId: number, functionToDo: (store: StoreDTO) => void) => {
    getStoreById(storeId).then((response) => {
        functionToDo(response);
    }).catch((error) => {
        console.error('Error loading store');
    })
}


export const StoreDetailPage = (props: StoreDetailPageInterface): React.JSX.Element => {
    const { storeId } = useParams();
    const [store, setStore] = useState<StoreDTO>();
    const pathData: ContextPathData = useOutletContext();
    const navigationRouter: NavigationRouterInterface = NavigationRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const title = "Details of the store"


    useEffect(() => {
        if (!isNaN(+(storeId ?? NaN))) {
            setValuesOfTheInputs(+(storeId ?? 0), (store) => {
                setStore(store);
                pathData.handlerPathData({ inProducts: false, inStores: true, storeName: store.name, productName: undefined, storeId: store.id, productId: undefined })
            });
        }
        setIsLoading(false)
    }, []);

    return (
        <div>
            {!isLoading && store && <>
                <div className="mb-6 text-4xl text-center mb-16 dark:text-white" >{title}</div>

                <div className="   max-w-[1000px] mx-auto w-[90%] rounded-lg">
                    <div className="text-3xl text-center mb-1 dark:text-white flex justify-end" >
                        <button onClick={() => {
                            navigationRouter.goToFappStoreEdit(storeId ? +storeId : 0);
                        }}
                            id="gotoEditButton" className="max-h-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Go to Edit</button>
                    </div>

                    <ul className="space-y-2 bg-slate-100 border-gray-200 dark:bg-gray-800  dark:text-white rounded-lg">
                        {Object.entries(store).filter((element) => {
                            return StoresKeysToNotDisplayInDetails.every((productKey: string) => { return productKey !== element[0] })

                        }).map((element,index) => {
                            return <>
                                {typeof element[1] !== 'object' && <>
                                    <li key={index} id={"displayStoreElement"+index} className="flex justify-between border rounded-lg shadow bg-slate-400 dark:bg-gray-500 dark:border-gray-700 gap-2 margin-top-2">
                                        <div id={"displayStoreElement"+index+"key"} className="bg-slate-300 dark:bg-gray-600 rounded-l-lg px-1 w-1/2 overflow-y-auto ">{formatString(element[0])}</div>
                                        <div id={"displayStoreElement"+index+"value"} className="bg-slate-300 dark:bg-gray-600 rounded-r-lg px-1 w-1/2 overflow-y-auto text-start" > {element[1]}</div>
                                    </li>
                                </>}
                                {typeof element[1] === 'object' && <>
                                    {
                                        Object.entries(element[1]).map((currentValue,index2) => {
                                            if(typeof currentValue[1] === "number" || typeof currentValue[1] === "string"  )
                                            return <li key={index+"-"+index2} id={"displayStoreElement"+index+"-"+index2} className="flex justify-between border rounded-lg shadow bg-slate-400 dark:bg-gray-500 dark:border-gray-700 gap-2 margin-top-2">
                                                <div id={"displayStoreElement"+index+"-"+index2+"key"} className="bg-slate-300 dark:bg-gray-600 rounded-l-lg px-1 w-1/2 overflow-y-auto ">{formatString(currentValue[0])}</div>
                                                <div id={"displayStoreElement"+index+"-"+index2+"value"} className="bg-slate-300 dark:bg-gray-600 rounded-r-lg px-1 w-1/2 overflow-y-auto text-start" > {currentValue[1]}</div>
                                            </li>
                                        })
                                    }

                                </>}
                            </>
                        })
                        }
                    </ul>
                </div>
            </>
            }
            {
                !isLoading && !store && <DisplayNotFound />
            }
            {
                isLoading && <div className="flex justify-center"><Spinner /></div>
            }
        </div >

    );
}
