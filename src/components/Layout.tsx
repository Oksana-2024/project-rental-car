import type { ReactNode } from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

export type LayoutProps = {
  children?: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>
        {children}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
