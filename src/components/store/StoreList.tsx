import React, { useEffect, useState } from "react";
import { FixedButton } from "../../utils/sharedComponents/inputsComponentReactForms";
import { ReactComponent as ImagePlaceholder } from "../../assets/images/iconImagePlaceholder.svg";
import { useNavigate, useOutletContext } from "react-router-dom";
import { StoreDTO } from "../../models/Store";
import { EditButton } from "../../utils/sharedComponents/inputsComponentReactForms";
import { Outlet } from "react-router-dom";
import { getStores } from "../../services/storeService";
import { ContextPathData } from "../BaseTemplate";
import { NavigationRouter, NavigationRouterInterface } from "../../routes/NavigationRouter";


interface StoreListProps {
}

export const StoreList = (props: StoreListProps): React.JSX.Element => {
    const title = "List of stores";

    const navigationRouter: NavigationRouterInterface = NavigationRouter();


    const pathData:ContextPathData = useOutletContext();

    const [stores, setStores] = useState<StoreDTO[]>();

    useEffect(() => {
        getStores().then((response) => {
                setStores(response);
                pathData.handlerPathData({inProducts:false,inStores:true,storeName:undefined,productName:undefined,storeId:undefined,productId:undefined})
           
        }).catch((error) => {
            console.error('Error loading products');
        })
    }, [])

    return <>
        <div className="flex items-center flex-col pb-4">
            <div className="mx-8 text-5xl text-center mb-8 dark:text-white" >{title}</div>
            <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-16 gap-8 mx-8">
                    {stores && stores.map((currentValue) => {
                        return <StoreImageGallery key={currentValue.id} store={currentValue} onClick={()=>navigationRouter.goToTheListOfProducts(currentValue.id)} onClickToEdit={()=>navigationRouter.goToStore(currentValue.id)} />
                    })}
                </div>
            </div>
            <div className="bg-red-200">
                <Outlet />
            </div>
            <FixedButton functionToDo={()=>navigationRouter.createNewStore()} title={"Create a store"} />
        </div >
    </>;
}

interface StoreImageGalleryProps {
    store: StoreDTO;
    onClick: (id: number) => void;
    onClickToEdit: (id: number) => void;
}

const StoreImageGallery = (props: StoreImageGalleryProps): React.JSX.Element => {
    return (
        <div id={"storeElementGallery"+props.store.id} className="w-128 md:w-56 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative" onClick={() => props.onClick(props.store.id)}>
            <EditButton id={props.store.id+""} styleOverride="absolute top-0 right-0" functionToDo={() => props.onClickToEdit(props.store.id)} title={"Edit"} />
            {props.store.imageUrl &&
                <img className=" mt-5 h-24 max-w-full rounded-lg object-cover mx-auto text-center dark:text-white" src={props.store.imageUrl} alt="error loading image" />
            }
            {!props.store.imageUrl &&
                <div id="divNoImageSet" className="h-24 max-w-full rounded-lg">
                    <ImagePlaceholder />
                </div>
            }
            <div className="p-5">
                <h5 className="pb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden leading-8 text-center">{props.store.name}</h5>
                <p className="pb-0  font-normal text-gray-700 dark:text-gray-400 overflow-hidden leading-7 text-center">{props.store.address.city}</p>
                <p className="pb-0  font-normal text-gray-700 dark:text-gray-400 overflow-hidden leading-7 text-center">{props.store.address.state}</p>
            </div>
        </div>
    );
}




