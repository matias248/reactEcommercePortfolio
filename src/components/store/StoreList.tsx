import React, { useEffect, useState } from "react";
import { FixedButton } from "../../utils/sharedComponents/inputsComponentReactForms";
import { ReactComponent as ImagePlaceholder } from "../../assets/images/iconImagePlaceholder.svg";
import { useOutletContext } from "react-router-dom";
import { StoreDTO } from "../../models/Store";
import { EditButton } from "../../utils/sharedComponents/inputsComponentReactForms";
import { getStores } from "../../services/storeService";
import { ContextPathData } from "../BaseTemplate";
import { NavigationRouter, NavigationRouterInterface } from "../../routes/NavigationRouter";
import { ReactComponent as Spinner } from "../../assets/images/spinner.svg";


interface StoreListProps {
}

export const StoreList = (props: StoreListProps): React.JSX.Element => {
    const title = "List of stores";
    const navigationRouter: NavigationRouterInterface = NavigationRouter();
    const pathData: ContextPathData = useOutletContext();
    const [stores, setStores] = useState<StoreDTO[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        getStores().then((response) => {
            setStores(response);
            pathData.handlerPathData({ inProducts: false, inStores: true, storeName: undefined, productName: undefined, storeId: undefined, productId: undefined })

        }).catch((error) => {
            console.error('Error loading products');
        })
        setIsLoading(false)
    }, [])

    return <>{!isLoading &&
        <div className="">
            <div className="mx-8 text-4xl text-center mb-8 dark:text-white" >{title}</div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-16 gap-8 mx-8">
                {stores && stores.map((currentValue) => {
                    return <StoreImageGallery key={currentValue.id} store={currentValue} onClick={() => { navigationRouter.goToFappStore(currentValue.id) }} onClickToEdit={() => navigationRouter.goToFappStoreEdit(currentValue.id)} onClickToProductsListButton={() => navigationRouter.goToFappListOfProducts(currentValue.id)} />
                })}
            </div>
            <FixedButton functionToDo={() => navigationRouter.goToFappCreationStore()} title={"Create a store"} />
        </div >
    }
        {
            isLoading && <div className="flex justify-center"><Spinner /></div>
        }
    </>;
}

interface StoreImageGalleryProps {
    store: StoreDTO;
    onClick: () => void;
    onClickToEdit: () => void;
    onClickToProductsListButton: () => void;
}

const StoreImageGallery = (props: StoreImageGalleryProps): React.JSX.Element => {
    return (
        <div id={"storeElementGallery" + props.store.id} className="h-56 w-128 md:w-56 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative" onClick={props.onClick}>
            <EditButton id={props.store.id + ""} styleOverride="absolute top-0 right-0" functionToDo={props.onClickToEdit} title={"Edit"} />
            <div id={"imageStoreGallery" + props.store.id} className="w-28 mt-5 mx-auto  h-16 ">
                {props.store.imageUrl &&
                    <img className="h-16 max-w-full rounded-lg object-cover mx-auto text-center dark:text-white" src={props.store.imageUrl} alt="error loading image" />
                }
                {!props.store.imageUrl &&
                    <div id="divNoImageSet" className=" h-16 max-w-full rounded-lg">
                        <ImagePlaceholder />
                    </div>
                }
            </div>
            <div id={"textStoreGallery" + props.store.id} className="mt-8 max-w-full h-24 mx-1 text-center ">
                <p id={"1textStoreGallery" + props.store.id} className="h-1/3 w-full text-xl font-bold text-gray-900 dark:text-white truncate leading-7 ">{props.store.name}</p>
                <p id={"2textStoreGallery" + props.store.id} className="h-1/3 w-full text-sm text-gray-900 dark:text-white truncate leading-5">{props.store.address.city}</p>
                <div className=" h-1/3 flex flex-row-reverse items-center overflow-hidden">
                    <button onClick={(e) => { e.stopPropagation(); props.onClickToProductsListButton() }} id={"listOfProductsButton" + props.store.id} className="max-h-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">List of Products</button>
                </div>
            </div>

        </div>
    );
}




