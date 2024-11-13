import { useState, useEffect } from "react";

const AppWebSocket = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  const connect = (event: React.FormEvent) => {
    event.preventDefault();

    const socket = new WebSocket("ws://technest.ddns.net:8001/ws");

    socket.onopen = () => {
      socket.send(apiKey);
    };

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    setWs(socket);
  };

  return (
    <div>
      <form onSubmit={connect}>
        <label>
          API Key:
          <input
            type="text"
            id="api_key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </label>
        <button type="submit">Connect</button>
      </form>

      <div id="messages">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default AppWebSocket;
