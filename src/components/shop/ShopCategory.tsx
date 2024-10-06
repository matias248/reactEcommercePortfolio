import React from "react";
import { ReactComponent as CrossIcon } from "../../assets/images/crossIcon.svg";
import { ReactComponent as VerifyIcon } from "../../assets/images/verifyIcon.svg";

interface ShopCategoryListInterface {
    updateFilterCategoryMap: (key: string, value: boolean) => void;
    filterCategoryMap: Map<string, boolean>;
}

export const ShopCategoryList = (props: ShopCategoryListInterface): React.JSX.Element => {
    const title = "Our Categories";

    return (
        <div id="categoryListContainer" className="max-w-[1200px] mx-auto w-[90%] rounded-lg">
            <div id="categoryListTitle" className="dark:text-white text-lg">{title}</div>
            <div id="categoryList" className="flex gap-1 flex-wrap">
                {
                    Array.from(props.filterCategoryMap.entries()).map(([key, value], index) => {
                        return <ShopCategoryItem id={index} category={key} filterOn={value} onChange={() => props.updateFilterCategoryMap(key, !value)} key={key} />
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
    id: number;
}

export const ShopCategoryItem = (props: ShopCategoryItemInterface): React.JSX.Element => {

    return <div id={`ShopCategoryItem${props.id}`} onClick={() => { props.onChange() }} className={"dark:text-white rounded-lg px-2 flex  " + (props.filterOn ? "bg-blue-500" : "bg-gray-500")}>
        {
            !props.filterOn && <div className="dark:fill-white size-[20px] self-center "><CrossIcon /> </div>
        }
        {
            props.filterOn && <div className="dark:fill-white size-[20px] self-center "><VerifyIcon /> </div>
        }
        <div>{props.category}</div>
    </div>
}

