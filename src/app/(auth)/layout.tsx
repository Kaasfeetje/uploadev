import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
