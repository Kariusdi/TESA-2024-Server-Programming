"use client";
import React from "react";
import AppMenu from "../../_components/AppMenu";
import dynamic from "next/dynamic";
import AppSummary from "../../_components/AppSummary";
import AppMQTT from "@/app/_components/AppMQTT";
const AppDashboard = dynamic(() => import("../../_components/AppDashboard"), {
  ssr: false,
});

const DashboardPage = () => {
  return (
    <>
      {/* <AppDashboard /> */}
      <AppMQTT />
    </>
  );
};

export default DashboardPage;
