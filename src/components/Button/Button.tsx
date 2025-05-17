import clsx from "clsx";

import s from "./Button.module.css";

export type ButtonProps = {
  type: "button" | "submit";
  text: string;
  onClick?: () => void;
  className?: string;
};

const Button = ({ type, onClick, text, className }: ButtonProps) => {
  return (
    <button className={clsx(s.button, className)} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
