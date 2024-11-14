"use client";
import React, { useState } from "react";
import useSWR from "swr";
import AppLineChart from "./AppLineChart";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

// const fetcher = (url) => fetch(url).then((res) => res.json());

const AppMachineInfo = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  // const { data, error } = useSWR(
  //   shouldFetch && startDate && endDate
  //     ? `/api/machine-data?start=${startDate.format("YYYY-MM-DD")}&end=${endDate.format("YYYY-MM-DD")}`
  //     : null,
  //   fetcher
  // );

  const handleSubmit = () => {
    if (startDate && endDate) {
      // setShouldFetch(true); // Trigger useSWR to fetch data
      console.log(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"));
    }
  };

  return (
    <div>
      {/* <AppLineChart options={{}} data={data || {}} /> */}
      <div className="flex space-x-5 mt-5 justify-center items-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Start date"
              value={startDate}
              onChange={(newDate) => setStartDate(newDate)}
            />
          </DemoContainer>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="End date"
              value={endDate}
              onChange={(newDate) => setEndDate(newDate)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <button
          onClick={handleSubmit}
          className="bg-[#F85F3F] text-white font-bold py-2 h-10 w-[100px] rounded-lg"
        >
          Submit
        </button>
      </div>
      {/* {error && <p>Error loading data</p>} */}
    </div>
  );
};

export default AppMachineInfo;
