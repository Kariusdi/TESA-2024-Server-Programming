"use client";
import { FC, useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppGraph from "./AppGraph";
import AppSubHeader from "./AppSubheader";
import Clock from "@/assets/clock.png";
import Image from "next/image";
import AppStatusMap from "./AppStatusMap";
import { socket } from "@/utils/socket";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const AppDashboard: FC = () => {
  // const { data: sensorDatas, error, isLoading, isValidating } = useSensors();
  const [timer, setTimer] = useState<number>(0);
  const { machineStatus, setMachineStatus } = useLocalStorage();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [maintenaceTrigger, setMaintenaceTrigger] = useState<
    { id: number; status: number }[]
  >([]);

  useEffect(() => {
    function onConnect() {
      console.log("Connected");
    }

    function onDisconnect() {
      console.log("Disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("machine_status", (data) => {
      setTrigger(true);
      setMachineStatus(data);
      setTimer(0);
      localStorage.setItem("latestStatus", JSON.stringify(data));
    });

    machineStatus[0].status === 404 && trigger !== true && setTrigger(true);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("machine_status", (data) => {
        setMachineStatus(data["data"]);
        setTimer(0);
      });
    };
  }, [machineStatus]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, [machineStatus]);

  useEffect(() => {
    const newTriggers = machineStatus.filter(
      (ele) =>
        ele.status === -1 &&
        !maintenaceTrigger.some((item) => item.id === ele.id)
    );
    if (newTriggers.length > 0) {
      setMaintenaceTrigger((prev) => [...prev, ...newTriggers]);
      setModalOpen(true);
    } else {
      setMaintenaceTrigger([]);
      setModalOpen(false);
    }
  }, [machineStatus]);

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
                {maintenaceTrigger.map(
                  (ele, idx) =>
                    ` ${ele.id}${
                      idx !== maintenaceTrigger.length - 1 ? "," : ""
                    }`
                )}
              </h1>
              <h3 className="text-[32px] bg-[#F8A23F] rounded-lg leading-loose">
                Need Maintenance
              </h3>
            </div>
          </div>
        </>
      )}
      <section className="py-2 px-3 flex flex-col justify-start items-start overflow-auto">
        <AppHeader title="Predictive Maintenance Dashboard" />
        <div className="mt-10"></div>
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
    </>
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
