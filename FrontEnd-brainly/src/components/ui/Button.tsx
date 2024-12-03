import { ReactElement } from "react";

type Varients = "primary" | "secondary";

interface ButtonProps {
  varient: Varients;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const defaulStyles = "rounded-lg p-2 m-1 flex";

const sizeStyles = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-4 px-6",
};

const varientStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${varientStyles[props.varient]} ${defaulStyles} ${sizeStyles[props.size]} items-center text-center`}
    >
      {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}{" "}
      {props.text} {props.endIcon}
    </button>
  );
};

{
  /* <Button varient="primary" size="md" text="" onClick={() => {}}></Button>; */
}
