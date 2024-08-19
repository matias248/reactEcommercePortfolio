import React, { useEffect, useState } from "react";
import { ShopCategoryList } from "./ShopCategory";
import { arrayCategoryType, ProductDTO } from "../../models/Product";
import { getProductsPublicUrl } from "../../services/productService";
import { getTotalProductsElements, getTrueKeys } from '../../utils/sharedComponents/utilsFunctions'
import { ShopProductList } from "./ShopProductList";
import { StoreDTO } from "../../models/Store";
import { getStores, getStoresFilteredByNameCityCodeZip } from "../../services/storeService";
import { ShopHeader, ShopSelectorInput } from "./ShopHeader";
import { ShopCart } from "./ShopCart";
import { CartItemDTO } from "../../models/CartItem";
import { OrderConfirmModal } from "./OrderConfirm";
import { AnimatePresence } from "framer-motion";


export const ShopTemplate = (): React.JSX.Element => {

    const [products, setProducts] = useState<ProductDTO[]>();
    const [cartShopList, setcartShopList] = useState<CartItemDTO[]>();
    const [cartListVisble, setCartListVisble] = useState<boolean>(false);
    const [orderConfirmModal, setOrderConfirmModal] = useState<boolean>(false);

    const numberOfElementsInCartShop:number = getTotalProductsElements(cartShopList ?? []);


    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>();
    const [shopSelected, setShopSelected] = useState<StoreDTO>();
    const [listOfStores, setListOfStores] = useState<StoreDTO[]>();

    const [shopTextFilter, setShopTextFilter] = useState<string>("");
    const [productTextFilter, setProductTextFilter] = useState<string>("");


    const [filterCategoryMap, setMap] = useState<Map<string, boolean>>(() => {
        const initialMap = new Map<string, boolean>();
        arrayCategoryType.forEach(item => initialMap.set(item, false));
        return initialMap;
    });

    const handlerCurrentPage = (page: number) => {
        setCurrentPage(page)
    }
    const handlerOrderConfirmModal = (value: boolean) => {
        setOrderConfirmModal(value)
    }

    const handlerShopTextFilter = (text: string) => {
        setShopTextFilter(text)
    }

    const changeQuantityInCartShop = (shopItem: CartItemDTO, quantity: number) => {
        let indexOfShopItemInTheArray: number = -1;
        if (quantity === 0) {
            let newArray = cartShopList?.filter((element) => {
                return element.id !== shopItem.id;
            })
            setcartShopList(newArray)
        }
        else {
            cartShopList?.forEach((element, index) => {
                if (element.id === shopItem.id) {
                    indexOfShopItemInTheArray = index;
                }
            });
            if (indexOfShopItemInTheArray === -1 || cartShopList === undefined) {
                let newCartItem: CartItemDTO = shopItem;
                newCartItem.quantity = quantity;
                if (cartShopList) {
                    setcartShopList([newCartItem, ...cartShopList]);
                }
                else {
                    setcartShopList([newCartItem]);
                }
            }
            else {
                let newCartShopList = [...cartShopList];
                newCartShopList[indexOfShopItemInTheArray].quantity = quantity;
                setcartShopList(newCartShopList);
            }
        }
    }
    const handlerProductTextFilter = (text: string) => {
        setProductTextFilter(text)
    }

    const handlerStoreSelected = (store: StoreDTO) => {
        setShopSelected(store);
    }

    const updateFilterCategoryMap = (key: string, value: boolean) => {
        setMap(prevMap => {
            const newMap = new Map(prevMap);
            newMap.set(key, value);
            return newMap;
        });
    };

    useEffect(() => {
        getProductsPublicUrl(getTrueKeys(filterCategoryMap), currentPage !== 0 ? currentPage : 1, 10, productTextFilter, shopSelected?.id).then((data) => {
            setProducts(data.products);
            setTotalPages(data.totalPages);
            setIsLoading(false);
        }).catch((error) => {
            console.error('Error loading products filtered');
        })
        setIsLoading(false)
    }, [filterCategoryMap, currentPage, shopSelected]);

    useEffect(() => {
        getStores().then((stores) => {
            setListOfStores(stores);
        }).catch((error) => {
            console.error('Error loading stores');
        })
    }, []);

    const getFilteredStores = (textFilter: string) => {
        getStoresFilteredByNameCityCodeZip(textFilter).then(
            (storesFiltered) => {
                setListOfStores(storesFiltered)
            }
        )
    }

    const getFilteredProducts = (textFilter: string) => {
        getProductsPublicUrl(getTrueKeys(filterCategoryMap), currentPage !== 0 ? currentPage : 1, 10, textFilter, shopSelected?.id).then((data) => {
            setProducts(data.products);
            setTotalPages(data.totalPages);
            setIsLoading(false);
        }).catch((error) => {
            console.error('Error loading products filtered');
        })
    }

    return (
        <div className="pb-4">
            {orderConfirmModal &&
                <OrderConfirmModal functionToDo={() => { handlerOrderConfirmModal(false); setcartShopList([]); setCartListVisble(false) }} />
            }
            <AnimatePresence>
                {cartListVisble &&
                    <ShopCart handlerCartListVisble={(value: boolean) => setCartListVisble(value)} cart={cartShopList} changeQuantityInCartShop={changeQuantityInCartShop} handlerOrderConfirmModal={() => handlerOrderConfirmModal(true)} />
                }
            </AnimatePresence>

            <ShopHeader storesList={listOfStores} selectedStore={shopSelected} handlerSelectedInput={handlerStoreSelected} handlerShopTextFilter={handlerShopTextFilter} updadeStoresByFilter={() => getFilteredStores(shopTextFilter)} updadeProductsByFilter={() => getFilteredProducts(productTextFilter)}
                textFilterShop={shopTextFilter} textFilterProduct={productTextFilter} handlerProductTextFilter={handlerProductTextFilter} handlerCartListVisble={(value: boolean) => setCartListVisble(value)} numberOfElementsInCartShop={numberOfElementsInCartShop} />
            <div className=" block sm:hidden  ml-[5%] w-[188px] mb-4">
                <ShopSelectorInput storesList={listOfStores} selectedStore={shopSelected} handlerSelectedInput={handlerStoreSelected} handlerShopTextFilter={handlerShopTextFilter} shopTextFilter={shopTextFilter} updadeStoresByFilter={() => getFilteredStores(shopTextFilter)} />
            </div>
            <div className="mb-4">
                <ShopCategoryList updateFilterCategoryMap={updateFilterCategoryMap} filterCategoryMap={filterCategoryMap} />
            </div>
            <ShopProductList products={products} isLoading={isLoading} currentPage={currentPage} totalPages={totalPages ?? 1} handlerCurrentPage={handlerCurrentPage} cartShopList={cartShopList ?? []} changeQuantityInCartShop={changeQuantityInCartShop} />
        </div>
    );
}







