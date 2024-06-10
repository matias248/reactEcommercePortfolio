import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { CancelButton, DeleteButton, InputOfStringForm, InputOfUrlImagesForm, ValidateButton } from "../../utils/sharedComponents/inputsComponentReactForms";
import { DESCRIPTION_RESTRICTION, NAME_RESTRICTION, REGEX } from "../../utils/constants";
import { getUrlStoreList } from "../../routes/RoutesConfigs";
import { StoreDTO } from "../../models/Store";
import { useEffect, useState } from "react";
import { createStoreById, deleteStoreById, getStoreById, updateStoreById } from "../../services/storeService";
import { replaceTextNumberPerNumber } from "../../utils/sharedComponents/utilsFunctions";
import { ContextPathData } from "../BaseTemplate";
import { NavigationRouter, NavigationRouterInterface } from "../../routes/NavigationRouter";
import { DisplayNotFound } from "../DisplayError";


interface StoreFormProps {

}

const setValuesOfTheInputs = (storeId: number, functionToDo: (store: StoreDTO) => void) => {
  getStoreById(storeId).then((response) => {
    functionToDo(response);
  }).catch((error) => {
    console.error('Error loading store');
  })
}

export const StoreForm = (props: StoreFormProps): React.JSX.Element => {
  const { storeId } = useParams();
  const [store, setStore] = useState<StoreDTO>();

  const title = storeId !== "new" ? "Edit the store" : "Create a new store";
  const pathData: ContextPathData = useOutletContext();
  const navigationRouter: NavigationRouterInterface = NavigationRouter();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StoreDTO>({
    values: store

  })
  useEffect(() => {
    if (storeId !== "new" && !isNaN(+(storeId ?? NaN))) {
      setValuesOfTheInputs(+(storeId ?? 0), (store) => {
        setStore(store);
        pathData.handlerPathData({ inProducts: false, inStores: true, storeName: store.name, productName: undefined, storeId: store.id, productId: undefined })
      });
    }
    else {
      let newStore: StoreDTO = { id: -1, name: "", currency: "", contactPhone: "0", imageUrl: "", address: { state: "", streetNumber: "", streetName: "", city: "", zipCode: "" }, location: { latitude: 0, longitude: 0 } };
      setStore(newStore);
    }
  }, []);

  const onSubmit: SubmitHandler<StoreDTO> = (data) => {
    if (storeId !== "new" && !isNaN(+(storeId ?? NaN))) {
      updateStoreById(+(storeId ?? 0), data).then((data) => {

        navigationRouter.goToFappListOfStores();

      }).catch((error) => {
        console.error('Error when update');
      })
    }
    else {
      createStoreById(data).then((data) => {
        navigationRouter.goToFappListOfStores();

      }).catch((error) => {
        console.error('Error when create');
      })
    }
  }

  const deleteStore = () => {
    deleteStoreById(+(storeId ?? 0)).then((data) => {
      navigationRouter.goToFappListOfStores();
    }).catch((error) => {
      console.log("Error when delete")
    })

  }



  return <>
    {store &&
      <div className="flex items-center flex-col pb-4">

        <div className="mb-6 text-5xl text-center mb-16 dark:text-white" >{title}</div>

        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-3/4 ">
          <InputOfUrlImagesForm reactFormProps={{ ...register("imageUrl", { required: false, pattern: REGEX.URL, setValueAs: (value: string) => value.trim() }) }} title={"URL"} errorShouldDisplay={errors.imageUrl ? true : false} required={false} currentValue={watch("imageUrl")} />
          <div className="flex gap-4">
            <InputOfStringForm numberOfLines={1} reactFormProps={{ ...register("name", { required: true, maxLength: NAME_RESTRICTION, setValueAs: (value: string) => value.trim() }) }} title={"Name"} errorShouldDisplay={errors.name ? true : false} required={true} />
            <InputOfStringForm numberOfLines={1} reactFormProps={{ ...register("address.city", { required: true, maxLength: NAME_RESTRICTION, setValueAs: (value: string) => value.trim() }) }} title={"City"} errorShouldDisplay={errors.address?.city ? true : false} required={true} />
          </div>
          <div className="flex gap-4">
            <InputOfStringForm numberOfLines={1} reactFormProps={{ ...register("currency", { required: true, setValueAs: (value: string) => value.trim() }) }} title={"Currency"} errorShouldDisplay={errors.currency ? true : false} required={true} />
            <InputOfStringForm numberOfLines={1} reactFormProps={{ ...register("address.state", { required: true, maxLength: NAME_RESTRICTION, setValueAs: (value: string) => value.trim() }) }} title={"State"} errorShouldDisplay={errors.address?.state ? true : false} required={true} />
          </div>
          <div className="flex gap-4">
            <InputOfStringForm numberOfLines={1} reactFormProps={{ ...register("address.zipCode", { required: true, setValueAs: (value: string) => value.trim() }) }} title={"Zipcode"} required={true} errorShouldDisplay={errors.address?.zipCode ? true : false} />
            <InputOfStringForm numberOfLines={1} reactFormProps={{ ...register("address.streetNumber", { required: true, pattern: REGEX.ONLYNUMBERS, setValueAs: (value: string) => value.trim() }) }} title={"Street Number"} errorShouldDisplay={errors.address?.streetNumber ? true : false} />
          </div>
          <InputOfStringForm numberOfLines={1} reactFormProps={{ ...register("address.streetName", { required: true, maxLength: DESCRIPTION_RESTRICTION, setValueAs: (value: string) => value.trim() }) }} title={"Street Name"} required={true} errorShouldDisplay={errors.address?.streetName ? true : false} />
          <div className="flex gap-4">
            <InputOfStringForm numberOfLines={1} reactFormProps={{ ...register("location.latitude", { required: true, pattern: REGEX.LATITUDE, setValueAs: (value: string) => replaceTextNumberPerNumber(value) }) }} title={"Latitude"} required={true} errorShouldDisplay={errors.location?.latitude ? true : false} />
            <InputOfStringForm numberOfLines={1} reactFormProps={{ ...register("location.longitude", { required: true, pattern: REGEX.LONGITUDE, setValueAs: (value: string) => replaceTextNumberPerNumber(value) }) }} title={"Longitude"} required={true} errorShouldDisplay={errors.location?.longitude ? true : false} />
          </div>
          {(storeId !== "new" && !isNaN(+(storeId ?? NaN))) && <div className=" md:gap-28   w-40 min-h-8  mb-8 md:mb-4">
            <DeleteButton functionToDo={() => deleteStore()} title={"Delete Store"}></DeleteButton>
          </div>}
          <div className="grid md:grid-cols-2 md:gap-28 gap-4 mt-4 mx-auto md:w-80 min-h-14 ">
            <ValidateButton functionToDo={() => { }} title={"Submit"} />
            <CancelButton functionToDo={() => { navigationRouter.goToFappListOfStores() }} title={"Cancel"} />
          </div>
        </form>
      </div>
    }
    {
      !store && <DisplayNotFound/>
    }

  </>

}
