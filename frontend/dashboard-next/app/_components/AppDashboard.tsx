"use client";

import { FC } from "react";
import AppKPI from "./AppKPI";
import AppHeader from "./AppHeader";
import AppGraph from "./AppGraph";
import AppSubHeader from "./AppSubheader";
import Clock from "@/assets/clock.png";
import Image from "next/image";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
