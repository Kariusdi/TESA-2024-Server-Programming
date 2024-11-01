"use client";
import { FC, useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppHealthStatus from "./AppHealthStatus";
import { socket } from "@/utils/socket";

const AppSummary: FC = () => {
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
    <section className="h-screen w-[250px] overflow-auto">
      <div className="bg-white shadow-lg flex flex-col items-center p-3 rounded-tl-[50px] min-h-full">
        <AppHeader title="Summary" />
        <div className="w-full h-auto space-y-10 mt-10 flex-grow mb-5">
          {machineStatus?.map((ele, idx) => (
            <AppHealthStatus key={idx} id={ele.id} status={ele.status} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppSummary;
