import { useState, useEffect } from "react";
export default function useSocket() {
  const [ws, setws] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://hamro-chess-1.onrender.com/");
    ws.onopen = () => {
      console.log("connected to the wss");
      setws(ws);
      ws.send(JSON.stringify({ type: "init_game" }));
    };
    ws.onclose = () => {
      setws(null);
      console.log("disconnected to the wss");
    };

    return () => {
      ws.close();
    };
  }, []);
  // ws.onmessage = async (message) => {
  //   const data = JSON.parse(message.data.toString());
  //   console.log("message :  %s ", message.data);
  //   if (data.type == "init_game") {
  //     color = data.payload.color;
  //   }
  //   if (data.type == "move") {
  //     try {
  //       chess.move(data.move);
  //       setCount((count) => count++);
  //     } catch (err) {
  //       console.log("invalid move from other side");
  //     }
  //   }
  // };
  return ws;
}
