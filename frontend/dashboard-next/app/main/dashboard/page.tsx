"use client";
import React from "react";
import AppMenu from "../../_components/AppMenu";
import dynamic from "next/dynamic";
import AppSummary from "../../_components/AppSummary";
const AppDashboard = dynamic(() => import("../../_components/AppDashboard"), {
  ssr: false,
});

const DashboardPage = () => {
  return (
    <>
      <AppDashboard />
      <div className="h-screen w-[240px] flex-shrink" />
      <div className="fixed right-0 top-0 h-screen overflow-hidden">
        <div className="h-full overflow-auto">
          <AppSummary />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
