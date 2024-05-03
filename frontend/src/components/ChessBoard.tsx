import { Chess } from "chess.js";
// import { useEffect } from "react";
import { useEffect, useRef, useState } from "react";
import useSocket from "../hooks/useSocket";
import Board from "./Board";
// import Board from "./Board";

const ChessBoard = () => {
  const ws: WebSocket | null = useSocket();

  const [chess, setChess] = useState<Chess>(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [color, setColor] = useState<string | null>(null);
  const moveCount = useRef(0);
  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (evt) => {
      console.log(evt.data);
      const data = JSON.parse(evt.data);
      switch (data.type) {
        case "init_game":
          // console.log(data);
          setColor(data.payload.color);
          break;
        case "move":
          moveCount.current++;
          chess.move(data.move);
          setBoard(chess.board());
          // console.log("move from the other side: ", data.move);
          break;
      }
    };
  }, [ws]);

  if (!ws) return <div>connecting ..... </div>;
  else if (!color) return <div> searching partner..... </div>;
  return (
    <div className="w-screen h-screen bg-slate-700">
      <p className="text-center">you are {color}</p>
      <Board
        chess={chess}
        board={board}
        ws={ws}
        color={color}
        moveCount={moveCount}
        setBoard={setBoard}
      />

      {/* <div className="mt-10 text-black font-bold">{eror}</div> */}
    </div>
  );
};

export default ChessBoard;

/// learning point: i had to increament the moveCount and the board after the user makes a move in the frontend; i would use board as a state and when it is updated a repainting takes place;
// doing the same with count would render it twice when i need not show it upfront ; however using it as a normal variable and passing it down as a normal prop would reset its value to 0 with each render; thus use useRef
