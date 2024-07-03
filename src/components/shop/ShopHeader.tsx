import { useState } from "react";
import { StoreDTO } from "../../models/Store";
import { SearchBar } from "./SearchBar";
import { ReactComponent as ShoppingCartIcon } from "../../assets/images/shoppingCartIcon.svg";
import { ReactComponent as ArrowDown } from "../../assets/images/arrowDownIcon.svg";
import { ShopSelectorDialog } from "./ShopSelectorDialog";

export const ShopHeader = (props: {
    storesList: StoreDTO[] | undefined, selectedStore: StoreDTO | undefined,
    handlerSelectedInput: (store: StoreDTO) => void,
    handlerShopTextFilter: (text: string) => void,
    textFilterShop: string,
    textFilterProduct: string,
    updadeStoresByFilter: () => void,
    handlerProductTextFilter: (text: string) => void,
    updadeProductsByFilter: () => void,
}) => {

    return (
        <header className="h-[64px] mb-4 sm:mb-8">
            <div className="bg-slate-100 border-gray-200  dark:bg-gray-800 max-w-[1000px] mx-auto w-[90%] rounded-lg">
                <div className="flex items-center max-w-full gap-[4px] justify-between mx-2 ">
                    <div className=" hidden sm:block">
                        <ShopSelectorInput storesList={props.storesList} selectedStore={props.selectedStore} handlerSelectedInput={props.handlerSelectedInput} handlerShopTextFilter={(props.handlerShopTextFilter)} shopTextFilter={props.textFilterShop} updadeStoresByFilter={props.updadeStoresByFilter} />
                    </div>

                    <div className="flex-1">
                        <SearchBar handlerValueChange={props.handlerProductTextFilter} textFilter={props.textFilterProduct} functionOnSubmit={props.updadeProductsByFilter} />
                    </div>

                    <div className="flex items-center lg:order-2 ">
                        {
                            <button id="shoppingCart" onClick={() => alert("carrito")} className=" bg-blue-600 hover:bg-blue-700 rounded-full p-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
                                <div className="size-6"><ShoppingCartIcon /></div>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export const ShopSelectorInput = (props: {
    storesList: StoreDTO[] | undefined, selectedStore: StoreDTO | undefined, handlerSelectedInput: (store: StoreDTO) => void,
    handlerShopTextFilter: (text: string) => void, shopTextFilter: string, updadeStoresByFilter: () => void
}) => {

    const [displayShopSelectorDialog, setShopSelectorDialog] = useState<boolean>(false);

    return (<>
        {displayShopSelectorDialog && <ShopSelectorDialog shopTextFilter={props.shopTextFilter} storesList={props.storesList} selectedStore={props.selectedStore} handlerSelectedInput={props.handlerSelectedInput} handlerShopTextFilter={props.handlerShopTextFilter} updadeStoresByFilter={props.updadeStoresByFilter} />
        }
        <div className="flex h-full border-2 border-gray-200 rounded-lg dark:border-slate-700 " onClick={()=> {setShopSelectorDialog(!displayShopSelectorDialog)}}>
            <div className=" w-[144px] ml-2" >
                <p className="text-sm dark:text-white truncate  max-w-full">My store
                </p>
                <p className="text-xs dark:text-white truncate max-w-full">{props.selectedStore?.name ?? "Store not selected"}</p>
            </div>
            <div className="size-[40px] flex items-center justify-items-center">
                <ArrowDown className="dark:fill-white " />
            </div>
        </div>
    </>
    )
}
