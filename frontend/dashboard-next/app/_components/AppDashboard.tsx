"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import AppKPI from "./AppKPI";
import AppHeader from "./AppHeader";
import AppGraph from "./AppGraph";
import AppSubHeader from "./AppSubheader";
import Clock from "@/assets/clock.png";
import Image from "next/image";
import { useSensors } from "@/hooks/useSensors";
import AppStatusMap from "./AppStatusMap";
import { socket } from "@/utils/socket";

const AppDashboard: FC = () => {
  // const { data: sensorDatas, error, isLoading, isValidating } = useSensors();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [machineStatus, setMachineStatus] = useState<
    { id: number; status: number }[]
  >([
    { id: 1, status: 404 },
    { id: 2, status: 404 },
    { id: 3, status: 404 },
    { id: 4, status: 404 },
    { id: 5, status: 404 },
    { id: 6, status: 404 },
  ]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // socket.on("join", onFooEvent);
    socket.on("machine_status", (data) => {
      setMachineStatus(data);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("machine_status", (data) => {
        setMachineStatus(data["data"]);
      });
    };
  }, []);

  return (
    <section className="py-2 px-3 flex flex-col justify-start items-start overflow-auto">
      <AppHeader title="Predictive Maintenance Dashboard" />
      <div className="mt-10"></div>
      {/* {machineStatus?.map((ele, idx) => (
        <p key={idx}>
          Machine {ele.id}:{" "}
          {ele.status === 0
            ? "Good"
            : ele.status === -1
            ? "Needs Maintenance"
            : "Critical"}
        </p>
      ))} */}
      <AppStatusMap statusSet={machineStatus} />
      <div className="mt-10"></div>
      <AppSubHeader title="Machine Sound Sensoring" />
      <div className="shadow-md rounded-[20px] bg-white p-5 mt-5 mb-5">
        <div className="flex justify-center items-center space-x-1.5">
          <Image src={Clock} alt="clock" width={10} height={10} />
          <p className="text-[12px] text-gray-500">updated 3 mins ago</p>
        </div>
        <AppGraph />
      </div>
    </section>
  );
};

export default AppDashboard;

{
  /* <div className="flex justify-center items-center mt-10">
        {sensorDatas?.map((ele, idx) => (
          <AppKPI
            key={idx}
            name={ele.name}
            sensorValue={ele.sensorValue}
            timestamp={ele.timestamp}
          />
        ))}
      </div> */
}
