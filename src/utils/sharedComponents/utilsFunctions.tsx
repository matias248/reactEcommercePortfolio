import { useEffect, useRef, useState } from 'react';
import { AppNames } from '../constants';
import { StoreDTO } from '../../models/Store';
import { ProductDTO } from '../../models/Product';


export function useClickOutside(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<HTMLDivElement | null>(null);
    const ref2 = useRef<HTMLDivElement | null>(null);


    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current) {
            if (!ref.current.contains(event.target as Node) && (ref2.current == null)) {
                setIsComponentVisible(false);
            }
        }
        if (ref2.current) {
            if (ref2.current.contains(event.target as Node)) {
                setIsComponentVisible(true);
            }
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

    return { ref, ref2, isComponentVisible, setIsComponentVisible };
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