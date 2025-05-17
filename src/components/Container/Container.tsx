import clsx from "clsx";
import { type ReactNode } from "react";
import s from "./Container.module.css";

export interface containerProps {
  className?: string;
  children: ReactNode;
}

const Container = ({ className, children }: containerProps) => {
  return <div className={clsx(s.container, className)}>{children}</div>;
};

export default Container;
