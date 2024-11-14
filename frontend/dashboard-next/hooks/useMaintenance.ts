import { useEffect, useState } from "react";
import { socket } from "@/utils/sockets";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import dayjs from "dayjs";
import { useSensors } from "@/hooks/useSensors";
import { status_poster } from "@/utils/api_methods";
import mqtt from "mqtt";

interface Message {
  id: number;
  status: number;
}

export const useMaintenance = () => {
  const [timer, setTimer] = useState<string>("");
  const { machineStatus, setMachineStatus } = useLocalStorage();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [maintenaceDataSet, setMaintenaceDataSet] = useState<
    { id: number; status: number }[]
  >([]);
  const [messages, setMessages] = useState<{ id: number; status: number }>();
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

      mqttClient.subscribe("lintech/machine/status", (err) => {
        if (!err) {
          console.log(`Subscribed to topic: lintech/machine/status`);
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
            id: msg.id,
            status: msg.status,
          };
          const dataList = [data];
          setTrigger(true);
          setMessages(data);
          setMachineStatus(dataList);
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
    // Find any new maintenance records with status -1 that aren't already in maintenaceDataSet
    // const newMaintenances = machineStatus.filter(
    //   (ele) =>
    //     ele.status === -1 &&
    //     !maintenaceDataSet.some((item) => item.id === ele.id)
    // );
    // console.log(newMaintenances);
    // if (newMaintenances.length > 0) {
    //   // Update the maintenance dataset with new entries
    //   const updatedDataSet = [
    //     ...maintenaceDataSet,
    //     ...newMaintenances.map((item) => ({
    //       ...item,
    //       date: dayjs().format("DD/MM/YYYY HH:mm:ssZ[Z]"),
    //     })),
    //   ];
    //   setMaintenaceDataSet(updatedDataSet);
    //   if (trigger) {
    //     const postData = async () => {
    //       await status_poster(updatedDataSet);
    //     };
    //     postData();
    //     console.log("Done Post Maintenance Data");
    //     // Open modal when new data with status -1 comes in
    //     setModalOpen(true);
    //   }
    // } else {
    //   // Close the modal if there’s no new data with status -1
    //   setModalOpen(false);
    // }
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
