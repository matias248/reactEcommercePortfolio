import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { currentStores } from "../LocalData/Stores";
import { ReactComponent as ArrowDown } from "../assets/images/arrowDownIcon.svg";
import {useClickOutside} from "../utils/sharedComponents/utilsFunctions";
import { StoreDTO } from "../models/Store";
import { ProductDTO } from "../models/Product";


interface sideBarProps {
    currentElement?: string;
    styleOverride?: string;
}
const stores = currentStores;

export const SideBar = (props: sideBarProps): React.JSX.Element => {
    const { ref, ref2, isComponentVisible } = useClickOutside(false);

    return <>
        {isComponentVisible &&
            <aside ref={ref} style={{ height: `calc(100vh - 100px)` }} className={"bg-slate-100 dark:bg-gray-800 w-48 fixed flex flex-col z-50 overflow-y-auto border-2 border-slate-700 " + (props.styleOverride ?? "")} onClick={(event) => { event.stopPropagation(); }}>
                {stores.map((currentValue) => {
                    return <StoreItemOfSideBar store={currentValue} />
                })}
            </aside>
        }
        {!isComponentVisible &&
            <div id="SideBarShop" ref={ref2} className={"bg-white dark:bg-gray-800 dark:border-2 dark:border-slate-700 rounded-md h-full flex items-center justify-center w-full gap-1 " + (props.styleOverride ?? "")}>
                <svg className="size-6 fill-black dark:fill-white" viewBox="0 0 20 20"><path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path></svg>
                <div className="hidden md:inline dark:text-white mr-[10px] ">All the categories</div>
            </div>
        }
    </>
}

interface StoreItemOfSideBarProps {
    store: StoreDTO;
}

export const StoreItemOfSideBar = (props: StoreItemOfSideBarProps): React.JSX.Element => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const changeTheExpandedValue = () => {
        setIsExpanded(!isExpanded);
    }
    const navigate = useNavigate();

    const goToStorePage = () => {
        navigate(`/stores/${props.store.id}/products/`);
    };


    return (<>
        <div className="bg-slate-400 dark:bg-slate-600  border-b-2 border-black hover:bg-slate-600 dark:hover:bg-slate-400  flex items-center justify-between  min-h-[48px] dark:text-white" onClick={goToStorePage}>
            <span className=" w-32 overflow-auto">{props.store.name}</span>
            {props.store.produtcs && props.store.produtcs.length > 0 && <div className={"w-[48px] h-full  " + (isExpanded ? "bg-slate-300" : "bg-slate-500")} onClick={(event) => { event.stopPropagation(); changeTheExpandedValue() }}>
                <ArrowDown className="size-fit dark:fill-white " />
            </div>}
        </div>
        {
            props.store.produtcs && props.store.produtcs.length > 0 && isExpanded && props.store.produtcs.map((currentChild) => {
                return <ProductItemOfSideBar product={currentChild} storeId={props.store.id} />
            })
        }

    </>
    );
}

interface ProductItemOfSideBarProps {
    product: ProductDTO;
    storeId: number;
}

export const ProductItemOfSideBar = (props: ProductItemOfSideBarProps): React.JSX.Element => {
    const navigate = useNavigate();
    const goToProductPage = () => {
        navigate(`/stores/${props.storeId}/products/${props.product.id - 1}`);
    };

    return (
        <div className="bg-slate-200 dark:bg-slate-500  border-b-2 border-black hover:bg-slate-600 dark:hover:bg-slate-400  flex items-center justify-between  min-h-[48px] dark:text-white" onClick={goToProductPage}>
            <span className="w-32 overflow-auto">{props.product.name}</span>
        </div>)
}

