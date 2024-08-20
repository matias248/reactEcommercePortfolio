import { useEffect, useRef, useState } from 'react';
import { AppNames } from '../constants';
import { StoreDTO } from '../../models/Store';
import { arrayCategoryType, arrayCurrencyType, arrayInventoryStatusType, currencyType, ProductDTO } from '../../models/Product';
import { CartItemDTO } from '../../models/CartItem';
import Decimal from 'decimal.js';

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

const isElementScrolledDown = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();

    return (
        rect.top >= -rect.height
    );
};

export function useIsComponentScrolledDown() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleVisibility = () => {
            if (ref.current) {
                setIsVisible(isElementScrolledDown(ref.current));
            }
        };
        // Initial check
        handleVisibility();
        // Optionally, you can add event listeners to track visibility on scroll or resize
        window.addEventListener('scroll', handleVisibility);
        window.addEventListener('resize', handleVisibility);

        // Clean up event listeners on component unmount
        return () => {
            window.removeEventListener('scroll', handleVisibility);
            window.removeEventListener('resize', handleVisibility);
        };
    }, []);



    return { ref, isVisible };
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
    let cartItem: CartItemDTO = { quantity: quantityInCart, name: product.name, price: product.price, id: product.id, description: product.description, imageUrl: product.imageUrl, currency: product.currency }
    return cartItem;
}

export function getQuantityOfProductInCartShop(cartShopList: CartItemDTO[], idOfProduct: number): number {
    let indexOfProduct = cartShopList.findIndex((cartItem) => cartItem.id === idOfProduct)
    return indexOfProduct !== -1 ? cartShopList[indexOfProduct].quantity : 0;
}

export function getTotalPriceCart(cartShopList: CartItemDTO[]): string {
    let totalSum = cartShopList.reduce((accumulator, currentValue) => {
        const currencyIndex = getCurrencyIndexOfACartItem(currentValue);
        return accumulator.plus(
            new Decimal(currentValue.price)
                .times(currencyIndex)
                .times(currentValue.quantity)
        );

    }, new Decimal(0));

    return formatPrice(totalSum.toNumber());
}

export function getCurrencyIndexOfACartItem(cartItem: CartItemDTO) {
    if (cartItem.currency === currencyType.STERLING) {
        return new Decimal(1.19);
    }
    else if (cartItem.currency === currencyType.DOLLAR) {
        return new Decimal(0.92);
    }
    else {
        return new Decimal(1);
    }
}
export function formatPrice(number: number): string {
    return number.toLocaleString('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

export function formatInputNumber(number: number): string {
    return number.toLocaleString('fr-FR', {
        maximumFractionDigits: 0,
    });
}

export function formatString(input: string): string {
    if (input.length === 0) {
        return "";
    }

    let result = input[0].toUpperCase();

    for (let i = 1; i < input.length; i++) {
        const char = input[i];
        if (char >= 'A' && char <= 'Z') {
            result += ' ' + char.toLowerCase();
        } else {
            result += char;
        }
    }

    return result;
}

export function getTotalProductsElements(cartShopList: CartItemDTO[]): number {
    let totalElements = cartShopList.reduce((accumulator, currentValue) => {
        return currentValue.quantity + accumulator;
    }, 0);

    return totalElements;
}

export function productVerificationRestrictFields(productDTO: ProductDTO): boolean {
    let category = productDTO.category;
    let inventoryStatus = productDTO.inventoryStatus;
    let currency = productDTO.currency;
    if (!arrayCategoryType.includes(category)) {
        return false;
    }
    if (!arrayCurrencyType.includes(currency)) {
        return false;
    }
    if (!arrayInventoryStatusType.includes(inventoryStatus)) {
        return false;
    }
    return true;
}