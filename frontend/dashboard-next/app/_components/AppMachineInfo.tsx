"use client";
import React, { useMemo, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { MachineInfo, MachineInfoTime } from "@/types/types";
import AppLineChart from "./AppLineChart";

// const fetcher = (url) => fetch(url).then((res) => res.json());

const AppMachineInfo = () => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [statusCode, setStatusCode] = useState<number>();
  const [time, setTime] = useState<string[]>([]);
  const [energyConsumption, setEnergyConsumption] = useState<number[]>([]);
  const [volOne, setVolOne] = useState<number[]>([]);
  const [volTwo, setVolTwo] = useState<number[]>([]);
  const [volThree, setVolThree] = useState<number[]>([]);
  const [pressure, setPressure] = useState<number[]>([]);
  const [force, setForce] = useState<number[]>([]);
  const [positionPunch, setPositionPunch] = useState<number[]>([]);

  // Handle date and time change
  const handleStartDateChange = (newValue: dayjs.Dayjs | null) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue: dayjs.Dayjs | null) => {
    setEndDate(newValue);
  };

  const handleSubmit = async () => {
    if (startDate && endDate) {
      console.log(
        startDate.format("YYYY-MM-DD HH:mm"),
        endDate.format("YYYY-MM-DD HH:mm")
      );
      try {
        await fetch(
          `http://127.0.0.1:80/info/retrieve?startDate=${startDate.format(
            "YYYY-MM-DD HH:mm"
          )}&endDate=${endDate.format("YYYY-MM-DD HH:mm")}`,
          {
            method: "GET",
          }
        )
          .then(async (res) => {
            if (res.status === 403) {
              console.log("Token expired. Redirecting to /");
            } else {
              return await res.json();
            }
          })
          .then((data) => {
            const arr: MachineInfoTime[] = data.data[0];
            console.log(arr);
            if (arr.length !== 0) {
              setEnergyConsumption(
                arr.map((ele) => ele["Energy Consumption"].Power)
              );
              setVolOne(arr.map((ele) => ele.Voltage["L1_GND"]));
              setVolTwo(arr.map((ele) => ele.Voltage["L2_GND"]));
              setVolThree(arr.map((ele) => ele.Voltage["L3_GND"]));
              setPressure(arr.map((ele) => ele.Pressure));
              setForce(arr.map((ele) => ele.Force));
              setPositionPunch(arr.map((ele) => ele["Position of the Punch"]));
              setTime(arr.map((ele) => ele.timeStamp));
            }
            setStatusCode(data.code);
          })
          .catch((err) => {
            setStatusCode(500);
            console.log("Error! This Collection is Empty", err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const powerOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Power",
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
  }, [time, volOne, volTwo, volThree]);

  return (
    <div className="flex flex-col justify-center items-cente">
      {/* <AppLineChart options={{}} data={data || {}} /> */}
      <div className="flex space-x-5 mt-5 justify-center items-center self-start">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            ampm={false}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            ampm={false}
          />
        </LocalizationProvider>
        <button
          onClick={handleSubmit}
          className="bg-[#F85F3F] text-white font-bold py-2 h-10 w-[100px] rounded-lg"
        >
          Submit
        </button>
      </div>
      {statusCode === 500 && (
        <p className="mt-10">No data found for the given date range.</p>
      )}

      {statusCode === 200 && (
        <div className="flex justify-start items-start flex-wrap mt-10">
          <div className="h-[400px] w-[500px] mr-5 mt-5">
            <AppLineChart options={powerOptions} data={powerData} />
          </div>
          <div className="h-[400px] w-[500px] mr-5 mt-5">
            <AppLineChart options={voltageOptions} data={volData} />
          </div>
          <div className="h-[400px] w-[500px] mr-5 mt-5">
            <AppLineChart options={pressureOptions} data={pressureData} />
          </div>
          <div className="h-[400px] w-[500px] mr-5 mt-5">
            <AppLineChart options={forceOptions} data={forceData} />
          </div>
          <div className="h-[400px] w-[500px] mr-5 mt-5">
            <AppLineChart
              options={positionPunchOptions}
              data={positionPunchData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppMachineInfo;
