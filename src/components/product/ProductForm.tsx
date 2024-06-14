import { useOutletContext, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { CancelButton, DeleteButton, InputOfNumberForm, InputOfStringForm, InputOfUrlImagesForm, InputSwitchForm, ValidateButton } from "../../utils/sharedComponents/inputsComponentReactForms";
import { DESCRIPTION_RESTRICTION, descriptionRestrictionMessage, NAME_RESTRICTION, nameRestrictionMessage, onlyNumbersRestrictionMessage, REGEX } from "../../utils/constants";
import { useEffect, useState } from "react";
import { arrayCategoryType, arrayInventoryStatusType, ProductDTO } from "../../models/Product";
import { createProductById, deleteProductById, getProductByIdWithstore, updateProductById } from "../../services/productService";
import { replaceTextNumberPerNumber } from "../../utils/sharedComponents/utilsFunctions";
import { ContextPathData } from "../BaseTemplate";
import { StoreDTO } from "../../models/Store";
import { NavigationRouter, NavigationRouterInterface } from "../../routes/NavigationRouter";
import { DisplayNotFound } from "../DisplayError";
import { ReactComponent as Spinner } from "../../assets/images/spinner.svg";


interface ProductFormProps {

}



const setValuesOfTheInputs = (storeId: number, productId: number, functionToDo: (data: { store: StoreDTO, product: ProductDTO }) => void) => {

    getProductByIdWithstore(storeId, productId).then((data) => {
        functionToDo(data);
    }).catch((error) => {
        console.error('Error loading products');
    })

}

export const ProductForm = (props: ProductFormProps): React.JSX.Element => {
    const { storeId, productId } = useParams();
    const [product, setProduct] = useState<ProductDTO>();
    const pathData: ContextPathData = useOutletContext();
    const navigationRouter: NavigationRouterInterface = NavigationRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        if (productId !== "new" && !isNaN(+(productId ?? NaN))) {
            setValuesOfTheInputs(+(storeId ?? 0), +(productId ?? 0), (data) => {
                setProduct(data.product);
                pathData.handlerPathData({ inProducts: true, inStores: true, storeName: data.store.name, productName: data.product.name, storeId: data.store.id, productId: data.product.id })

            });
        }
        else {
            let newProduct: ProductDTO = { name: "", description: "", price: 0, imageUrl: "", category: arrayCategoryType[0], inventoryStatus: arrayInventoryStatusType[0], id: -1, storeId: -1 };
            setProduct(newProduct);
        }
        setIsLoading(false)
    }, []);

    const title = productId !== "new" ? "Edit the product" : "Create a new product";
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ProductDTO>({
        values: product
    })




    const onSubmit: SubmitHandler<ProductDTO> = (data) => {
        if (productId !== "new" && !isNaN(+(productId ?? NaN))) {

            updateProductById(+(storeId ?? 0), +(productId ?? 0), data).then((data) => {

                navigationRouter.goToFappListOfProducts(storeId ? +storeId : -1);

            }).catch((error) => {
                console.error('Error when update');
            })
        }
        else {
            createProductById(+(storeId ?? 0), data).then((data) => {

                navigationRouter.goToFappListOfProducts(storeId ? +storeId : -1);

            }).catch((error) => {
                console.error('Error when create');
            })
        }
    }

    const deleteProduct = () => {
        deleteProductById(+(storeId ?? 0), +(productId ?? 0)).then((data) => {
            navigationRouter.goToFappListOfProducts(storeId ? +storeId : -1);
        }).catch((error) => {
            console.log("Error when delete")
        })

    }


    return <>
        {!isLoading && product &&
            <div className="flex items-center flex-col pb-4">
                <div className="mb-6 text-5xl text-center mb-16 dark:text-white" >{title}</div>

                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-3/4">
                    <InputOfUrlImagesForm reactFormProps={{ ...register("imageUrl", { required: false, maxLength: DESCRIPTION_RESTRICTION, setValueAs: (value: string) => value.trim() }) }} title={"URL"} errorShouldDisplay={errors.imageUrl ? true : false} required={false} currentValue={watch("imageUrl")} helpText={descriptionRestrictionMessage} />
                    <InputOfStringForm numberOfLines={1} reactFormProps={{ ...register("name", { required: true, maxLength: NAME_RESTRICTION, setValueAs: (value: string) => value.trim() }) }} title={"Name"} errorShouldDisplay={errors.name ? true : false} required={true} helpText={nameRestrictionMessage} />
                    <InputOfStringForm numberOfLines={4} reactFormProps={{ ...register("description", { required: true, maxLength: DESCRIPTION_RESTRICTION, setValueAs: (value: string) => value.trim() }) }} title={"Description"} errorShouldDisplay={errors.description ? true : false} required={true} helpText={descriptionRestrictionMessage} />
                    <InputOfNumberForm reactFormProps={{ ...register("price", { required: true, pattern: REGEX.NUMBERS_DOTS_COMMAS, setValueAs: (value: string) => replaceTextNumberPerNumber(value) }) }} title={"Price"} errorShouldDisplay={errors.price ? true : false} required={true} helpText={onlyNumbersRestrictionMessage} />
                    <InputSwitchForm options={arrayCategoryType} optionSelected={watch("category")} reactFormProps={{ ...register("category", { required: true, setValueAs: (value: string) => value.trim() }) }} title={"Category"} />
                    <InputSwitchForm options={arrayInventoryStatusType} optionSelected={watch("inventoryStatus")} reactFormProps={{ ...register("inventoryStatus", { required: true, setValueAs: (value: string) => value.trim() }) }} title={"Inventory status"} />
                    {(productId !== "new" && !isNaN(+(productId ?? NaN))) && <div className=" md:gap-28 mt-4  w-40 min-h-8  mb-8 md:mb-4">
                        <DeleteButton functionToDo={() => deleteProduct()} title={"Delete Product"}></DeleteButton>
                    </div>}
                    <div className="grid md:grid-cols-2 md:gap-28 gap-4 mt-4 mx-auto md:w-80 min-h-14 ">
                        <ValidateButton functionToDo={() => { }} title={"Submit"} />
                        <CancelButton functionToDo={() => navigationRouter.goToFappListOfProducts(storeId ? +storeId : -1)} title={"Cancel"} />
                    </div>
                </form>
            </div>
        }
        {
            !isLoading && !product && <DisplayNotFound />
        }
        {
            isLoading && <div className="flex justify-center"><Spinner /></div>
        }
    </>


}
