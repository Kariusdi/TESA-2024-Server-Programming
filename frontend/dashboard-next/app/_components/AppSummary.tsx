"use client";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppHealthStatus from "./AppHealthStatus";
// import { socket } from "@/utils/sockets";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import MqttButton from "./AppMQTTButton";

interface AppSummaryProps {
  handleStart: () => void;
  handleStop: () => void;
}

const AppSummary: FC<AppSummaryProps> = ({ handleStart, handleStop }) => {
  const [buttonState, setButtonState] = useState<boolean>(false);
  return (
    <section className="h-screen w-[250px] overflow-auto">
      <div className="bg-white shadow-lg flex flex-col items-center p-3 rounded-tl-[20px] min-h-full">
        <AppHeader title="Controller" />
        <div className="mt-5">
          <div className="flex space-x-5">
            {!buttonState ? (
              <div
                // type="button"
                // value="Start"
                onClick={() => {
                  setButtonState(true);
                  handleStart();
                }}
                className="py-2 px-5 cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold rounded-full mt-3 mb-5 w-[125px] h-[125px] flex justify-center items-center shadow-lg active:bg-red-500 active:shadow-inner"
              >
                <p>Connect</p>
              </div>
            ) : (
              <div
                onClick={() => {
                  setButtonState(false);
                  handleStop();
                }}
                className="py-2 px-5 cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold rounded-full mt-3 mb-5 w-[125px] h-[125px] flex justify-center items-center shadow-inner active:bg-green-500 active:shadow-lg"
              >
                <p>Disconnect</p>
              </div>
            )}
          </div>
          <MqttButton
            brokerUrl={"ws://localhost:9001"}
            topic={"prediction/1"}
          />
        </div>
      </div>
    </section>
  );
};

export default AppSummary;

{
  /* <div className="w-full h-auto space-y-10 mt-10 flex-grow mb-5">
          {machineStatus?.map((ele, idx) => (
            <AppHealthStatus key={idx} id={ele.id} status={ele.status} />
          ))}
        </div> */
}
