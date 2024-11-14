"use client";
import AppHeader from "@/app/_components/AppHeader";
import AppLineChart from "@/app/_components/AppLineChart";
import AppMachineInfo from "@/app/_components/AppMachineInfo";
import React, { useEffect, useState } from "react";

const machinelogs = () => {
  const [showValidating, setShowValidating] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowValidating(false);
      setShowLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);
  if (showLoading || showValidating) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <section className="py-2 px-3 flex flex-col justify-start items-start w-full mx-10">
      <div className="flex justify-between items-center w-full">
        <AppHeader title={"Machine Infomation Logs"} />
      </div>
      <AppMachineInfo />
    </section>
  );
};

export default machinelogs;
