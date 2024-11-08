import { StatusData } from "@/types/types";
import { status_fetcher } from "@/utils/api_methods";
import useSWR from "swr";

export const useFetchStatus = () => {
  const { data, error, isLoading, isValidating } = useSWR<StatusData[]>(
    "http://127.0.0.1:80/sensor/retrieve/maintenance/logs",
    status_fetcher,
    {
      revalidateOnFocus: true,
      revalidateIfStale: true,
      revalidateOnMount: true,
      dedupingInterval: 1000,
    }
  );

  return {
    isLoading,
    isValidating,
    data,
    error,
  };
};
