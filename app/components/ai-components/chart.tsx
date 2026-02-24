/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ data }: any) => {
  // const datas = [
  //   { "month": "Jan", "sales": 12 },
  //   { "month": "Feb", "sales": 19 },
  //   { "month": "Mar", "sales": 5 },
  //   { "month": "Apr", "sales": 17 },
  // ];
  //   const memoData = useMemo(() => data, [data]); // avoid unnecessary rerenders
  console.log("data", data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="blue" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
