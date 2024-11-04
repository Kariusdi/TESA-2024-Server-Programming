"use client";
import React from "react";
import AppMenu from "../_components/AppMenu";
import dynamic from "next/dynamic";
import AppSummary from "../_components/AppSummary";
const AppDashboard = dynamic(() => import("../_components/AppDashboard"), {
  ssr: false,
});

const DashboardPage = () => {
  return (
    <main className="flex">
      {/* <div className="z-10 absolute bg-black opacity-50 h-full w-full"></div> */}
      <div className="h-screen w-[220px] flex-shrink" />
      <div className="fixed">
        <AppMenu />
      </div>
      <div className="flex flex-grow justify-center items-start">
        <AppDashboard />
      </div>
      <div className="h-screen w-[240px] flex-shrink" />
      <div className="fixed right-0 top-0 h-screen overflow-hidden">
        <div className="h-full overflow-auto">
          <AppSummary />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
