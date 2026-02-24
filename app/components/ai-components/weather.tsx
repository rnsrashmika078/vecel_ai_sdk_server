"use client";

import { MdSunny } from "react-icons/md";

type WeatherProps = {
  temperature?: number;
  weather?: string;
  location?: string;
};

export const Weather = ({ temperature, weather, location }: WeatherProps) => {
  const date = new Date().toDateString();
  return (
    <div className="p-5 w-full bg-blue-500 my-5 rounded-xl">
      <div className="flex w-full justify-between space-y-5">
        <div>
          <p className="text-md  font-extralight text-gray-300 text-2xl">
            {location ?? "Colombo"}
          </p>
          <p className="text-md font-extralight text-xs">{date}</p>
        </div>
        <p className="text-md font-extralight text-xl">{weather ?? "Sunny"}</p>
      </div>
      <h1 className="text-4xl font-extralight flex gap-2">
        {temperature ?? 24}°<MdSunny color="yellow" />
      </h1>
    </div>
  );
};
