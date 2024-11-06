import { useEffect, useState } from "react";
import { socket } from "@/utils/sockets";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import dayjs from "dayjs";
import { usePostStatus } from "@/hooks/useStatus";
import { useSensors } from "@/hooks/useSensors";
import { status_poster } from "@/utils/api_methods";

export const useMaintenance = () => {
  const { handlePoster } = usePostStatus();
  const [timer, setTimer] = useState<string>("");
  const { machineStatus, setMachineStatus } = useLocalStorage();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [maintenaceDataSet, setMaintenaceDataSet] = useState<
    { id: number; status: number }[]
  >([]);

  useEffect(() => {
    function onConnect() {
      console.log("Socket Connected");
    }

    function onDisconnect() {
      console.log("Socket Disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("machine_status", (data) => {
      setTrigger(true);
      setMachineStatus(data);
      setTimer(dayjs().format("DD/MM/YYYY HH:mm:ss"));
      localStorage.setItem("timer", dayjs().format("DD/MM/YYYY HH:mm:ss"));
      localStorage.setItem("latestStatus", JSON.stringify(data));
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("machine_status", (data) => {
        setMachineStatus(data["data"]);
        setTimer("");
      });
    };
  }, [machineStatus]);

  useEffect(() => {
    const newMaintenances = machineStatus.filter(
      (ele) =>
        ele.status === -1 &&
        !maintenaceDataSet.some((item) => item.id === ele.id)
    );
    if (newMaintenances.length > 0) {
      setMaintenaceDataSet((prev) => [...newMaintenances]);
      const updatedData = newMaintenances.map((item) => ({
        ...item,
        date: dayjs().format("DD/MM/YYYY HH:mm:ssZ[Z]"),
      }));
      if (trigger === true) {
        const postData = async () => {
          // await handlePoster(updatedData);
          await status_poster(
            "http://127.0.0.1:80/sensor/create/maintenance/logs",
            updatedData
          );
        };
        postData();
        console.log("Done Post Maintenance Data");
        setModalOpen(true);
      }
    } else {
      setMaintenaceDataSet([]);
      setModalOpen(false);
    }
  }, [machineStatus, trigger]);

  return {
    timer,
    machineStatus,
    modalOpen,
    setModalOpen,
    maintenaceDataSet,
  };
};
