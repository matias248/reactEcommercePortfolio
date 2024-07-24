import { CartItemDTO } from "../../models/CartItem";
import { ReactComponent as ImagePlaceholder } from "../../assets/images/iconImagePlaceholder.svg";
import { MinusPlusInput } from "../../utils/sharedComponents/inputsComponentReactForms";
import { ReactComponent as CrossIcon } from "../../assets/images/crossIcon.svg";
import { getTotalPriceCart } from "../../utils/sharedComponents/utilsFunctions";
import { motion } from "framer-motion";

interface ShopCartInterface {
    cart: CartItemDTO[] | undefined;
    changeQuantityInCartShop: (shopItem: CartItemDTO, quantity: number) => void;
    handlerCartListVisble: (isVisible: boolean) => void
    handlerOrderConfirmModal: () => void
}

export const ShopCart = (props: ShopCartInterface) => {

    const totalPriceCart = getTotalPriceCart(props.cart ?? []);


    return (<>
        <motion.div initial={{ x: '+100%' }}
        animate={{ x: 0 }}
        exit={{x:'+100%'}}
        transition={{ duration: 0.6 }} className="fixed h-screen bg-gray-300 dark:bg-gray-500 top-0 right-0 max-[460px]:w-[60%] w-[40%] md:w-[30%] z-10 rounded-l-lg flex flex-col gap-1 px-2 ">
            <div id="crossShopCart" className="size-[2.5rem] relative -left-1" onClick={() => { props.handlerCartListVisble(false) }}>
                <CrossIcon className="dark:fill-white" />
            </div>
            <div className="dark:text-white font-bold self-center  text-xl ">Cart shop</div>
            <div className="flex-1 overflow-auto mb-2">
                <ShopCartInputList cartItems={props.cart} changeQuantityInCartShop={props.changeQuantityInCartShop} />
            </div>
            <div className="mb-2">
                <div className="dark:text-white text-xl overflow-x-auto whitespace-nowrap">Total: {totalPriceCart} €</div>
            </div>
            <div className="mb-2">
                <ShopButtonConfirm styleOverride="" functionToDo={() => { if (props.cart && props.cart.length > 0) props.handlerOrderConfirmModal() }} title={"Submit Order"} />
            </div>
        </motion.div>
    </>
    )
}


const ShopCartInputList = (props: { cartItems: CartItemDTO[] | undefined, changeQuantityInCartShop: (shopItem: CartItemDTO, quantity: number) => void }) => {


    return (
        <div className="flex flex-col gap-1  overflow-auto h-[100%]  ">
            {props.cartItems && props.cartItems.map((currentValue) => {
                return <ShopCartInputItem cartItem={currentValue} key={currentValue.id} changeQuantityInCartShop={props.changeQuantityInCartShop} />
            })}

            {(props.cartItems === undefined || props.cartItems?.length === 0) && <div id="emptyCartShop" className=" dark:text-white text-center  my-auto">The cart shop is empty</div>}
        </div>
    )
}

const ShopCartInputItem = (props: {
    cartItem: CartItemDTO;
    changeQuantityInCartShop: (shopItem: CartItemDTO, quantity: number) => void;
}) => {

    const wrapperchangeQuantityInCartShop = (quantity: number) => {
        props.changeQuantityInCartShop(props.cartItem, quantity)
    }

    return (
        <div id={"ShopCartItem" + props.cartItem.id} className={"h-[13.75rem] w-full min-w-128 md:min-w-56 bg-white  rounded-lg shadow dark:bg-gray-800  p-1 "}>
            <div id={"ShopCartItemImage" + props.cartItem.id} className="size-[4.5rem] mt-[0.5rem] mx-auto ">

                {props.cartItem.imageUrl &&
                    <img className="h-full max-w-full rounded-lg object-cover mx-auto text-center dark:text-white" src={props.cartItem.imageUrl} alt="error loading image" />
                }
                {!props.cartItem.imageUrl &&
                    <div id="divNoImageSet" className="h-full max-w-full rounded-lg">
                        <ImagePlaceholder />
                    </div>
                }
            </div>
            <div id={`textShopCart${props.cartItem.id}`} className="mt-[0.5rem] max-w-full h-[3.5rem] mx-1 text-center overflow-auto ">
                <div id={`1textShopCartItem${props.cartItem.id}`} className="w-full ">
                    <div className=" text-xl font-bold text-gray-900 dark:text-white  leading-7 whitespace-nowrap">{props.cartItem.name}</div>
                </div>
                <div className="w-full">
                    <p id={`2textShopCartItem${props.cartItem.id}`} className=" text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap  leading-7">
                        {props.cartItem.price + "€"}
                    </p>
                </div>
            </div>
            <div>
                <div className=" h-[4rem] flex justify-center items-center rounded-lg">
                    <MinusPlusInput modifyValue={wrapperchangeQuantityInCartShop} value={props.cartItem.quantity} title={""} id={"minusPlusCartItem" + props.cartItem.id} />
                </div>
            </div>
        </div>
    )
}


export const ShopButtonConfirm = (props: { functionToDo: () => void, title: string, styleOverride: string }): React.JSX.Element => {
    return <button name="confirmDialogShopButton" onClick={props.functionToDo} className={" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:text-white " + (props.styleOverride ?? "")}>{props.title}</button>
}

