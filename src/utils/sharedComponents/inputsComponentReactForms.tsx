import React from "react";
import { ReactComponent as ImagePlaceholder } from "../../assets/images/iconImagePlaceholder.svg";
import { ReactComponent as EditIcon } from "../../assets/images/editIcon.svg";

interface Input {
    styleOverride?: string;
    title: string;
}
interface InputFormProps extends Input {
    helpText?: string;
    reactFormProps: object;
    errorShouldDisplay?: boolean;
    required?: boolean;
    currentValue?: string;
}
interface InputTextFormProps extends InputFormProps {
    numberOfLines: number;
}
interface ButtonProps extends Input {
    functionToDo: () => void;
    id?: string;
}

interface InputSwitchFormProps extends InputFormProps {
    options: string[];
    optionSelected: string;
}

export const InputOfStringForm = (props: InputTextFormProps): React.JSX.Element => {
    return <div className="mb-5 w-full">
        <label htmlFor={"inputString-" + props.title} className="block mb-2 text-lg font-medium dark:text-white">
            {props.title + (props.required ? "*" : "")}
            {props.helpText && <span className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">{props.helpText}</span>}
        </label>
        <textarea id={"inputString-" + props.title} rows={props.numberOfLines} className={"block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-slate-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + (props.errorShouldDisplay ? "bg-red-200 dark:bg-red-800" : "") + " " + (props.styleOverride ?? "")} {...props.reactFormProps}
            required={props.required} />
    </div>
}

export const InputSwitchForm = (props: InputSwitchFormProps): React.JSX.Element => {
    return (
        <div>
            <label className="block mb-2 text-lg font-medium dark:text-white">
                {props.title}
            </label>
            <select name="selectedOption" value={props.optionSelected} className={"block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-slate-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + (props.errorShouldDisplay ? "bg-red-200 dark:bg-red-800" : "") + " " + (props.styleOverride ?? "")} {...props.reactFormProps}>
                {props.options.map((option, index) => {
                    return <option key={index} id={index + ""} value={option}>{option}</option>
                })
                }

            </select>

        </div>
    );
}


export const InputOfNumberForm = (props: InputFormProps): React.JSX.Element => {

    return <div className="mb-5">
        <label htmlFor={"inputString-" + props.title} className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            {props.title + (props.required ? "*" : "")}
            {props.helpText && <span className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">{props.helpText}</span>}
        </label>
        <input type="text" id={"inputNumber" + props.title} className={"bg-gray-50 border border-slate-400 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + (props.errorShouldDisplay ? "bg-red-200 dark:bg-red-800" : "") + " " + (props.styleOverride ?? "")} {...props.reactFormProps}
            required={props.required} />
    </div>

}

export const InputOfUrlImagesForm = (props: InputFormProps): React.JSX.Element => {

    return <div className="mb-5">
        <div className="w-24 h-24 mb-2 bg-white border border-slate-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto sm:mx-0">
            {props.currentValue &&
                <img className="mt-5 h-16 max-w-full rounded-lg object-cover mx-auto text-center dark:text-white" src={props.currentValue} alt="error loading image">
                </img>}
            {!props.currentValue &&
                <ImagePlaceholder />
            }
        </div>

        <label htmlFor={"inputString-" + props.title} className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            {props.title + (props.required ? "*" : "")}
            {props.helpText && <span className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">{props.helpText}</span>}
        </label>
        <textarea id={"inputNumber" + props.title} rows={1} className={"bg-gray-50 border border-slate-400 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + (props.errorShouldDisplay ? "bg-red-200" : "") + " " + (props.styleOverride ?? "")} {...props.reactFormProps}
            required={props.required} />
    </div>

}


export const ValidateButton = (props: ButtonProps): React.JSX.Element => {
    return <button name="submitButton" onClick={props.functionToDo} type="submit" className={"text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " + (props.styleOverride ?? "")}>{props.title}</button>
}


export const CancelButton = (props: ButtonProps): React.JSX.Element => {
    return <button name="cancelButton" onClick={(e) => { e.preventDefault(); props.functionToDo() }} className={"text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800 " + (props.styleOverride ?? "")}>{props.title}</button>
}

export const DeleteButton = (props: ButtonProps): React.JSX.Element => {
    return <button name="deleteButton" onClick={(e) => { e.preventDefault(); props.functionToDo() }} className={"text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-800 dark:hover:bg-red-900 dark:focus:ring-blue-800 " + (props.styleOverride ?? "")}>{props.title}</button>
}

export const FixedButton = (props: ButtonProps): React.JSX.Element => {
    return <button id="fixedButton" onClick={props.functionToDo} className={"fixed bottom-4 right-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-2.5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " + (props.styleOverride ?? "")}>
        <svg className=" h-[20px] me-2" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span> {props.title}</span></button>
}

export const EditButton = (props: ButtonProps): React.JSX.Element => {
    return <button id={props.id ? "editButton" + props.id : "editButton"} className={"w-14 bg-gray-600 rounded-lg dark:fill-white " + (props.styleOverride ?? "")} onClick={(event) => { event.stopPropagation(); props.functionToDo() }}>
        <EditIcon />
    </button>;
}


