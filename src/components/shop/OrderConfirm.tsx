import { useClickOutside } from "../../utils/sharedComponents/utilsFunctions";

export const OrderConfirmModal = (props: { functionToDo: () => void }): React.JSX.Element => {
    const { ref } = useClickOutside(() => props.functionToDo());

    return (<>
        <div id="orderConfirmModal" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%)]">
            <div className="relative w-full max-w-2xl max-h-full m-4 " ref={ref}>
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border-2 border-gray-300  dark:border-gray-800">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Order Accepted
                        </h3>
                        <button onClick={props.functionToDo} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                            <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Thank you for your order! We have successfully received and considered your request.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
