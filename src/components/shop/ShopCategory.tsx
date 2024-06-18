import React, { useState } from "react";
import { arrayCategoryType } from "../../models/Product";
import { ReactComponent as CrossIcon } from "../../assets/images/crossIcon.svg";
import { ReactComponent as VerifyIcon } from "../../assets/images/verifyIcon.svg";


export const ShopCategoryList = (): React.JSX.Element => {
    const title = "Our Categories";
    const [filterCategoryMap, setMap] = useState<Map<string, boolean>>(() => {
        const initialMap = new Map<string, boolean>();
        arrayCategoryType.forEach(item => initialMap.set(item, false));
        return initialMap;
    });

    const updateFilterCategoryMap = (key: string, value: boolean) => {
        setMap(prevMap => {
            const newMap = new Map(prevMap);
            newMap.set(key, value);
            return newMap;
        });
    };

    return (
        <div id="categoryListContainer" className="max-w-[1200px] mx-auto w-[90%] rounded-lg">
            <div id="categoryListTitle" className="dark:text-white text-lg">{title}</div>
            <div id="categoryList" className="flex gap-1">
                {
                    Array.from(filterCategoryMap.entries()).map(([key, value]) => {
                        return <ShopCategoryItem category={key} filterOn={value} onChange={() => updateFilterCategoryMap(key, !value)} />
                    })
                }
            </div>
        </div>
    );
}

interface ShopCategoryItemInterface {
    category: string;
    filterOn: boolean;
    onChange: () => void;
}

export const ShopCategoryItem = (props: ShopCategoryItemInterface): React.JSX.Element => {

    return <div onClick={() => { props.onChange() }} className={"dark:text-white rounded-lg px-2 flex gap-1 " + (props.filterOn ? "bg-blue-500" : "bg-gray-500")}>
        {
            !props.filterOn && <div className="dark:fill-white size-[20px] self-center "><CrossIcon /> </div>

        }
        {
            props.filterOn && <div className="dark:fill-white size-[20px] self-center "><VerifyIcon /> </div>

        }

        <div>{props.category}</div>
    </div>
}