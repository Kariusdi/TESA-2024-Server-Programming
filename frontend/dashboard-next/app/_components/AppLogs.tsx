import { FC } from "react";
import AppHeader from "./AppHeader";

interface LogsProps {
  id: number;
}

const ids = [1, 2];
const AppLogs: FC = () => {
  return (
    <section className="py-2 px-3 flex flex-col justify-start items-start w-full mx-10">
      <AppHeader title={"Maintenance Logs"} />
      <div className="mt-10"></div>
      {ids.map((ele, idx) => (
        <Logs key={idx} id={ele} />
      ))}
    </section>
  );
};

const Logs: FC<LogsProps> = ({ id }) => {
  return (
    <div className="relative w-full h-20 bg-white shadow-lg rounded-[10px] px-10 flex justify-between items-center my-2 mx-5">
      <div
        className={`absolute top-[25%] -left-4 transition-all duration-700 bg-[#F8A23F] h-10 w-10 rounded-full`}
      />
      <div className="flex flex-col justify-center items-start">
        <p className="text-[12px] text-gray-500 mb-1">
          Date: 11/20/30 11.00.20
        </p>
        <h1 className="text-xl font-semibold">Machine {id}</h1>
        <p className="text-[#F8A23F] font-bold">Needs Maintenance</p>
      </div>
      <div className="flex justify-center items-center">
        <button className="font-bold bg-gray-100 rounded-md p-2 transition-all duration-300 translate-y-0 hover:-translate-y-1 hover:bg-[#23CB02] hover:text-white">
          Done ✅
        </button>
      </div>
    </div>
  );
};

export default AppLogs;
