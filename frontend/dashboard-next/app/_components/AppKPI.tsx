import { FC } from "react";
import AppKPIGraph from "./AppKPIGraph";
import Clock from "@/assets/clock.png";
import Image from "next/image";
import { data } from "@/data/mockup";
import { AppKPIProps } from "@/types/types";

const AppKPI: FC<AppKPIProps> = ({ name, sensorValue, timestamp }) => {
  return (
    <div className="h-[208px] w-[300px] shadow-md rounded-[20px] bg-white mr-5 mb-10">
      <div className="w-full flex justify-between items-center p-2">
        <h2 className={`text-[18px] font-semibold text-[#34150F]`}>{name}</h2>
        <div className="flex justify-center items-center space-x-1.5">
          <Image src={Clock} alt="clock" width={10} height={10} />
          <p className="text-[12px] text-gray-500">{timestamp}</p>
        </div>
      </div>
      <h1 className={`text-[#34150F] font-bold text-3xl text-center mt-3 spa`}>
        {sensorValue}
      </h1>
      {/* <AppKPIGraph data={data} /> */}
    </div>
  );
};

export default AppKPI;
