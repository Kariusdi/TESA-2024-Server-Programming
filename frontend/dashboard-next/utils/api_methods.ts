import { SensorData, StatusData, StatusDataNoId } from "@/types/types";

export const sensor_fetcher = (url: string): Promise<SensorData[]> =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.data[0])
    .catch((err) => console.log("Error!", err));

export const status_fetcher = async (url: string): Promise<StatusData[]> =>
  await fetch(url)
    .then((res) => res.json())
    .then((data) => data.data[0] ?? [])
    .catch((err) => console.log("Error! This Collection is Empty", err));

export const status_poster = async (body: object): Promise<StatusDataNoId[]> =>
  await fetch("http://127.0.0.1:80/sensor/create/maintenance/logs", {
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

export const status_updater = async (
  _id: string,
  body: object
): Promise<StatusDataNoId> =>
  await fetch(`http://127.0.0.1:80/sensor/update/maintenance/logs/${_id}`, {
    method: "PUT",
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

export const status_deleter = async (): Promise<boolean[]> =>
  await fetch("http://127.0.0.1:80/sensor/delete/maintenance/logs", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.data[0])
    .catch((err) => {
      console.log("Error!", err);
      throw err;
    });
