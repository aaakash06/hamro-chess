import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const portt: number | undefined = +process.env.PORT!;

const wss = new WebSocketServer({ port: portt || 8000 });
const gameManagger = new GameManager();
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  gameManagger.addUser(ws);
  // ws.on("message", function message(data) {
  //   console.log("received: %s", data);
  // });
  ws.on("close", () => {
    console.log("user disconnected");
    gameManagger.removeUser(ws);
  });
});
