import { ReactNode } from "react";
import AppMenu from "../_components/AppMenu";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <main className="flex relative">
        <div className="h-screen w-[220px] flex-shrink" />
        <div className="fixed">
          <AppMenu />
        </div>
        {children}
      </main>
    </>
  );
}
