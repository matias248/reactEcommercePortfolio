import { useEffect, useRef, useState } from 'react';


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
    let textModif = (stringToChange+"").split(',').join('.').trim();
    if(isNaN(+textModif)){
        return textModif;
    }
    return +textModif;
}

//local methods 
export function getNextId(array:{id:number}[]) {

    let i=1;
    while(i<=array.length+1 && array.some((element)=>{return element.id === i})){
      i++;
    }
    return i;
  }