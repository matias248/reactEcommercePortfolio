import { useState } from "react";
import { StoreDTO } from "../../models/Store";
import { SearchBar } from "./SearchBar";
import { ReactComponent as ShoppingCartIcon } from "../../assets/images/shoppingCartIcon.svg";
import { ReactComponent as ArrowDown } from "../../assets/images/arrowDownIcon.svg";
import { ShopSelectorDialog } from "./ShopSelectorDialog";
import { useIsComponentScrolledDown, useSideBarLogic } from "../../utils/sharedComponents/utilsFunctions";
import { AnimatePresence, motion } from 'framer-motion'

export const ShopHeader = (props: {
    storesList: StoreDTO[] | undefined, selectedStore: StoreDTO | undefined,
    handlerSelectedInput: (store: StoreDTO) => void,
    handlerShopTextFilter: (text: string) => void,
    textFilterShop: string,
    textFilterProduct: string,
    updadeStoresByFilter: () => void,
    handlerProductTextFilter: (text: string) => void,
    updadeProductsByFilter: () => void,
    handlerCartListVisble: (isVisible: boolean) => void;
    numberOfElementsInCartShop: number | undefined;

}) => {
    const { ref, isVisible } = useIsComponentScrolledDown();

    return (
        <header className="h-[64px] mb-4 sm:mb-8">
            <div className="bg-slate-100 border-gray-200  dark:bg-gray-800 max-w-[1000px] mx-auto w-[90%] rounded-lg">
                <div className="flex items-center max-w-full gap-[4px] justify-between mx-2 ">
                    <div className=" hidden sm:block">
                        <ShopSelectorInput storesList={props.storesList} selectedStore={props.selectedStore} handlerSelectedInput={props.handlerSelectedInput} handlerShopTextFilter={(props.handlerShopTextFilter)} shopTextFilter={props.textFilterShop} updadeStoresByFilter={props.updadeStoresByFilter} />
                    </div>

                    <div className="flex-1">
                        <SearchBar handlerValueChange={props.handlerProductTextFilter} textFilter={props.textFilterProduct} functionOnSubmit={props.updadeProductsByFilter} id="filterproducts" />
                    </div>

                    <div ref={ref} className="flex items-center lg:order-2 ">
                        {

                            <button id="shoppingCart" onClick={() => props.handlerCartListVisble(true)} className="relative bg-blue-600 hover:bg-blue-700 rounded-full p-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
                                <div className="size-6"><ShoppingCartIcon /></div>
                                {(props.numberOfElementsInCartShop != 0 && props.numberOfElementsInCartShop != undefined) && <div className={"absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full my-auto text-center flex items-center justify-center overflow-hidden "
                                    + (props.numberOfElementsInCartShop > 9 ? "size-6 " : "size-5")}>
                                    <div>{props.numberOfElementsInCartShop > 99 ? "+99" : props.numberOfElementsInCartShop}</div>
                                </div>}
                            </button>

                        }
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {!isVisible &&
                    <div
                        className="fixed w-[100%] top-4 pointer-events-none"
                    >
                        <div className=" mx-auto max-w-[1000px]  w-[90%] flex flex-row-reverse px-2 py-1">

                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                id="shoppingCartFixed" onClick={() => props.handlerCartListVisble(true)} className="relative bg-blue-600 hover:bg-blue-700 rounded-full p-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none pointer-events-auto">
                                <div className="size-6 "><ShoppingCartIcon /></div>
                                {(props.numberOfElementsInCartShop != 0 && props.numberOfElementsInCartShop != undefined) && <div className={"absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full my-auto text-center flex items-center justify-center overflow-hidden "
                                    + (props.numberOfElementsInCartShop > 9 ? "size-6 " : "size-5")}>
                                    <div>{props.numberOfElementsInCartShop > 99 ? "+99" : props.numberOfElementsInCartShop}</div>
                                </div>}
                            </motion.button>
                        </div>
                    </div>
                }
            </AnimatePresence>

        </header >
    )
}

export const ShopSelectorInput = (props: {
    storesList: StoreDTO[] | undefined, selectedStore: StoreDTO | undefined, handlerSelectedInput: (store: StoreDTO) => void,
    handlerShopTextFilter: (text: string) => void, shopTextFilter: string, updadeStoresByFilter: () => void
}) => {

    const { button, isComponentVisible, dialog } = useSideBarLogic(false)

    return (<>
        <AnimatePresence>
            {
                isComponentVisible && <ShopSelectorDialog ref={dialog} storesList={props.storesList} selectedStore={props.selectedStore} handlerSelectedInput={props.handlerSelectedInput}
                    handlerShopTextFilter={props.handlerShopTextFilter} shopTextFilter={props.shopTextFilter} updadeStoresByFilter={props.updadeStoresByFilter} />
            }
        </AnimatePresence>
        <div ref={button} id={'ShopSelectorInput'} className="flex h-full border-2 border-gray-400 rounded-lg dark:border-slate-700 ">
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
