import { StatusData } from "@/types/types";

const endpoint = "http://127.0.0.1:80/sensor/create/maintenance/logs";

export const useStatus = () => {
  const handlePoster = async (body?: StatusData[]) => {
    try {
      await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        },
      }).then((response) => response.json());
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return {
    handlePoster,
  };
};
