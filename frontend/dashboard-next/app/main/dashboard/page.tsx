"use client";
import React from "react";
import AppMenu from "../../_components/AppMenu";
import dynamic from "next/dynamic";
import AppSummary from "../../_components/AppSummary";
import AppWebSocket from "@/app/_components/AppWebSocket";
const AppDashboard = dynamic(() => import("../../_components/AppDashboard"), {
  ssr: false,
});

const DashboardPage = () => {
  return (
    <>
      {/* <AppDashboard /> */}
      <AppWebSocket />
    </>
  );
};

export default DashboardPage;
