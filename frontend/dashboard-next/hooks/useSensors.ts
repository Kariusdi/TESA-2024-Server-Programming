import { SensorData } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useSensors = () => {
  const { data, error, isLoading, isValidating } = useSWR<SensorData[]>(
    "http://127.0.0.1:8000/sensor/retrieve",
    fetcher
  );

  return {
    isLoading,
    isValidating,
    data,
    error,
  };
};
