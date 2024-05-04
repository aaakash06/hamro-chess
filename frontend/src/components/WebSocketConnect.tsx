import { useState } from "react";

const WebSocketConnect = () => {
  const [message, setMessage] = useState<string[]>([]);
  async function connect() {
    const ws = await new WebSocket("wss://hamro-chess-1.onrender.com");
    ws.onopen = () => {
      setMessage((msg) => [...msg, "connected to wss"]);
      ws.send(JSON.stringify({ type: "init_game" }));
    };

    ws.onmessage = (evt) => {
      setMessage((msg) => [...msg, evt.data.toString()]);
    };
  }

  return (
    <div className="w-scree grid place-items-center h-screen bg-neutral-700">
      <button
        className="bg-white px-10 py-4 ring-2 rounded-md mb-20"
        onClick={connect}
      >
        connect to ws
      </button>
      {message.map((msg) => (
        <div key={msg} className="my-4 text-white text-2xl">
          {" "}
          {msg}
        </div>
      ))}
    </div>
  );
};

export default WebSocketConnect;
