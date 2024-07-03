import React, { useState } from "react";
import { ProductDTO } from "../../models/Product";
import { ReactComponent as Spinner } from "../../assets/images/spinner.svg";
import { ReactComponent as ImagePlaceholder } from "../../assets/images/iconImagePlaceholder.svg";
import { NavigationInputs } from "../../utils/sharedComponents/inputsComponentReactForms";



interface ShopProductListInterface {
    products: ProductDTO[] | undefined;
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    handlerCurrentPage: (page: number) => void;
}

export const ShopProductList = (props: ShopProductListInterface): React.JSX.Element => {


    return (
        <div id="shopProductListContainer" className="max-w-[1200px] mx-auto w-[90%] flex flex-col ">
            <div className="self-end"><NavigationInputs title={""} currentPage={props.currentPage} totalPages={props.totalPages} styleOverride="mb-2"
                handlerCurrentPage={props.handlerCurrentPage} />
            </div>

            {!props.isLoading && props.products && props.products.length === 0 &&
                <div className="dark:text-white  rounded-lg  min-h-[300px] dark:bg-gray-600 bg-gray-300 p-2 w-full  flex items-center justify-center">No items founded</div>
            }
            {props.isLoading &&
                props.isLoading && <div className="flex justify-center"><Spinner /></div>

            }
            {!props.isLoading && props.products && props.products.length > 0 &&
                <div id="shopProductList" className="grid max-[1040px]:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 gap-6 rounded-lg  min-h-[300px] dark:bg-gray-600 bg-gray-300 p-2">
                    {
                        props.products.map((product) => {
                            return <div key={product.id} className="w-full min-[1040px]:w-[258px]">
                                <ShopProductImageGallery product={product} onClick={function (id: number): void {
                                    throw new Error("Function not implemented.");
                                }} /></div>
                        })
                    }
                </div>
            }
        </div>
    );
}

interface ProductImageGalleryProps {
    product: ProductDTO;
    onClick: (id: number) => void;
}

export const ShopProductImageGallery = (props: ProductImageGalleryProps): React.JSX.Element => {
    return (
        <div id={"ShopProductElementGallery" + props.product.id} className="h-[300px] min-w-[258px]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onClick={() => props.onClick(props.product.id)}>
            <div id={"ShopImageProductGallery" + props.product.id} className="w-[220px] mt-[20px] mx-auto  h-[140px]">
                {props.product.imageUrl &&
                    <img className="h-[140px] max-w-full rounded-lg object-cover mx-auto text-center dark:text-white" src={props.product.imageUrl} alt="error loading image" />
                }
                {!props.product.imageUrl &&
                    <div id="divNoImageSet" className="h-[140px] max-w-full rounded-lg">
                        <ImagePlaceholder />
                    </div>
                }
            </div>
            <div id={`textShopProductGallery${props.product.id}`} className="mt-[10px] max-w-full h-[120px] mx-1 text-center  overflow-auto ">
                <p id={`1textShopProductGallery${props.product.id}`} className="h-1/2 w-full text-2xl font-bold text-gray-900 dark:text-white  leading-8 whitespace-nowrap ">
                    {props.product.name}
                </p>
                <p id={`1textShopProductGallery${props.product.id}`} className="h-1/2 w-full text-2xl font-bold text-gray-900 dark:text-white  leading-8 ">
                    {props.product.price + "€"}
                </p>

            </div>
        </div>
    );
}

