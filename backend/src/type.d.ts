export interface UserInterface {
  socket: WebSocket;
  id: string;
  userId: string;
}
export interface GameInterface {
  p1: WebSocket;
  p2: WebSocket;
}
