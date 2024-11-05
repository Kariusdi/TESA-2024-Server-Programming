import { SensorData, StatusData } from "@/types/types";

export const fetcher = (url: string): Promise<SensorData[]> =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.data[0])
    .catch((err) => console.log("Error!", err));

export const status_poster = (
  url: string,
  body?: object
): Promise<StatusData[]> =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => data.data[0])
    .catch((err) => {
      console.log("Error!", err);
      throw err;
    });
