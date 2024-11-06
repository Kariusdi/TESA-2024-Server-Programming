"use client";
import { FC, useCallback, useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import { StatusData, StatusDataNoId } from "@/types/types";
import { useMaintenance } from "@/hooks/useMaintenance";
import { status_updater } from "@/utils/api_methods";

interface AppLogs {
  dataSource?: StatusData[];
}

const AppLogs: FC<AppLogs> = ({ dataSource }) => {
  const { modalOpen, setModalOpen, maintenaceDataSet } = useMaintenance();

  const handleDeleteLogs = useCallback(() => {}, []);

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
      <section className="py-2 px-3 flex flex-col justify-start items-start w-full mx-10">
        <div className="flex justify-between items-center w-full">
          <AppHeader title={"Maintenance Logs"} />
          <button
            onClick={() => console.log("Delete")}
            className="mt-5 text-white font-bold bg-[#CB1202] rounded-md p-2 transition-all duration-300 hover:bg-[#2e110f] hover:shadow-inner"
          >
            Delete
          </button>
        </div>
        <div className="mt-10"></div>
        {dataSource?.length !== 0 ? (
          dataSource?.map((ele, idx) => (
            <Logs
              key={idx}
              id={ele.id}
              status={ele.status}
              date={ele.date}
              _id={ele._id}
            />
          ))
        ) : (
          <p>There's no logs here...</p>
        )}
      </section>
    </>
  );
};

const Logs: FC<StatusData> = ({ id, status, date, _id }) => {
  const [statusLabel, setStatusLabel] = useState(() => {
    return status === -1 ? "Needs Maintenance" : "Good";
  });

  const updateStatus = useCallback(
    async (id: number, status: number, date: string, _id: string) => {
      const updated_data: StatusDataNoId = {
        id,
        status: 0,
        date,
      };
      await status_updater(_id, updated_data);
      setStatusLabel("Good");
    },
    [_id]
  );
  return (
    <div className="relative w-full h-20 bg-white shadow-lg rounded-[10px] px-10 flex justify-between items-center my-2 mx-5">
      <div
        className={`absolute top-[25%] -left-4 transition-all duration-700 ${
          statusLabel === "Needs Maintenance" ? "bg-[#F8A23F]" : "bg-[#23CB02]"
        } h-10 w-10 rounded-full`}
      />
      <div className="flex flex-col justify-center items-start">
        <p className="text-[12px] text-gray-500 mb-1">Alert Date: {date}</p>
        <h1 className="text-xl font-semibold">Machine {id}</h1>
        <p
          className={`${
            statusLabel === "Needs Maintenance"
              ? "text-[#F8A23F]"
              : "text-[#23CB02]"
          } font-bold transition-all duration-700`}
        >
          {statusLabel}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => updateStatus(id, status, date, _id)}
          className="font-bold bg-gray-100 rounded-md p-2 transition-all duration-300 translate-y-0 hover:-translate-y-1 hover:bg-[#23CB02] hover:text-white"
        >
          Done ✅
        </button>
      </div>
    </div>
  );
};

export default AppLogs;
