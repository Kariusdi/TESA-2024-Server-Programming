import { AppKPIGraphProps } from "@/types/types";
import { FC } from "react";
import { Area, AreaChart } from "recharts";

const AppKPIGraph: FC<AppKPIGraphProps> = ({ data }) => {
  return (
    <AreaChart
      width={300}
      height={125}
      data={data ?? []}
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={"#89C5DF"} stopOpacity={0.8} />
          <stop offset="95%" stopColor={"#89C5DF"} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="uv"
        stroke={"#89C5DF"}
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
};

export default AppKPIGraph;
