"use client";

import { FC } from "react";
import AppKPI from "./AppKPI";
import AppHeader from "./AppHeader";
import AppGraph from "./AppGraph";
import AppSubHeader from "./AppSubheader";
import Clock from "@/assets/clock.png";
import Image from "next/image";

const sensorDatas = [
  {
    name: "Sensor Data 1",
    value: 5876,
    time: "updated 3 mins ago",
  },
  {
    name: "Sensor Data 2",
    value: 906,
    time: "updated 3 mins ago",
  },
  {
    name: "Sensor Data 3",
    value: 2073,
    time: "updated 3 mins ago",
  },
];

const AppDashboard: FC = () => {
  return (
    <section className="py-2 px-3 flex flex-col justify-start items-start overflow-auto">
      <AppHeader title="Predictive Maintenance Dashboard" />
      <div className="flex justify-center items-center mt-10">
        {sensorDatas.map((ele, idx) => (
          <AppKPI key={idx} name={ele.name} value={ele.value} time={ele.time} />
        ))}
      </div>
      <AppSubHeader title="Machine Sound Sensoring" />
      <div className="shadow-md rounded-[20px] bg-white p-5 mt-5 mb-5">
        <div className="flex justify-center items-center space-x-1.5">
          <Image src={Clock} alt="clock" width={10} height={10} />
          <p className="text-[12px] text-gray-500">updated 3 mins ago</p>
        </div>
        <AppGraph />
      </div>
      <div className="flex justify-center items-center mt-10">
        {sensorDatas.map((ele, idx) => (
          <AppKPI key={idx} name={ele.name} value={ele.value} time={ele.time} />
        ))}
      </div>
    </section>
  );
};

export default AppDashboard;
