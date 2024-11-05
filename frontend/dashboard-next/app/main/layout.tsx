import { ReactNode } from "react";
import AppMenu from "../_components/AppMenu";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <main className="flex relative">
        <div className="fixed">
          <AppMenu />
        </div>
        <div className="flex flex-grow justify-center items-start">
          <div className="h-screen w-[220px] flex-shrink" />
          {children}
        </div>
      </main>
    </>
  );
}
