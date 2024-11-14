"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import AppHeader from "./AppHeader";
import AppGraph from "./AppGraph";
import AppSubHeader from "./AppSubheader";
import Clock from "@/assets/clock.png";
import Image from "next/image";
import AppStatusMap from "./AppStatusMap";
import { useSensors } from "@/hooks/useSensors";
import { useMaintenance } from "@/hooks/useMaintenance";
import AppSummary from "./AppSummary";
import { useRouter } from "next/navigation";
import mqtt from "mqtt";
import { useStatus } from "@/hooks/useStatus";
import AppLineChart from "./AppLineChart";
import dayjs from "dayjs";
import { MachineInfo } from "@/types/types";

interface Message {
  id: number;
  status: number;
}

const AppDashboard: FC = () => {
  // const { data: sensorDatas, error, isLoading, isValidating } = useSensors();
  const [latestUpdated, setLatestUpdated] = useState<string>("");
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(true);
  const { timer, machineStatus, modalOpen, setModalOpen, maintenaceDataSet } =
    useStatus();
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        await fetch("http://127.0.0.1:80/db/retrieve", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then(async (res) => {
            if (res.status === 403) {
              console.log("Token expired. Redirecting to /");
              router.replace("/");
            } else {
              return await res.json();
            }
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log("Error! This Collection is Empty", err));
      } catch (error) {
        console.log(error);
      }
    };
    fetcher();
  }, [router]);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 700);
  }, []);

  useEffect(() => {
    const saved_timer = localStorage.getItem("timer");
    setLatestUpdated(saved_timer ?? "");
  }, [timer]);

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [time, setTime] = useState<string[]>([]);
  const [energyConsumption, setEnergyConsumption] = useState<number[]>([]);
  const [volOne, setVolOne] = useState<number[]>([]);
  const [volTwo, setVolTwo] = useState<number[]>([]);
  const [volThree, setVolThree] = useState<number[]>([]);
  const [cycleCount, setCycleCount] = useState<number[]>([]);
  const [pressure, setPressure] = useState<number[]>([]);
  const [force, setForce] = useState<number[]>([]);
  const [positionPunch, setPositionPunch] = useState<number[]>([]);

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  const isJSON = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleStart = useCallback(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? "";
    const socket = new WebSocket("ws://technest.ddns.net:8001/ws");

    socket.onopen = () => {
      socket.send(apiKey);
    };

    socket.onmessage = (event) => {
      if (isJSON(event.data)) {
        const raw_data: MachineInfo = JSON.parse(event.data);
        if (raw_data) {
          console.log(raw_data);
          setTime((prev) => {
            if (prev.length >= 200) return [];
            return [...prev, dayjs().format("HH:mm:ss")];
          });
          setEnergyConsumption((prev) => {
            if (prev.length >= 200) return [];
            return [...prev, raw_data["Energy Consumption"].Power];
          });
          setVolOne((prev) => {
            if (prev.length >= 200) return [];
            return [...prev, raw_data.Voltage["L1-GND"]];
          });
          setVolTwo((prev) => {
            if (prev.length >= 200) return [];
            return [...prev, raw_data.Voltage["L2-GND"]];
          });
          setVolThree((prev) => {
            if (prev.length >= 200) return [];
            return [...prev, raw_data.Voltage["L3-GND"]];
          });
          setPressure((prev) => {
            if (prev.length >= 200) return [];
            return [...prev, raw_data.Pressure];
          });
          setForce((prev) => {
            if (prev.length >= 200) return [];
            return [...prev, raw_data.Force];
          });
          setPositionPunch((prev) => {
            if (prev.length >= 200) return [];
            return [...prev, raw_data["Position of the Punch"]];
          });
        }
      } else {
        console.warn("Received non-JSON message:", event.data);
      }
    };
    setWs(socket);
  }, [ws]);

  const handleStop = useCallback(() => {
    if (ws) {
      ws.close();
      setWs(null);
    }
  }, [ws]);

  const powerOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time", // Set x-axis label here
        },
      },
      y: {
        title: {
          display: true,
          text: "Power", // Optionally, set y-axis label as well
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

  const voltageOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time", // Set x-axis label here
        },
      },
      y: {
        title: {
          display: true,
          text: "Voltage 3 Phases (L1-L3)", // Optionally, set y-axis label as well
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
  const pressureOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time", // Set x-axis label here
        },
      },
      y: {
        title: {
          display: true,
          text: "Pressure", // Optionally, set y-axis label as well
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
  const forceOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time", // Set x-axis label here
        },
      },
      y: {
        title: {
          display: true,
          text: "Force", // Optionally, set y-axis label as well
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
  const positionPunchOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time", // Set x-axis label here
        },
      },
      y: {
        title: {
          display: true,
          text: "Position of Punch", // Optionally, set y-axis label as well
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
  const volData = useMemo(() => {
    return {
      labels: time,
      datasets: [
        {
          label: "L1-GND",
          data: volOne,
          borderColor: "rgb(248, 95, 63)",
        },
        {
          label: "L2-GND",
          data: volTwo,
          borderColor: "rgb(54, 162, 235)",
        },
        {
          label: "L3-GND",
          data: volThree,
          borderColor: "rgb(75, 192, 192)",
        },
      ],
    };
  }, [time, energyConsumption]);
  const powerData = useMemo(() => {
    return {
      labels: time,
      datasets: [
        {
          label: "Power",
          data: energyConsumption,
          borderColor: "rgb(248, 95, 63)",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          fill: true,
        },
      ],
    };
  }, [time, energyConsumption]);

  const pressureData = useMemo(() => {
    return {
      labels: time,
      datasets: [
        {
          label: "Pressure",
          data: pressure,
          borderColor: "rgb(0, 123, 255)", // Deep blue for stability
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          fill: true,
        },
      ],
    };
  }, [time, pressure]);

  const forceData = useMemo(() => {
    return {
      labels: time,
      datasets: [
        {
          label: "Force",
          data: force,
          borderColor: "rgb(128, 0, 128)", // Purple border
          backgroundColor: "rgba(128, 0, 128, 0.2)", // Light purple fill for area chart
          fill: true, // Enables the area fill
        },
      ],
    };
  }, [time, force]);

  const positionPunchData = useMemo(() => {
    return {
      labels: time,
      datasets: [
        {
          label: "Position of Punch",
          data: positionPunch,
          borderColor: "rgb(0, 200, 83)",
        },
      ],
    };
  }, [time, positionPunch]);

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
          <AppHeader title="Predictive Maintenance Dashboard 🏭" />
          <div className="mt-10"></div>
          <div className="w-full h-50">
            <AppSubHeader title="Machine Power and Pressure" />
            <div className="flex flex-wrap justify-start items-center mt-2">
              <div className="w-[450px] h-auto bg-white rounded-lg p-2 mr-5">
                <AppLineChart options={powerOptions} data={powerData} />
              </div>
              <div className="w-[450px] h-auto bg-white rounded-lg p-2 mr-5">
                <AppLineChart options={voltageOptions} data={volData} />
              </div>
              <div className="w-[450px] h-auto bg-white rounded-lg shadow-lg p-2">
                <AppLineChart options={pressureOptions} data={pressureData} />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start w-full mt-5">
            <div className="flex flex-col justify-center items-center mt-5 space-y-2">
              <AppSubHeader title="Force and Position of Punch" />
              <div className="w-[500px] h-auto bg-white rounded-lg p-2">
                <AppLineChart options={forceOptions} data={forceData} />
              </div>
              <div className="w-[500px] h-auto bg-white rounded-lg p-2">
                <AppLineChart
                  options={positionPunchOptions}
                  data={positionPunchData}
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start">
              <div
                className={`flex justify-center items-center space-x-1.5 mb-2 transition-all duration-700 mt-5`}
              >
                <Image src={Clock} alt="clock" width={10} height={10} />
                <p className="text-[12px] text-gray-500">
                  Latest Updated: {latestUpdated}
                </p>
              </div>
              <AppStatusMap statusSet={machineStatus} />
            </div>
          </div>
        </section>
        <div className="h-screen w-[240px] flex-shrink" />
        <div className="fixed right-0 top-0 h-screen overflow-hidden">
          <div className="h-full overflow-auto">
            <AppSummary handleStart={handleStart} handleStop={handleStop} />
          </div>
        </div>
      </>
    );
  }
};

export default AppDashboard;

{
  /* <AppSubHeader title="Machine Sound Sensoring" /> */
}
{
  /* <div className="shadow-md rounded-[20px] bg-white p-5 mt-5 mb-5">
            <div className="flex justify-center items-center space-x-1.5">
              <Image src={Clock} alt="clock" width={10} height={10} />
              <p className="text-[12px] text-gray-500">
                Latest Updated: {latestUpdated}
              </p>
            </div>
            <AppGraph />
          </div> */
}

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
