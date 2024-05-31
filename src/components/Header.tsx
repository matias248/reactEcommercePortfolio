import { ReactComponent as EcIcon } from "../assets/images/ecPortofolio.svg";
import { ReactComponent as ShopIcon } from "../assets/images/shopIcon.svg";
import { ReactComponent as BillIcon } from "../assets/images/billIcon.svg";


export const Header = () => {
    return (
        <header className="h-[64px] mb-8 bg-red-200">
            <nav className="bg-yellow-100 border-gray-200 py-[10px] dark:bg-gray-800 h-full">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-full px-2">
                    <div className="flex items-center gap-1  ">
                        <div className="size-12"><EcIcon></EcIcon></div>
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white hidden sm:inline">ECportfolio</span>
                    </div>
                    <div className="flex items-center lg:order-2">
                        <button className="text-white bg-primary-700 hover:bg-primary-800  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none flex gap-1"><div className="size-6"><ShopIcon></ShopIcon></div><div className="hidden md:inline">Shop</div></button>
                        <button className="text-white bg-primary-700 hover:bg-primary-800  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none flex gap-1 items-center"><div className="size-6"><BillIcon></BillIcon></div><div className="hidden  md:inline">Finance</div></button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

