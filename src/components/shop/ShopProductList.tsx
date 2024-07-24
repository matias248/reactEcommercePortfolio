import React, { useState } from "react";
import { ProductDTO } from "../../models/Product";
import { ReactComponent as Spinner } from "../../assets/images/spinner.svg";
import { ReactComponent as ImagePlaceholder } from "../../assets/images/iconImagePlaceholder.svg";
import { MinusPlusInput, NavigationInputs } from "../../utils/sharedComponents/inputsComponentReactForms";
import { ReactComponent as CrossIcon } from "../../assets/images/crossIcon.svg";
import { getQuantityOfProductInCartShop, productDTOtoCartItemDTO } from "../../utils/sharedComponents/utilsFunctions";
import { CartItemDTO } from "../../models/CartItem";



interface ShopProductListInterface {
    products: ProductDTO[] | undefined;
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    handlerCurrentPage: (page: number) => void;
    changeQuantityInCartShop: (shopItem: CartItemDTO, quantity: number) => void;
    cartShopList: CartItemDTO[];
}

export const ShopProductList = (props: ShopProductListInterface): React.JSX.Element => {


    return (
        <div id="shopProductListContainer" className="max-w-[1200px] mx-auto w-[90%] flex flex-col ">
            <div className="self-end"><NavigationInputs title={""} currentPage={props.currentPage} totalPages={props.totalPages} styleOverride="mb-2"
                handlerCurrentPage={props.handlerCurrentPage} />
            </div>

            {!props.isLoading && (props.products === undefined || (props.products && props.products.length === 0)) &&
                <div className="dark:text-white  rounded-lg  min-h-[300px] dark:bg-gray-600 bg-gray-300 p-2 w-full  flex items-center justify-center">No items founded</div>
            }
            {props.isLoading &&
                props.isLoading && <div className="flex justify-center"><Spinner /></div>

            }
            {!props.isLoading && props.products && props.products.length > 0 &&
                <div id="shopProductList" className="grid max-[1040px]:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 gap-6 rounded-lg  min-h-[300px] dark:bg-gray-600 bg-gray-300 p-2">
                    {
                        props.products.map((product) => {
                            return <div key={product.id} className="w-full min-[1040px]:w-[258px]" id={"ShopProductElementGalleryContainer" + product.id}>
                                <ShopProductImageGallery cartItem={productDTOtoCartItemDTO(product, getQuantityOfProductInCartShop(props.cartShopList, product.id))} changeQuantityInCartShop={props.changeQuantityInCartShop} /></div>
                        })
                    }
                </div>
            }
        </div>
    );
}

interface ProductImageGalleryProps {
    cartItem: CartItemDTO;
    changeQuantityInCartShop: (shopItem: CartItemDTO, quantity: number) => void;
}

export const ShopProductImageGallery = (props: ProductImageGalleryProps): React.JSX.Element => {

    const [showDescription, setshowDescription] = useState<boolean>(false);

    const wrapperchangeQuantityInCartShop = (quantity: number) => {
        props.changeQuantityInCartShop(props.cartItem, quantity)
    }

    return (
        <div id={"ShopProductElementGallery" + props.cartItem.id} className="h-[18.75rem] min-w-64  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >

            {!showDescription && <>
                <div id={"ShopImageProductGallery" + props.cartItem.id} className="w-56 mt-[0.5rem] mx-auto  h-[7rem] ">
                    {props.cartItem.imageUrl &&
                        <img className="h-[7rem] max-w-full rounded-lg object-cover mx-auto text-center dark:text-white" src={props.cartItem.imageUrl} alt="error loading image" />
                    }
                    {!props.cartItem.imageUrl &&
                        <div id="divNoImageSet" className="h-[7rem] max-w-full rounded-lg">
                            <ImagePlaceholder />
                        </div>
                    }
                </div>
                <div id={`textShopProductGallery${props.cartItem.id}`} className="mt-[0.5rem] max-w-full h-[6rem] mx-1 text-center overflow-auto">
                    <div id={`1textShopProductGallery${props.cartItem.id}`} className="w-full">
                        <div className=" text-2xl font-bold text-gray-900 dark:text-white  leading-8 whitespace-nowrap">{props.cartItem.name}</div>
                    </div>
                    <div className="w-full">
                        <p id={`2textShopProductGallery${props.cartItem.id}`} className=" text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap leading-8">
                            {props.cartItem.price + props.cartItem.currency}
                        </p>
                    </div>
                    <div className="flex flex-row-reverse items-center  max-[1040px]:justify-center" onClick={() => { setshowDescription(!showDescription) }}>
                        <button id={"learnMore" + props.cartItem.id} className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Learn more</button>
                    </div>
                </div>
                <div>
                    <div className=" h-[4rem] flex justify-center items-center rounded-lg">
                        <MinusPlusInput modifyValue={wrapperchangeQuantityInCartShop} value={props.cartItem.quantity} title={""} id={"minusPlusProductItem" + props.cartItem.id} />
                    </div>
                </div>

            </>}
            {showDescription && <>
                <div id={"descriptionProductCrossIcon" + props.cartItem.id} className="size-[3rem] " onClick={() => { setshowDescription(!showDescription) }}>
                    <CrossIcon className="dark:fill-white" />
                </div>
                <div id={"descriptionProductText" + props.cartItem.id} className="dark:text-white overflow-y-auto  h-[15.25rem] mx-1">{props.cartItem.description} </div>
            </>
            }
        </div>
    );
}

