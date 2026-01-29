import { z } from "zod";

// Weather object (used in current, hourly, daily)
const weatherSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

// Current weather
const currentSchema = z.object({
  dt: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),
  weather: z.array(weatherSchema),
});

// Hourly forecast
const hourlySchema = z.object({
  dt: z.number(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number().optional(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),
  weather: z.array(weatherSchema),
  pop: z.number().optional(), // probability of precipitation
});

// Daily temperature object
const dailyTempSchema = z.object({
  day: z.number(),
  min: z.number(),
  max: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
});

// Daily feels_like object
const dailyFeelsLikeSchema = z.object({
  day: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
});

// Daily forecast
const dailySchema = z.object({
  dt: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
  moonrise: z.number(),
  moonset: z.number(),
  moon_phase: z.number(),
  summary: z.string().optional(),
  temp: dailyTempSchema,
  feels_like: dailyFeelsLikeSchema,
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),
  weather: z.array(weatherSchema),
  clouds: z.number(),
  pop: z.number().optional(),
  rain: z.number().optional(),
  uvi: z.number(),
});

// Full schema excluding minutely and alerts
export const weatherResponseSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number(),
  current: currentSchema,
  hourly: z.array(hourlySchema),
  daily: z.array(dailySchema),
});
