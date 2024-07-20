import { useEffect, useRef, useState } from 'react';
import { AppNames } from '../constants';
import { StoreDTO } from '../../models/Store';
import { ProductDTO } from '../../models/Product';
import { CartItemDTO } from '../../models/CartItem';




export function useClickOutside(functionToDo: () => void) {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClickOutInside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            functionToDo();
        }
    };

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            handleClickOutInside(event);
        };

        document.addEventListener('mousedown', handleDocumentClick);

        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);

    return { ref };
}

export function useSideBarLogic(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const button = useRef<HTMLDivElement | null>(null);
    const dialog = useRef<HTMLDivElement | null>(null);


    const handleClickOutside = (event: MouseEvent) => {
        if (dialog.current && !dialog.current.contains(event.target as Node)) {
            return setIsComponentVisible(false);
        }

        if (button.current && button.current.contains(event.target as Node)) {
            setIsComponentVisible(true);
        }
    };

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            handleClickOutside(event);
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return { button, dialog, isComponentVisible };
}

export function replaceTextNumberPerNumber(stringToChange: string) {
    let textModif = (stringToChange + "").split(',').join('.').trim();
    if (isNaN(+textModif)) {
        return textModif;
    }
    return +textModif;
}

//local methods 
export function getNextId(array: { id: number }[]) {

    let i = 1;
    while (i <= array.length + 1 && array.some((element) => { return element.id === i })) {
        i++;
    }
    return i;
}


export const getCurrentApp = (pathName: string): AppNames | undefined => {
    if (pathName.startsWith("/stores")) {
        return AppNames.FORMS
    }
    else if (pathName.startsWith("/finance")) {
        return AppNames.FINANCE
    }
    else if (pathName.startsWith("/shop")) {
        return AppNames.SHOP
    }
}


export function joinArrayWithComma(arr: string[]): string {
    return arr.join(',');
}

export function getTrueKeys(map: Map<string, boolean>): string[] {
    const result: string[] = [];
    map.forEach((value, key) => {
        if (value === true) {
            result.push(key);
        }
    });
    return result;
}

export function getPaginatedItems(array: any[], pageIndex: number, itemsPerPage: number) {
    if (itemsPerPage < 0 || pageIndex < 0) {
        return [];
    }
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return array.slice(startIndex, endIndex);
}

export function calculateTotalPages(totalItems: number, itemsPerPage: number) {
    if (itemsPerPage <= 0) {
        return Math.ceil(totalItems / 10);
    }
    return Math.ceil(totalItems / itemsPerPage);
}

export function filterStores(stores: StoreDTO[], text: string): StoreDTO[] {
    const textLower = text.toLowerCase();
    return stores.filter(store =>
        store.name.toLowerCase().includes(textLower) ||
        store.address.city.toLowerCase().includes(textLower) ||
        store.address.zipCode.includes(textLower)
    );
}

export function productAccordingToTheFilter(product: ProductDTO, text: string, storeId: number | undefined): boolean {
    const textLower = text.toLowerCase();
    return (textLower === "" || product.name.toLowerCase().includes(textLower) || product.description.toLowerCase().includes(textLower)) && (product.storeId === storeId || storeId === undefined);

}

export function productDTOtoCartItemDTO(product: ProductDTO, quantityInCart: number): CartItemDTO {
    let cartItem: CartItemDTO = { quantity: quantityInCart, name: product.name, price: product.price, id: product.id, description: product.description, imageUrl: product.imageUrl }
    return cartItem;
}

export function getQuantityOfProductInCartShop(cartShopList: CartItemDTO[], idOfProduct: number): number {
    let indexOfProduct = cartShopList.findIndex((cartItem) => cartItem.id === idOfProduct)
    return indexOfProduct !== -1 ? cartShopList[indexOfProduct].quantity : 0;
}

export function getTotalPriceCart(cartShopList: CartItemDTO[]): number {
    let totalSum = cartShopList.reduce((accumulator, currentValue) => { return accumulator + currentValue.price * currentValue.quantity }, 0);
    return totalSum
}