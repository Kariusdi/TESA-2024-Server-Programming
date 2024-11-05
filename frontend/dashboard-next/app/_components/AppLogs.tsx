"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import AppHeader from "./AppHeader";
import { StatusData, StatusDataNoId } from "@/types/types";
import { useUpdateStatus } from "@/hooks/useStatus";

interface AppLogs {
  dataSource?: StatusData[];
}

const AppLogs: FC<AppLogs> = ({ dataSource }) => {
  return (
    <section className="py-2 px-3 flex flex-col justify-start items-start w-full mx-10">
      <AppHeader title={"Maintenance Logs"} />
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
  );
};

const Logs: FC<StatusData> = ({ id, status, date, _id }) => {
  const [statusLabel, setStatusLabel] = useState(() => {
    return status === -1 ? "Needs Maintenance" : "Good";
  });
  // const statusLabel = useMemo(() => {
  //   return status === -1 ? "Needs Maintenance" : "Good";
  // }, [status]);

  const { handleUpdater } = useUpdateStatus();

  const updateStatus = useCallback(
    async (id: number, status: number, date: string, _id: string) => {
      const updated_data: StatusDataNoId = {
        id,
        status: 0,
        date,
      };
      console.log(updated_data, _id);
      await handleUpdater(updated_data, _id);
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
        <p className="text-[12px] text-gray-500 mb-1">Date: {date}</p>
        <h1 className="text-xl font-semibold">Machine {id}</h1>
        <p
          className={`${
            statusLabel === "Needs Maintenance"
              ? "text-[#F8A23F]"
              : "text-[#23CB02]"
          } font-bold`}
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
