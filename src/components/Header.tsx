import { ReactComponent as EcIcon } from "../assets/images/ecPortofolio.svg";
import { ReactComponent as ShopIcon } from "../assets/images/shopIcon.svg";
import { ReactComponent as BillIcon } from "../assets/images/billIcon.svg";
import { ReactComponent as FormIcon } from "../assets/images/formIcon.svg";
import { NavigationRouter, NavigationRouterInterface } from "../routes/NavigationRouter";
import { AppNames } from "../utils/constants";

interface HeaderInterface {
    resetPathData: () => void;
}

export const Header = (props: HeaderInterface) => {
    const navigationRouter: NavigationRouterInterface = NavigationRouter();
    const currentRoute: AppNames | undefined = navigationRouter.currentRoute();

    return (
        <header className="h-[64px] mb-8">
            <nav className="bg-slate-100 border-gray-200 py-[10px] dark:bg-gray-800 h-full">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-full px-2">
                    <div className="flex items-center gap-1  ">
                        <div className="size-12"><EcIcon></EcIcon></div>
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white hidden sm:inline">ECportfolio</span>
                    </div>
                    <div className="flex items-center lg:order-2">
                        {
                            currentRoute !== AppNames.FORMS &&
                            <button id="NavigationFormsApp" onClick={() => navigationRouter.goToFappListOfStores()} className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none flex gap-1 "><div className="size-6"><FormIcon /></div><div className="hidden md:inline">Forms</div></button>
                        }
                        {
                            currentRoute !== AppNames.SHOP &&
                            <button id="NavigationShopApp" onClick={() =>{props.resetPathData(); navigationRouter.goToShapp()}} className="text-white bg-blue-600 hover:bg-blue-700  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none flex gap-1"><div className="size-6"><ShopIcon /></div><div className="hidden md:inline">Shop</div></button>
                        }
                        {
                            currentRoute !== AppNames.FINANCE &&
                            <button id="NavigationFinanceApp" onClick={() =>{props.resetPathData(); navigationRouter.goToFiapp()}} className="text-white bg-blue-600 hover:bg-blue-700  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none flex gap-1 items-center"><div className="size-6"><BillIcon /></div><div className="hidden  md:inline">Finance</div></button>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

