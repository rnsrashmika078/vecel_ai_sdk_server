"use client";

import { Wind } from "lucide-react";
import { FaTemperatureArrowDown, FaTemperatureHalf } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";

type WeatherProps = {
  temperature?: number;
  weather?: string;
  location?: string;
  icon?: string;
  wind?: string;
};

export const Weather = ({
  icon,
  wind,
  temperature,
  weather,
  location,
}: WeatherProps) => {
  const date = new Date().toDateString();
  return (
    <div className="p-5 w-full bg-blue-500 mb-5 rounded-xl">
      <div className="flex w-full justify-between space-y-5">
        <div>
          <span className="text-xs italic text-[#00ff04]">Location</span>
          <p className="text-md  font-extralight text-2xl text-white">
            {location}
          </p>
          <p className="text-md font-extralight text-xs text-[#dbdbdb]">
            {date}
          </p>
        </div>
        <div>
          <span className="text-xs italic text-[#00ff04]">Condition</span>
          <div className="flex items-center">
            <p className="text-md font-extralight text-xl text-[#dbdbdb]">
              {weather}
            </p>
            <img src={icon} alt="weather icon" width={50} height={50} />
          </div>
        </div>
      </div>
      <span className="text-xs italic text-[#00ff04]">Temperature</span>
      <h1 className="text-4xl font-extralight flex gap-1 text-[#dbdbdb]">
        {temperature ?? 24} <span className="text-sm">{" °C"}</span>
        <FaTemperatureHalf />
      </h1>
      <span className="text-xs italic text-[#00ff04]">Wind Speed</span>
      <h1 className="text-4xl items-center font-extralight flex gap-2 text-[#dbdbdb]">
        {wind ?? 24}
        <span className="text-sm"> {" km/h"}</span>
        <Wind />
      </h1>
    </div>
  );
};
