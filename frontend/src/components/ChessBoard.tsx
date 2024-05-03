import { Chess } from "chess.js";
// import { useEffect } from "react";
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import Board from "./Board";
// import Board from "./Board";

const ChessBoard = () => {
  const ws: WebSocket | null = useSocket();

  const [chess, setChess] = useState<Chess>(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [color, setColor] = useState<string | null>(null);
  let moveCount = 0;
  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (evt) => {
      console.log(evt.data);
      const data = JSON.parse(evt.data);
      switch (data.type) {
        case "init_game":
          console.log(data);
          setColor(data.payload.color);
          break;
        case "move":
          moveCount++;
          chess.move(data.move);
          setBoard(chess.board());
          console.log("move from the other side: ", data.move);
          break;
      }
    };
  }, [ws]);

  //   let color = "white";

  if (!ws) return <div>connecting ..... </div>;
  else if (!color) return <div> searching partner..... </div>;
  return (
    <>
      <p className="text-center">you are {color}</p>
      <Board
        chess={chess}
        board={chess.board()}
        ws={ws}
        color={color}
        moveCount={moveCount}
      />
      {/* <div className="mt-10 text-black font-bold">{eror}</div> */}
    </>
  );
};

// const [moveCount, setCount] = useState(0);

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

export default ChessBoard;
