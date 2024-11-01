import { SensorData } from "@/types/types";

export const fetcher = (url: string): Promise<SensorData[]> =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.data[0])
    .catch((err) => console.log("Error!", err));
