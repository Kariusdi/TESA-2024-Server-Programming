import { useEffect, useState } from "react";

export const useLocalStorage = () => {
  const [machineStatus, setMachineStatus] = useState<
    { id: number; status: number }[]
  >([
    { id: 1, status: 404 },
    { id: 2, status: 404 },
    { id: 3, status: 404 },
    { id: 4, status: 404 },
    { id: 5, status: 404 },
    { id: 6, status: 404 },
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("latestStatus");
      if (saved) {
        setMachineStatus(JSON.parse(saved));
      }
    }
  }, []);

  return {
    machineStatus,
    setMachineStatus,
  };
};
