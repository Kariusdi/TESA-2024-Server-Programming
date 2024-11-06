import { SensorData } from "@/types/types";
import { sensor_fetcher } from "@/utils/api_methods";
import useSWR from "swr";

export const useSensors = () => {
  const { data, error, isLoading, isValidating } = useSWR<SensorData[]>(
    "http://127.0.0.1:80/sensor/retrieve",
    sensor_fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    isLoading,
    isValidating,
    data,
    error,
  };
};
