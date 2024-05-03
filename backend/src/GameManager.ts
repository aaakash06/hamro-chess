// import { User } from "./type";
import { Game } from "./Game";
import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./message";

export class GameManager {
  private users: WebSocket[];
  private pendingUser: WebSocket | null;
  private games: Game[];

  constructor() {
    this.users = [];
    this.pendingUser = null;
    this.games = [];
  }

  addUser(user: WebSocket) {
    this.users.push(user);
    this.socketHandler(user);
    console.log("user added");
  }

  removeUser(user: WebSocket) {
    this.users.filter((item) => item !== user);
    if (this.pendingUser == user) this.pendingUser = null;
    console.log("user removed");
  }

  socketHandler(socket: WebSocket) {
    socket.on("message", (message) => {
      console.log({
        pending: this.pendingUser ? "exists" : "doesn't exist",
        message: message.toString(),
      });
      const data = JSON.parse(message.toString());
      if (data.type == INIT_GAME) {
        if (!this.pendingUser) {
          this.pendingUser = socket;
        } else {
          if (this.pendingUser !== socket) {
            const game = new Game(this.pendingUser, socket);

            this.games.push(game);
            this.pendingUser = null;
            console.log("game created");
          } else {
            console.log("same user two init");
          }
        }
      } else if (data.type == MOVE) {
        const game = this.games.find(
          (game) => game.p1 === socket || game.p2 === socket
        );
        game?.makeMove(socket, data.move);
        console.log(game?.chess.ascii());
      }
    });
  }
}
