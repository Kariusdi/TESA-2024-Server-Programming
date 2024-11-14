"use client";
import AppHeader from "@/app/_components/AppHeader";
import AppLineChart from "@/app/_components/AppLineChart";
import AppMachineInfo from "@/app/_components/AppMachineInfo";
import React from "react";

const machinelogs = () => {
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
