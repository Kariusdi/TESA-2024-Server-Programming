import { useEffect, useState } from "react";
import { socket } from "@/utils/sockets";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import dayjs from "dayjs";
import { useSensors } from "@/hooks/useSensors";
import { status_poster } from "@/utils/api_methods";
import mqtt from "mqtt";

interface Message {
  machine_id: number;
  sensorVal: number;
}

export const useMaintenance = () => {
  const [timer, setTimer] = useState<string>("");
  const { machineStatus, setMachineStatus } = useLocalStorage();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [maintenaceDataSet, setMaintenaceDataSet] = useState<
    { id: number; status: number }[]
  >([]);
  const [messages, setMessages] = useState<{ id: number; sensorVal: number }>();
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);

  // useEffect(() => {
  //   function onConnect() {
  //     console.log("Socket Connected");
  //   }

  //   function onDisconnect() {
  //     console.log("Socket Disconnected");
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  //   socket.on("machine_status", (data) => {
  //     setTrigger(true);
  //     setMachineStatus(data);
  //     setTimer(dayjs().format("DD/MM/YYYY HH:mm:ss"));
  //     localStorage.setItem("timer", dayjs().format("DD/MM/YYYY HH:mm:ss"));
  //     localStorage.setItem("latestStatus", JSON.stringify(data));
  //   });

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //     socket.off("machine_status", (data) => {
  //       setMachineStatus(data["data"]);
  //       setTimer("");
  //     });
  //   };
  // }, [machineStatus]);

  useEffect(() => {
    // Initialize the MQTT client when the component mounts
    const mqttClient = mqtt.connect("mqtt://localhost:9001", {
      username: "LinearOnly-Pon", // optional
      password: "1q2w3e4r", // optional
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker via WebSocket");
      setClient(mqttClient); // Store the client for later use

      mqttClient.subscribe("lintech/machines/status", (err) => {
        if (!err) {
          console.log(`Subscribed to topic: lintech/machines/status`);
        }
      });

      // Attach message handler only once after connecting
      mqttClient.on("message", (topic: string, payload: Buffer) => {
        try {
          const msg: Message = JSON.parse(payload.toString());
          // setMessages((prevMessages) => [
          //   ...prevMessages,
          //   `Machine ID: ${msg.machine_id}, Sensor Value: ${msg.sensorVal}`,
          // ]);
          const data = {
            id: msg.machine_id,
            sensorVal: msg.sensorVal,
          };
          setMessages(data);
          console.log(
            `Received message on topic ${topic}: ${JSON.stringify(msg)}`
          );
        } catch (error) {
          console.error("Failed to parse message:", error);
        }
      });
    });

    mqttClient.on("error", (error) => {
      console.error("Connection error:", error);
    });

    // Clean up connection on component unmount
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

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
    messages,
    timer,
    machineStatus,
    modalOpen,
    setModalOpen,
    maintenaceDataSet,
  };
};
