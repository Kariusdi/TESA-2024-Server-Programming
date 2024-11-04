"use client";

import { FC, useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppGraph from "./AppGraph";
import AppSubHeader from "./AppSubheader";
import Clock from "@/assets/clock.png";
import Image from "next/image";
import AppStatusMap from "./AppStatusMap";
import { socket } from "@/utils/socket";

const AppDashboard: FC = () => {
  // const { data: sensorDatas, error, isLoading, isValidating } = useSensors();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [timer, setTimer] = useState<number>(0);
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
  const [trigger, setTrigger] = useState<boolean>(false);

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
      setTrigger(true);
      setMachineStatus(data);
      setTimer(0);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("machine_status", (data) => {
        setMachineStatus(data["data"]);
        setTimer(0);
      });
    };
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, [machineStatus]);

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
      <div
        className={`flex justify-center items-center space-x-1.5 mb-2 transition-all duration-700 ${
          trigger === true ? "opacity-100" : "opacity-0"
        }`}
      >
        {trigger === true && timer !== 0 ? (
          <>
            <Image src={Clock} alt="clock" width={10} height={10} />
            <p className="text-[12px] text-gray-500">
              updated {timer} {timer === 1 ? "min" : "mins"} ago
            </p>
          </>
        ) : trigger === true && timer === 0 ? (
          <>
            <Image src={Clock} alt="clock" width={10} height={10} />
            <p className="text-[12px] text-gray-500">
              updated just a moment ago
            </p>
          </>
        ) : (
          <>
            <Image
              src={Clock}
              alt="clock"
              width={10}
              height={10}
              className="opacity-0"
            />
            <p className="text-[12px] text-gray-500 opacity-0">
              updated just a moment ago
            </p>
          </>
        )}
      </div>
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
