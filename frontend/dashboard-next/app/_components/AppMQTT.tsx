import mqtt from "mqtt";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  topic: string;
}

interface Message {
  machine_id: number;
  sensorVal: number;
}

const AppMQTT: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [messages, setMessages] = useState<string[]>([]);
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const [subscribedTopic, setSubscribedTopic] = useState<string | null>(null); // Track the current subscribed topic

  useEffect(() => {
    // Initialize the MQTT client when the component mounts
    const mqttClient = mqtt.connect("mqtt://localhost:9001", {
      username: "LinearOnly-Pon", // optional
      password: "1q2w3e4r", // optional
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker via WebSocket");
      setClient(mqttClient); // Store the client for later use

      // Attach message handler only once after connecting
      mqttClient.on("message", (topic: string, payload: Buffer) => {
        try {
          const msg: Message = JSON.parse(payload.toString());
          setMessages((prevMessages) => [
            ...prevMessages,
            `Machine ID: ${msg.machine_id}, Sensor Value: ${msg.sensorVal}`,
          ]);
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

  // Handle subscription and ensure that only one message listener is active
  const handleSubscription = useCallback(
    (topic: string) => {
      if (client && topic !== subscribedTopic) {
        // Unsubscribe from the previous topic, if any
        if (subscribedTopic) {
          client.unsubscribe(subscribedTopic, (err) => {
            if (!err) {
              console.log(`Unsubscribed from topic: ${subscribedTopic}`);
            }
          });
        }

        // Subscribe to the new topic
        client.subscribe(topic, (err) => {
          if (!err) {
            console.log(`Subscribed to topic: ${topic}`);
            setSubscribedTopic(topic); // Set the current subscribed topic
          }
        });
      }
    },
    [client, subscribedTopic]
  );

  // Handle unsubscription
  const handleUnSubscription = useCallback(
    (topic: string) => {
      if (client && subscribedTopic === topic) {
        client.unsubscribe(topic, (err) => {
          if (!err) {
            console.log(`Unsubscribed from topic: ${topic}`);
            setSubscribedTopic(null); // Reset the subscribed topic
          }
        });
      }
    },
    [client, subscribedTopic]
  );

  const formSubmitSubscription = useCallback(
    (data: FormData) => {
      handleSubscription(data.topic);
    },
    [handleSubscription]
  );

  const formSubmitUnSubscription = useCallback(
    (data: FormData) => {
      handleUnSubscription(data.topic);
    },
    [handleUnSubscription]
  );

  return (
    <section>
      <h1 className="text-3xl font-bold mt-10">MQTT Protocol</h1>
      <form onSubmit={handleSubmit(formSubmitSubscription)}>
        <div className="flex justify-center items-center space-x-5 mt-5">
          <div className="">
            <input
              type="text"
              placeholder="Please enter your topic"
              className="py-2 px-4"
              {...register("topic", { required: true })}
            />
            {errors.topic && (
              <p className="text-red-400 text-sm">Topic is required</p>
            )}
          </div>

          <input
            type="submit"
            value="Subscribe"
            className="bg-green-400 rounded-lg text-white font-bold py-2 px-4"
          />
        </div>
      </form>
      <form onSubmit={handleSubmit(formSubmitUnSubscription)}>
        <div className="mt-2">
          <input
            type="submit"
            value="Unsubscribe"
            className="bg-red-400 rounded-lg text-white font-bold py-2 px-4"
          />
        </div>
      </form>
      <div className="mt-5">
        {messages.length !== 0 ? (
          <>
            {messages.map((msg, idx) => (
              <p key={idx} className="text-lg font-semibold text-green-600">
                {msg}
              </p>
            ))}
          </>
        ) : (
          <p className="text-sm text-gray-500">No messages received yet.</p>
        )}
      </div>
    </section>
  );
};

export default AppMQTT;
