import React, { useState, useCallback, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";

interface MqttButtonProps {
  brokerUrl: string; // URL of your MQTT broker, e.g., "ws://localhost:9001"
  topic: string; // The topic to publish to, e.g., "lintech/machines/status"
}

const MqttButton: React.FC<MqttButtonProps> = ({ brokerUrl, topic }) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [buttonState, setButtonState] = useState<boolean>(false);

  // Function to establish MQTT connection
  const connectMqtt = useCallback(() => {
    const mqttClient = mqtt.connect(brokerUrl, {
      username: "LinearOnly-Jae", // Optional: set your username
      password: "1q2w3e4r", // Optional: set your password
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      setClient(mqttClient);
    });

    mqttClient.on("error", (error) => {
      console.error("MQTT Connection error:", error);
    });

    return mqttClient;
  }, [brokerUrl]);

  // Handle the button click to publish a message
  const handleButtonClick = useCallback(() => {
    if (client) {
      const payload = JSON.stringify({
        status: 1,
      });
      client.publish(topic, payload, { qos: 0 }, (error) => {
        if (error) {
          console.error("Failed to publish message:", error);
        } else {
          console.log("Message sent:", payload);
        }
      });
    } else {
      console.error("MQTT client not connected");
    }
  }, [client, topic]);

  useEffect(() => {
    const mqttClient = mqtt.connect(brokerUrl, {
      username: "LinearOnly-Jae", // Optional: set your username
      password: "1q2w3e4r", // Optional: set your password
    });

    mqttClient.on("connect", () => {
      console.log("Button Connected to MQTT broker via WebSocket");
      setClient(mqttClient);
    });

    mqttClient.on("error", (error) => {
      console.error("Button MQTT Connection error:", error);
    });

    // Clean up connection on component unmount
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  // Connect to the MQTT broker when the component mounts
  useEffect(() => {
    const mqttClient = connectMqtt();
    return () => {
      // Clean up and disconnect on unmount
      if (mqttClient) mqttClient.end();
    };
  }, [connectMqtt]);

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="py-2 px-5 cursor-pointer bg-[#F85F3F] hover:bg-[#34150F] text-white font-bold rounded-full mt-3 mb-5 w-[125px] h-[125px] flex justify-center items-center shadow-lg active:bg-black active:shadow-inner"
      >
        Prediction
      </button>
    </div>
  );
};

export default MqttButton;
