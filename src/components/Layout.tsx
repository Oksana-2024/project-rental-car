import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header/Header";

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
