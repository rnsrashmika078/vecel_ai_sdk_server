/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
interface ChartProps {
  data: { data: any; xKey: any; yKey: any };
}
const Chart = ({ data }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300} className="mb-5">
      <LineChart data={data.data}  className="">
        <XAxis dataKey={data.xKey}>
          <Label value={data.xKey} position="insideBottom" offset={-5} />
        </XAxis>
        <YAxis>
          <Label value={data.yKey} angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Line type="monotone" dataKey={data.yKey} stroke="blue" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
