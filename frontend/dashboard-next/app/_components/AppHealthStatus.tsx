"use client";
import { FC, useMemo } from "react";

interface AppHealthStatusProps {
  name: string;
  status: string;
}

const AppHealthStatus: FC<AppHealthStatusProps> = ({ name, status }) => {
  const statusColor = useMemo(() => {
    return status === "Good"
      ? "#23CB02"
      : status === "Needs Maintenance"
      ? "#F8A23F"
      : "#CB1202";
  }, [status]);
  return (
    <div className="relative">
      <div className="w-[215px] h-[150px] bg-white shadow-lg rounded-[10px] flex flex-col justify-between items-start py-2 px-4">
        <h3 className="text-md text-gray-500">Health Status</h3>
        {status === "Good" ? (
          <h1 className={`text-3xl font-bold text-[#23CB02]`}>{status}</h1>
        ) : status === "Needs Maintenance" ? (
          <h1 className={`text-3xl font-bold text-[#F8A23F]`}>{status}</h1>
        ) : (
          <h1 className={`text-3xl font-bold text-[#CB1202]`}>{status}</h1>
        )}
        <p className="text-[#34150F] font-bold">{name}</p>
      </div>
      {status === "Good" ? (
        <div
          className={`absolute top-[40%] -right-1 bg-[#23CB02] h-8 w-8 rounded-full`}
        ></div>
      ) : status === "Needs Maintenance" ? (
        <div
          className={`absolute top-[40%] -right-1 bg-[#F8A23F] h-8 w-8 rounded-full`}
        ></div>
      ) : (
        <div
          className={`absolute top-[40%] -right-1 bg-[#CB1202] h-8 w-8 rounded-full`}
        ></div>
      )}
    </div>
  );
};

export default AppHealthStatus;
