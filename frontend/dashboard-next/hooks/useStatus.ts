import { StatusData, StatusDataNoId } from "@/types/types";
import { status_fetcher, status_updater } from "@/utils/api_methods";
import useSWR from "swr";

// export const usePostStatus = () => {
//   const handlePoster = async (body?: StatusDataNoId[]) => {
//     try {
//       await fetch("http://127.0.0.1:80/sensor/create/maintenance/logs", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//           "Content-type": "application/json",
//         },
//       }).then((response) => response.json());
//     } catch (error) {
//       console.error("Error posting data:", error);
//     }
//   };

//   return {
//     handlePoster,
//   };
// };

// export const useUpdateStatus = () => {
//   const handleUpdater = async (body?: StatusDataNoId, _id?: string) => {
//     console.log(body);
//     try {
//       await fetch(`http://127.0.0.1:80/sensor/update/maintenance/logs/${_id}`, {
//         method: "PUT",
//         body: JSON.stringify(body),
//         headers: {
//           "Content-type": "application/json",
//         },
//       }).then((response) => response.json());
//     } catch (error) {
//       console.error("Error updating data:", error);
//     }
//   };

//   return {
//     handleUpdater,
//   };
// };

export const useFetchStatus = () => {
  const { data, error, isLoading, isValidating } = useSWR<StatusData[]>(
    "http://127.0.0.1:80/sensor/retrieve/maintenance/logs",
    status_fetcher,
    {
      revalidateOnFocus: true,
      revalidateIfStale: true,
      revalidateOnMount: true,
    }
  );

  return {
    isLoading,
    isValidating,
    data,
    error,
  };
};
