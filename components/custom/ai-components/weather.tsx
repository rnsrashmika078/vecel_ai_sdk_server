"use client";

import { Wind } from "lucide-react";
import { FaTemperatureHalf } from "react-icons/fa6";
import { MdLocationOn, MdOutlineWbSunny } from "react-icons/md";

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
    <div className="mt-5 mb-5 relative w-full p-6 rounded-2xl overflow-hidden 
      bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700
      shadow-xl text-white">

      {/* soft glow background */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-300/20 blur-3xl rounded-full" />

      {/* Top section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-1 text-xs text-white/70">
            <MdLocationOn />
            {location}
          </div>
          <h2 className="text-sm text-white/60">{date}</h2>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
          <span className="text-sm">{weather}</span>
          {icon && (
            <img src={icon} alt="weather icon" className="w-10 h-10" />
          )}
        </div>
      </div>

      {/* Temperature */}
      <div className="flex items-end gap-3 mb-6">
        <h1 className="text-6xl font-light tracking-tight">
          {temperature ?? 24}
        </h1>
        <div className="flex items-center gap-1 text-white/80 mb-2">
          <span>°C</span>
          <FaTemperatureHalf />
        </div>
      </div>

      {/* Bottom stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md">
          <div className="text-xs text-white/60 mb-1">Wind Speed</div>
          <div className="flex items-center gap-2 text-lg">
            <Wind size={18} />
            {wind ?? 24} km/h
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md">
          <div className="text-xs text-white/60 mb-1">Condition</div>
          <div className="flex items-center gap-2 text-lg">
            <MdOutlineWbSunny />
            {weather}
          </div>
        </div>
      </div>
    </div>
  );
};