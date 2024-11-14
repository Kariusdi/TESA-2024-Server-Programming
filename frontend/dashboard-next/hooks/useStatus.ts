import { useEffect, useState } from "react";
import { socket } from "@/utils/sockets";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import dayjs from "dayjs";
import { useSensors } from "@/hooks/useSensors";
import { status_poster } from "@/utils/api_methods";
import mqtt from "mqtt";
import { Message } from "@/types/types";

export const useStatus = () => {
  const [timer, setTimer] = useState<string>("");
  const { machineStatus, setMachineStatus } = useLocalStorage();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [maintenaceDataSet, setMaintenaceDataSet] = useState<
    { id: number; status: number }[]
  >([]);
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);

  useEffect(() => {
    const mqttClient = mqtt.connect("mqtt://localhost:9001", {
      username: "LinearOnly-Pon",
      password: "1q2w3e4r",
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker via WebSocket");
      setClient(mqttClient); // Store the client for later use

      mqttClient.subscribe("lintech/machines/status", (err) => {
        if (!err) {
          console.log(`Subscribed to topic: lintech/machines/status`);
        }
      });
    });

    mqttClient.on("message", (topic: string, payload: Buffer) => {
      try {
        const msg: Message = JSON.parse(payload.toString());
        const data = {
          id: msg.id,
          status: msg.status,
        };
        setMachineStatus([data]);
        setTimer(dayjs().format("DD/MM/YYYY HH:mm:ss"));
        setTrigger(true);
        localStorage.setItem("timer", dayjs().format("DD/MM/YYYY HH:mm:ss"));
        localStorage.setItem("latestStatus", JSON.stringify([data]));
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    });

    mqttClient.on("error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  useEffect(() => {}, []);

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
          await status_poster(updatedData);
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
