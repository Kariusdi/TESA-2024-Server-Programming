"use clint";

import { FC, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import zoomPlugin from "chartjs-plugin-zoom";
import AppHeader from "./AppHeader";
import AppSubHeader from "./AppSubheader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ...registerables,
  zoomPlugin
);

const AppLineChart: FC<{ options: any; data: any }> = ({ options, data }) => {
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default AppLineChart;

{
  /* <div className="w-full h-auto space-y-10 mt-10 flex-grow mb-5">
          {machineStatus?.map((ele, idx) => (
            <AppHealthStatus key={idx} id={ele.id} status={ele.status} />
          ))}
        </div> */
}
