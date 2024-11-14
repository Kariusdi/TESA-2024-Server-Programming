"use client";
import { FC, MouseEventHandler, useEffect, useMemo, useState } from "react";
import AppHeader from "./AppHeader";
import AppHealthStatus from "./AppHealthStatus";
// import { socket } from "@/utils/sockets";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import MqttButton from "./AppMQTTButton";
import AppLineChart from "./AppLineChart";

interface AppSummaryProps {
  handleStart: () => void;
  handleStop: () => void;
}

interface SoundData {
  dataList: number[];
  filename: string;
  id: string;
  rate: number;
  timeStamp: string;
}

const samplingOptions = {
  scales: {
    x: {
      title: {
        display: true,
        text: "", // Set x-axis label here
      },
    },
    y: {
      title: {
        display: true,
        text: "Sound", // Optionally, set y-axis label as well
      },
    },
  },
  pan: {
    enabled: true,
    mode: "xy",
  },
  zoom: {
    enabled: true,
    mode: "x",
  },
};

const AppSummary: FC<AppSummaryProps> = ({ handleStart, handleStop }) => {
  const [buttonState, setButtonState] = useState<boolean>(false);
  const [soundData, setSoundData] = useState<SoundData[]>([]);
  const [sampling, setSampling] = useState<number[]>([]);
  useEffect(() => {
    const fetcher = async () => {
      try {
        await fetch("http://127.0.0.1:80/audio/get_all", {
          method: "GET",
        })
          .then(async (res) => {
            if (res.status === 403) {
              console.log("Token expired. Redirecting to /");
            } else {
              return await res.json();
            }
          })
          .then((data) => {
            console.log(data.data[0]);
            setSoundData(data.data[0]);
            // setSampling(data.data[0][0].dataList);
          })
          .catch((err) => console.log("Error! This Collection is Empty", err));
      } catch (error) {
        console.log(error);
      }
    };
    fetcher();
  }, []);

  useEffect(() => {
    if (soundData[0]) {
      setSampling(soundData[0]?.dataList);
      console.log(soundData[0]?.dataList);
    }
  }, [soundData]);

  const samplingData = useMemo(() => {
    return {
      labels: Array.from({ length: sampling.length }, (_, i) => i),
      datasets: [
        {
          label: "Power",
          data: sampling,
          borderColor: "rgb(248, 95, 63)",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          fill: true,
        },
      ],
    };
  }, [sampling]); // Changed dependencies to only `sampling`
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
                className="py-2 px-5 cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold rounded-full mt-3 mb-5 w-[125px] h-[125px] flex justify-center items-center shadow-lg active:bg-red-500 active:shadow-inner"
              >
                <p>Connect</p>
              </div>
            ) : (
              <div
                onClick={() => {
                  setButtonState(false);
                  handleStop();
                }}
                className="py-2 px-5 cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold rounded-full mt-3 mb-5 w-[125px] h-[125px] flex justify-center items-center shadow-inner active:bg-green-500 active:shadow-lg"
              >
                <p>Disconnect</p>
              </div>
            )}
          </div>
          <MqttButton brokerUrl={"ws://localhost:9001"} topic={"terminate/1"} />
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
