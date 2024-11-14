"use client";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppHealthStatus from "./AppHealthStatus";
// import { socket } from "@/utils/sockets";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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
                className="py-2 px-5 cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold rounded-full mt-3 mb-5 w-[125px] h-[125px] flex justify-center items-center shadow-lg"
              >
                <p>Connect</p>
              </div>
            ) : (
              <div
                onClick={() => {
                  setButtonState(false);
                  handleStop();
                }}
                className="py-2 px-5 cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold rounded-full mt-3 mb-5 w-[125px] h-[125px] flex justify-center items-center shadow-inner"
              >
                <p>Disconnect</p>
              </div>
            )}

            {/* <input
              type="button"
              value="Stop"
              onClick={handleStop}
              className="py-2 px-5 bg-red-500 hover:bg-red-800 text-white font-bold rounded-lg mt-3 mb-5"
            /> */}
          </div>
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
