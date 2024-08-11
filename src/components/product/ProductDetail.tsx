import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { ProductDTO, ProductKeysToNotDisplayInDetails } from "../../models/Product";
import { NavigationRouterInterface, NavigationRouter } from "../../routes/NavigationRouter";
import { ContextPathData } from "../BaseTemplate";
import { getProductByIdWithstore } from "../../services/productService";
import { StoreDTO } from "../../models/Store";
import { DisplayNotFound } from "../DisplayError";
import { ReactComponent as Spinner } from "../../assets/images/spinner.svg";
import { formatString } from "../../utils/sharedComponents/utilsFunctions";


interface ProductDetailPageInterface {

}

const setValuesOfTheInputs = (storeId: number, productId: number, functionToDo: (data: { store: StoreDTO, product: ProductDTO }) => void) => {

    getProductByIdWithstore(storeId, productId).then((data) => {
        functionToDo(data);
    }).catch((error) => {
        console.error('Error loading products');
    })

}

export const ProductDetailPage = (props: ProductDetailPageInterface): React.JSX.Element => {
    const { storeId, productId } = useParams();
    const [product, setProduct] = useState<ProductDTO>();
    const pathData: ContextPathData = useOutletContext();
    const navigationRouter: NavigationRouterInterface = NavigationRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const title = "Details of the product"


    useEffect(() => {
        if (!isNaN(+(productId ?? NaN))) {
            setValuesOfTheInputs(+(storeId ?? 0), +(productId ?? 0), (data) => {
                setProduct(data.product);
                pathData.handlerPathData({ inProducts: true, inStores: true, storeName: data.store.name, productName: data.product.name, storeId: data.store.id, productId: data.product.id })
            });
        }
        setIsLoading(false)
    }, []);

    return (
        <div>
            {!isLoading && product && <>
                <div className="mb-6 text-4xl text-center mb-16 dark:text-white" >{title}</div>

                <div className="max-w-[1000px] mx-auto w-[90%] rounded-lg">
                    <div className="text-3xl text-center mb-1 dark:text-white flex justify-end" >
                        <button onClick={() => {
                            navigationRouter.goToFappProductEdit(productId ? +productId : 0, storeId ? +storeId : 0);
                        }}
                            id="gotoEditButton" className="max-h-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Go to Edit</button>
                    </div>

                    <ul className="space-y-2 bg-slate-100 border-gray-200 dark:bg-gray-800  dark:text-white rounded-lg">
                        {Object.entries(product).filter((element) => {
                            return ProductKeysToNotDisplayInDetails.every((productKey: string) => { return productKey !== element[0] })

                        }).map((element,index) => {
                
                            return <li id={"displayProductElement"+index} key={index} className="flex justify-between border rounded-lg shadow bg-slate-400 dark:bg-gray-500 dark:border-gray-700 gap-2 margin-top-2">
                                <div id={"displayProductElement"+index+"key"} className="bg-slate-300 dark:bg-gray-600 rounded-l-lg px-1 w-1/2 overflow-y-auto ">{formatString(element[0])}</div>
                                <div id={"displayProductElement"+index+"value"} className="bg-slate-300 dark:bg-gray-600 rounded-r-lg px-1 w-1/2 overflow-y-auto text-start" > {element[1]}</div>
                            </li>
                        })
                        }
                    </ul>
                </div>
            </>
            }
            {
                !isLoading && !product && <DisplayNotFound />
            }
            {
                isLoading && <div className="flex justify-center"><Spinner /></div>
            }
        </div>

    );
}