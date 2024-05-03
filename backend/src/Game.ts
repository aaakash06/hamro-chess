import { Chess } from "chess.js";
import { randomUUID } from "crypto";
import { WebSocket } from "ws";
import { INIT_GAME } from "./message";
export class Game {
  public p1: WebSocket; // white
  public p2: WebSocket; // black
  private moveCount = 0;
  private gameId: string;
  private startTime = new Date(Date.now());
  private lastMoveTime = new Date(Date.now());
  public chess: Chess;
  // public result: GAME_RESULT | null = null;
  private player1TimeConsumed = 0;
  private player2TimeConsumed = 0;

  constructor(p1: WebSocket, p2: WebSocket) {
    this.p1 = p1;
    this.p2 = p2;
    this.chess = new Chess();
    this.gameId = randomUUID();
    p1.send(JSON.stringify({ type: INIT_GAME, payload: { color: "white" } }));
    p2.send(JSON.stringify({ type: INIT_GAME, payload: { color: "black" } }));
  }

  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    // if moveCount is even its whites turn
    if (this.moveCount % 2 == 0) {
      if (socket == this.p2) {
        console.log("not blacks move");
        return;
      }
    } else {
      if (socket == this.p1) {
        console.log("not white move");
        return;
      }
    }
    try {
      this.chess.move(move);
      this.moveCount++;
      if (socket == this.p1) {
        this.p2.send(JSON.stringify({ type: "move", move }));
      } else {
        this.p1.send(JSON.stringify({ type: "move", move }));
      }
    } catch (err) {
      console.log(err);
      console.log("invalid move");
      socket.send("invalid move");
      return;
    }

    if (this.chess.isGameOver()) {
      console.log("game over");
      if (this.moveCount % 2 == 0) {
        console.log("winner is white");
      } else console.log("winner is black");
      return;
    }
  }
}
