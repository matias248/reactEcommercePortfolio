import React from "react";
import { ReactComponent as ShoppingCartIcon } from "../../assets/images/shoppingCartIcon.svg";
import { SideBar } from "../SideBar";
import { ReactComponent as ArrowDown } from "../../assets/images/arrowDownIcon.svg";
import { ShopCategoryList } from "./ShopCategory";


export const ShopTemplate = (): React.JSX.Element => {
    return (
        <>
            <ShopHeader />
            <div className=" block sm:hidden  ml-[5%] w-[188px] mb-4">
                <ShopSelectorInput />
            </div>
            <ShopCategoryList />
        </>
    );
}


const ShopHeader = () => {

    return (
        <header className="h-[64px] mb-4 sm:mb-8">
            <div className="bg-slate-100 border-gray-200  dark:bg-gray-800 max-w-[1000px] mx-auto w-[90%] rounded-lg">
                <div className="flex items-center max-w-full gap-[4px] justify-between mx-2 ">
                    {false && <div className=" flex-none ">
                        <div className="h-12 min-w-12 "><SideBar /></div>
                    </div>}
                    
                    <div className=" hidden sm:block">
                        <ShopSelectorInput />
                    </div>

                    <div className="flex-1">
                        <SearchBar />
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

const SearchBar = () => {

    return (
        <form className="max-w-lg mx-auto ">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" className="block  w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>
    )
}


const ShopSelectorInput = () => {

    return (<>
        <div className="flex h-full border-2 border-gray-200 rounded-lg dark:border-slate-700 ">
            <div className=" w-[144px] ml-2" >
                <p className="text-sm dark:text-white truncate  max-w-full">Mi tiend
                </p>
                <p className="text-xs dark:text-white truncate max-w-full">MediaMarkt Las Palmas - Las </p>
            </div>
            <div className="size-[40px] flex items-center justify-items-center">
                <ArrowDown className="dark:fill-white " />
            </div>
        </div>
    </>
    )
}
