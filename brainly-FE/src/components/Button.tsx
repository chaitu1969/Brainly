import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const varientClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultCss =
  "px-4 mx-2 my-1 py-2 rounded-md font-light flex justify-center items-center";

export function Button(props: ButtonProps) {
  return (
    <button
      className={`${varientClasses[props.variant]} ${defaultCss} ${props.fullWidth ? "w-full" : null} ${props.loading ? "disabled opacity-50" : ""}`}
      onClick={props.onClick}
    >
      <div className="pr-2"> {props.startIcon} </div>
      {props.text}
    </button>
  );
}
