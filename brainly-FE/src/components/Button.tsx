import { ReactElement } from "react";

interface ButtonProps {
    variant : "primary"|"secondary";
    text: string;
    startIcon?: ReactElement;
}


const varientClasses = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-600"
}

const defaultCss = "px-4 py-2 rounded-md font-light flex justify-center items-center"

export function Button( props: ButtonProps)  {

    return <button className={`${varientClasses[props.variant]} ${defaultCss}`}>
                    <div className="pr-2"> {props.startIcon} </div>
                    {props.text}
             </button>

}
