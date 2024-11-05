import { FC, useMemo } from "react";
import Image from "next/image";
import { useSensors } from "@/hooks/useSensors";
import Industry from "@/assets/industry.jpg";

interface PinStatusProps {
  id: number;
  status: number;
  vertical: string;
  horizontal: string;
  direction?: string;
}

interface AppStatusMapProps {
  statusSet: {
    id: number;
    status: number;
  }[];
}

const AppStatusMap: FC<AppStatusMapProps> = ({ statusSet }) => {
  const positions = useMemo(() => {
    return [
      { vertical: "top-[4px]", horizontal: "left-[480px]", direction: "right" },
      {
        vertical: "top-[80px]",
        horizontal: "right-[540px]",
        direction: "left",
      },
      {
        vertical: "top-[200px]",
        horizontal: "right-[540px]",
        direction: "left",
      },
      {
        vertical: "top-[200px]",
        horizontal: "left-[635px]",
        direction: "right",
      },
      {
        vertical: "top-[320px]",
        horizontal: "right-[30px]",
        direction: "left",
      },
      {
        vertical: "top-[460px]",
        horizontal: "left-[525px]",
        direction: "right",
      },
    ];
  }, []);
  const s = useMemo(
    () =>
      statusSet.map((machineSt, index) => ({
        ...machineSt,
        ...positions[index],
      })),
    [statusSet, positions]
  );

  return (
    <div className="h-auto w-[920px] rounded-2xl relative">
      <Image
        src={Industry}
        alt="industry"
        className="w-full h-full rounded-2xl drop-shadow-lg"
        quality={100}
      />
      {s.map((ele, idx) => (
        <PinStatus
          key={idx}
          vertical={ele.vertical}
          horizontal={ele.horizontal}
          id={ele.id}
          status={ele.status}
          direction={ele.direction}
        />
      ))}
    </div>
  );
};

const PinStatus: FC<PinStatusProps> = ({
  vertical,
  horizontal,
  id,
  status,
  direction = "right",
}) => {
  const statusColor = useMemo(() => {
    return status === 1
      ? "bg-[#CB1202]"
      : status === -1
      ? "bg-[#F8A23F]"
      : status === 0
      ? "bg-[#23CB02]"
      : "bg-gray-500";
  }, [status]);
  return (
    <div className={`absolute ${vertical} ${horizontal} flex space-x-1`}>
      {direction === "right" ? (
        <>
          <div
            className={`h-20 w-20 bg-opacity-50 rounded-lg ${statusColor} transition-all duration-700`}
          />
          <div className="flex flex-col justify-start items-center space-y-1">
            <div className="bg-white h-fit w-full text-center p-1 rounded-md font-bold">
              <p>Machine {id}</p>
            </div>
            <div
              className={`h-fit w-full ${
                status === 0 || status === -1 ? "text-black" : "text-white"
              } text-center p-1 rounded-md font-bold ${statusColor} transition-all duration-700`}
            >
              <p>
                {status === 0
                  ? "Good"
                  : status === -1
                  ? "Needs Maintenance"
                  : status === 1
                  ? "Critical"
                  : "Offline"}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-start items-center space-y-1">
            <div className="bg-white h-fit w-full text-center p-1 rounded-md font-bold">
              <p>Machine {id}</p>
            </div>
            <div
              className={`h-fit w-full ${
                status === 0 || status === -1 ? "text-black" : "text-white"
              } text-center p-1 rounded-md font-bold ${statusColor} transition-all duration-700`}
            >
              <p>
                {status === 0
                  ? "Good"
                  : status === -1
                  ? "Needs Maintenance"
                  : status === 1
                  ? "Critical"
                  : "Offline"}
              </p>
            </div>
          </div>
          <div
            className={`h-20 w-20 bg-opacity-50 rounded-lg ${statusColor} transition-all duration-700`}
          />
        </>
      )}
    </div>
  );
};

export default AppStatusMap;
