"use client";
import { FC, useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppGraph from "./AppGraph";
import AppSubHeader from "./AppSubheader";
import Clock from "@/assets/clock.png";
import Image from "next/image";
import AppStatusMap from "./AppStatusMap";
import { useSensors } from "@/hooks/useSensors";
import { useMaintenance } from "@/hooks/useMaintenance";
import AppSummary from "./AppSummary";

const AppDashboard: FC = () => {
  // const { data: sensorDatas, error, isLoading, isValidating } = useSensors();
  const [latestUpdated, setLatestUpdated] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(true);
  const { timer, machineStatus, modalOpen, setModalOpen, maintenaceDataSet } =
    useMaintenance();

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 700);
  }, []);

  useEffect(() => {
    const saved_timer = localStorage.getItem("timer");
    setLatestUpdated(saved_timer ?? "");
  }, [timer]);

  if (loader) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <>
        {modalOpen && (
          <>
            <div className="absolute h-full w-full bg-black opacity-70 z-10" />
            <div className="absolute left-0 top-[25%] w-full z-20 text-white font-bold flex flex-col justify-center items-center">
              <div
                className={`relative text-center bg-white text-black px-10 py-10 rounded-2xl shadow-2xl transform transition-transform duration-300 ease-in-out`}
              >
                <button
                  className="absolute right-5 top-3"
                  onClick={() => setModalOpen(false)}
                >
                  X
                </button>
                <h1 className="text-[54px]">🚧</h1>

                <h1 className="text-[64px]">
                  Machine
                  {maintenaceDataSet.map(
                    (ele, idx) =>
                      ` ${ele.id}${
                        idx !== maintenaceDataSet.length - 1 ? "," : ""
                      }`
                  )}
                </h1>
                <h3 className="text-[32px] bg-[#F8A23F] rounded-lg leading-loose">
                  Needs Maintenance
                </h3>
              </div>
            </div>
          </>
        )}
        <section className="py-2 px-3 flex flex-col justify-start items-start overflow-auto">
          <AppHeader title="Predictive Maintenance Dashboard" />
          <div className="mt-10"></div>
          <div
            className={`flex justify-center items-center space-x-1.5 mb-2 transition-all duration-700`}
          >
            <Image src={Clock} alt="clock" width={10} height={10} />
            <p className="text-[12px] text-gray-500">
              Latest Updated: {latestUpdated}
            </p>
          </div>
          <AppStatusMap statusSet={machineStatus} />
          <div className="mt-10"></div>
          <AppSubHeader title="Machine Sound Sensoring" />
          <div className="shadow-md rounded-[20px] bg-white p-5 mt-5 mb-5">
            <div className="flex justify-center items-center space-x-1.5">
              <Image src={Clock} alt="clock" width={10} height={10} />
              <p className="text-[12px] text-gray-500">
                Latest Updated: {latestUpdated}
              </p>
            </div>
            <AppGraph />
          </div>
        </section>
        <div className="h-screen w-[240px] flex-shrink" />
        <div className="fixed right-0 top-0 h-screen overflow-hidden">
          <div className="h-full overflow-auto">
            <AppSummary />
          </div>
        </div>
      </>
    );
  }
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
