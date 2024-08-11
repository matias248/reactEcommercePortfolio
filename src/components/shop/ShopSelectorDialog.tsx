import { forwardRef, useState } from "react";
import { StoreDTO } from "../../models/Store";
import { SearchBar } from "./SearchBar";
import { ReactComponent as LocationIcon } from "../../assets/images/locationIcon.svg";
import { motion } from "framer-motion"

interface shopSelectorDialog {
    storesList: StoreDTO[] | undefined, selectedStore: StoreDTO | undefined, handlerSelectedInput: (store: StoreDTO) => void, handlerShopTextFilter: (text: string) => void, shopTextFilter: string, updadeStoresByFilter: () => void,
}

export type Ref = HTMLDivElement;

export const ShopSelectorDialog = forwardRef<Ref, shopSelectorDialog>((props: shopSelectorDialog, ref) => {
    const [shopSelectedTemporal, setShopSelectedTemporal] = useState<StoreDTO>();

    const handlerStoreSelected = (store: StoreDTO) => {
        setShopSelectedTemporal(store);
    }

    return (<motion.div initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{x:'-100%'}}
        transition={{ duration: 0.6 }} ref={ref} className="fixed h-[100dvh] bg-gray-300 dark:bg-gray-500 top-0 left-0 max-[460px]:w-[50%] w-[40%] md:w-[30%] z-10 rounded-r-lg flex flex-col gap-1 px-1" >
        <div className="dark:text-white font-bold self-center ">Select your store</div>

        <div className="dark:text-slate-100 text-sm mb-1">Enter your zip code or city to see the nearest stores. This will allow you to filter products by store.</div>

        <div className=" ">
            <SearchBar textFilter={props.shopTextFilter} handlerValueChange={props.handlerShopTextFilter} functionOnSubmit={props.updadeStoresByFilter} id="filtershops" />
        </div>

        <div className="flex-1 overflow-auto mb-2">
            <ShopSelectorDialogStoreInputList storesList={props.storesList ?? []} selectedStore={shopSelectedTemporal} handlerTemporalStore={handlerStoreSelected} />

        </div>

        <div className="mb-2">
            <ShopSelectorDialogButtonCorfim styleOverride="" functionToDo={() => { if (shopSelectedTemporal) props.handlerSelectedInput(shopSelectedTemporal) }} title={"Select store"} />
        </div>
    </motion.div>)
}
);

const ShopSelectorDialogStoreInputList = (props: { storesList: StoreDTO[] | undefined, selectedStore: StoreDTO | undefined, handlerTemporalStore: (store: StoreDTO) => void }) => {


    return (
        <div className="flex flex-col gap-1  overflow-auto  ">
            {props.storesList && props.storesList.map((currentValue) => {
                return <ShopSelectorDialogStoreInput store={currentValue} onClick={() => props.handlerTemporalStore(currentValue)} idStoreSelected={props.selectedStore?.id} key={currentValue.id} />
            })}

        </div>
    )
}


const ShopSelectorDialogStoreInput = (props: {
    store: StoreDTO, idStoreSelected: number | undefined, onClick: (id: number) => void;
}) => {
    return (
        <div id={"storeElementDialog" + props.store.id} className={"h-36 w-full min-w-128 md:min-w-56 bg-white  border-2 rounded-lg shadow dark:bg-gray-800  p-1 " + (props.idStoreSelected === props.store.id ? "border-red-200 dark:border-gray-200" : "border-gray-200 dark:border-gray-700")} onClick={() => props.onClick(props.store.id)}>
            <div id={"textStoreElementDialog" + props.store.id} className=" max-w-full mx-1 text-center ">
                <p id={"1textStoreElementDialog" + props.store.id} className="mb-2 h-7 w-full text-xl font-bold text-gray-900 dark:text-white truncate leading-7 ">{props.store.name}</p>
                <div className="flex justify-center ">
                    <div className="size-7 dark:fill-slate-300"><LocationIcon /></div>
                </div>
                <p id={"2textStoreElementDialog" + props.store.id} className="h-5 w-full text-sm text-gray-900 dark:text-white truncate leading-5">{props.store.address.state}</p>
                <p id={"3textStoreElementDialog" + props.store.id} className="h-5 w-full text-sm text-gray-900 dark:text-white truncate leading-5">{props.store.address.zipCode + " " + props.store.address.city}</p>
                <p id={"4textStoreElementDialog" + props.store.id} className="h-5 w-full text-sm text-gray-900 dark:text-white truncate leading-5">{props.store.address.streetNumber + " " + props.store.address.streetName}</p>


            </div>
        </div>
    )
}

export const ShopSelectorDialogButtonCorfim = (props: { functionToDo: () => void, title: string, styleOverride: string }): React.JSX.Element => {
    return <button name="confirmDialogShopButton" onClick={props.functionToDo} className={" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:text-white " + (props.styleOverride ?? "")}>{props.title}</button>
}