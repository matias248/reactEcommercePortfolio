import React, { useEffect, useState } from "react";
import { FixedButton } from "../../utils/sharedComponents/inputsComponentReactForms";
import { ProductDTO } from "../../models/Product";
import { ReactComponent as ImagePlaceholder } from "../../assets/images/iconImagePlaceholder.svg";
import { useOutletContext, useParams } from "react-router-dom";
import { getProductsWithstore } from "../../services/productService";
import { ContextPathData } from "../BaseTemplate";
import { NavigationRouter, NavigationRouterInterface } from "../../routes/NavigationRouter";



interface ProductListProps {
    products?: ProductDTO[];
}

export const ProductList = (props: ProductListProps): React.JSX.Element => {
    const title = "List of products";
    const { storeId } = useParams();
    const [products, setProducts] = useState<ProductDTO[]>();
    const pathData: ContextPathData = useOutletContext();
    const navigationRouter: NavigationRouterInterface = NavigationRouter();


    useEffect(() => {
        getProductsWithstore(+(storeId ?? 0)).then((data) => {
            setProducts(data.products);
            pathData.handlerPathData({ inProducts: true, inStores: true, storeName: data.store.name, productName: undefined, storeId: data.store.id, productId: undefined })

        }).catch((error) => {
            console.error('Error loading products');
        })
    }, [])




    return <>
        <div className="flex items-center flex-col pb-4">
            <div className="mb-16 text-5xl text-center dark:text-white" >{title}</div>

            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-16 gap-8 mx-8 ">
                    {products && products.map((currentValue) => {
                        return <ProductImageGallery key={currentValue.id} product={currentValue} onClick={() => { navigationRouter.goToProduct(currentValue.id, currentValue.storeId) }} />
                    })}
                </div>
            </div>
            <FixedButton functionToDo={() => navigationRouter.createNewProduct((storeId ? +storeId : -1))} title={"Create a product"} />
        </div>
    </>;
}

interface ProductImageGalleryProps {
    product: ProductDTO;
    onClick: (id: number) => void;
}

const ProductImageGallery = (props: ProductImageGalleryProps): React.JSX.Element => {
    return (
        <div id={"productElementGallery" + props.product.id} className="w-128 md:w-56 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onClick={() => props.onClick(props.product.id)}>
            {props.product.imageUrl &&
                <img className="mt-5 h-16 max-w-full rounded-lg object-cover mx-auto text-center dark:text-white" src={props.product.imageUrl} alt="error loading image" />
            }
            {!props.product.imageUrl &&
                <div id="divNoImageSet" className="mt-5 h-16 max-w-full rounded-lg">
                    <ImagePlaceholder />
                </div>
            }
            <div className="p-5">
                <h5 className="pb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden leading-8">{props.product.name}</h5>
                <p className="pb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden leading-7">{props.product.description}</p>
            </div>
        </div>
    );
}

