import Card from "./Card";
import { getWeather } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import Sunrise from "../../assets/sunrise.svg?react";
import Sunset from "../../assets/sunset.svg?react";
import Wind from "../../assets/wind.svg?react";
import Uv from "../../assets/uv.svg?react";
import Cloud from "../../assets/cloud.svg?react";
import Pressure from "../../assets/pressure.svg?react";
import UpArrow from "../../assets/uparrow.svg?react";
import type { Coords } from "../types";

type Props = {
  coords: Coords;
};

export default function AdditionalInfo({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {rows.map(({ label, value, Icon }) => (
        <div className="flex justify-between" key={value}>
          <div className="flex gap-4">
            <span className="text-gray-500">{label}</span>
            <Icon className="size-8" />
          </div>
          <span>
            <FormatComponent value={value} number={data.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset") {
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  function degToCompass(deg: number): string {
  const directions = [
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW",
    "W", "WNW", "NW", "NNW",
  ];

  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
}


  if (value === "wind_deg") {
  const direction = degToCompass(number);

  return (
    <div className="flex items-center gap-1">
      <UpArrow
        className="size-6 invert"
        style={{ transform: `rotate(${number}deg)` }}
      />
      <span className="text-sm tabular-nums">{direction}</span>
    </div>
  );
}
  return number;
}

const rows = [
  { label: "Cloudiness (%)", value: "clouds", Icon: Cloud },
  { label: "UV Index", value: "uvi", Icon: Uv },
  { label: "Wind Direction", value: "wind_deg", Icon: Wind },
  { label: "Pressure (hPa)", value: "pressure", Icon: Pressure },
  { label: "Sunrise", value: "sunrise", Icon: Sunrise },
  { label: "Sunset", value: "sunset", Icon: Sunset },
] as const;



