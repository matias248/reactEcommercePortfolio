import React, { useEffect, useState } from "react";
import { EditButton, FixedButton } from "../../utils/sharedComponents/inputsComponentReactForms";
import { ProductDTO } from "../../models/Product";
import { ReactComponent as ImagePlaceholder } from "../../assets/images/iconImagePlaceholder.svg";
import { useOutletContext, useParams } from "react-router-dom";
import { getProductsWithstore } from "../../services/productService";
import { ContextPathData } from "../BaseTemplate";
import { NavigationRouter, NavigationRouterInterface } from "../../routes/NavigationRouter";
import { DisplayNotFound } from "../DisplayError";
import { ReactComponent as Spinner } from "../../assets/images/spinner.svg";



interface ProductListProps {
    products?: ProductDTO[];
}

export const ProductList = (props: ProductListProps): React.JSX.Element => {
    const title = "List of products";
    const { storeId } = useParams();
    const [products, setProducts] = useState<ProductDTO[]>();
    const pathData: ContextPathData = useOutletContext();
    const navigationRouter: NavigationRouterInterface = NavigationRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        getProductsWithstore(+(storeId ?? 0)).then((data) => {
            setProducts(data.products);
            pathData.handlerPathData({ inProducts: true, inStores: true, storeName: data.store.name, productName: undefined, storeId: data.store.id, productId: undefined })

        }).catch((error) => {
            console.error('Error loading products');
        })
        setIsLoading(false)
    }, [])

    return <>
        {!isLoading && products &&
            <div className="mx-auto max-w-[1600px] mx-auto w-[90%]">
                <div className="mb-8 text-4xl text-center dark:text-white" >{title}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-y-4 gap-y-6 mx-8 pb-4 md:justify-items-center">
                    {products && products.map((currentValue) => {
                        return <ProductImageGallery key={currentValue.id} product={currentValue} onClick={() => { navigationRouter.goToFappProduct(currentValue.id, currentValue.storeId); }}
                            onClickToEdit={() => { navigationRouter.goToFappProductEdit(currentValue.id, currentValue.storeId) }} />
                    })}
                </div>
                <FixedButton functionToDo={() => navigationRouter.goToFappCreationProduct((storeId ? +storeId : -1))} title={"Create a product"} />
            </div>
        }
        {!isLoading && !products &&
            <DisplayNotFound />
        }
        {
            isLoading && <div className="flex justify-center"><Spinner /></div>
        }
    </>
}

interface ProductImageGalleryProps {
    product: ProductDTO;
    onClick: (id: number) => void;
    onClickToEdit: () => void;
}
export const ProductImageGallery = (props: ProductImageGalleryProps): React.JSX.Element => {
    return (
        <div id={"productElementGallery" + props.product.id} className="h-56 w-128 md:w-56 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative" onClick={() => props.onClick(props.product.id)}>
            <EditButton id={props.product.id + ""} styleOverride="absolute top-0 right-0" functionToDo={props.onClickToEdit} title={"Edit"} />

            <div id={"imageProductGallery" + props.product.id} className="w-28 mt-5 mx-auto  h-16 ">
                {props.product.imageUrl &&
                    <img className="h-16 max-w-full rounded-lg object-cover mx-auto text-center dark:text-white" src={props.product.imageUrl} alt="error loading image" />
                }
                {!props.product.imageUrl &&
                    <div id={"divNoImageSet" + props.product.id}className="h-16 max-w-full rounded-lg">
                        <ImagePlaceholder />
                    </div>
                }
            </div>
            <div id={`textProductGallery${props.product.id}`} className="mt-8 max-w-full h-24 mx-1 text-center">
                <p id={`1textProductGallery${props.product.id}`} className="h-1/2 w-full text-xl font-bold text-gray-900 dark:text-white overflow-hidden text-ellipsis leading-6 ">
                    {props.product.name}
                </p>
                <p id={`2textProductGallery${props.product.id}`} className=" w-full text-sm text-gray-700 dark:text-gray-400 leading-6 line-clamp-2">
                    {props.product.description}
                </p>
            </div>
        </div>
    );
}

