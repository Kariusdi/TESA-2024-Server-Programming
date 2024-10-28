"use client";

import React from "react";
import AppMenu from "../_components/AppMenu";
// import AppDashboard from "../_components/AppDashboard";
import dynamic from "next/dynamic";
import AppSummary from "../_components/AppSummary";
const AppDashboard = dynamic(() => import("../_components/AppDashboard"), {
  ssr: false,
});

const DashboardPage = () => {
  return (
    <main className="flex">
      <div className="h-screen w-[220px]" />
      <div className="fixed">
        <AppMenu />
      </div>
      <AppDashboard />
      <div className="h-screen w-[220px]" />
      <div className="fixed right-0 top-0 h-screen overflow-hidden">
        <div className="h-full overflow-auto">
          <AppSummary />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
