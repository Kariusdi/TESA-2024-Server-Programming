import { Message } from "@/types/types";
import { useEffect, useState } from "react";

export const useLocalStorage = () => {
  const [machineStatus, setMachineStatus] = useState<Message[]>([
    { id: 1, status: 404 },
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
