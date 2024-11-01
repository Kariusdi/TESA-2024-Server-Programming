"use client";
import { FC, useMemo } from "react";

interface AppHealthStatusProps {
  id: number;
  status: number;
}

const AppHealthStatus: FC<AppHealthStatusProps> = ({ id, status }) => {
  const statusLabel = useMemo(() => {
    return status === 0
      ? "Good"
      : status === -1
      ? "Needs Maintenance"
      : status === 1
      ? "Critical"
      : "Offline";
  }, [status]);
  const statusColorBg = useMemo(() => {
    return status === 1
      ? "bg-[#CB1202]"
      : status === -1
      ? "bg-[#F8A23F]"
      : status === 0
      ? "bg-[#23CB02]"
      : "bg-gray-500";
  }, [status]);
  const statusColorText = useMemo(() => {
    return status === 1
      ? "text-[#CB1202]"
      : status === -1
      ? "text-[#F8A23F]"
      : status === 0
      ? "text-[#23CB02]"
      : "text-gray-500";
  }, [status]);
  return (
    <div className="relative">
      <div className="w-[215px] h-[150px] bg-white shadow-lg rounded-[10px] flex flex-col justify-between items-start py-2 px-4">
        <h3 className="text-md text-gray-500">Health Status</h3>
        <h1
          className={`text-3xl font-bold transition-all duration-700 ${statusColorText}`}
        >
          {statusLabel}
        </h1>
        <p className="text-[#34150F] font-bold">Machine {id}</p>
      </div>
      <div
        className={`absolute top-[40%] -right-1 transition-all duration-700 ${statusColorBg} h-8 w-8 rounded-full`}
      ></div>
    </div>
  );
};

export default AppHealthStatus;
