import { Chess, Color, PieceSymbol, Square } from "chess.js";
import React, { useState } from "react";

const Board = ({
  chess,
  board,
  ws,
  color,
  moveCount,
}: {
  chess: Chess;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  ws: WebSocket;
  color: string;
  moveCount: number;
}) => {
  const [eror, setEror] = useState<string | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  console.log("move count: ", moveCount);
  return (
    <div
      className={`flex ${color == "white" ? "flex-col " : "flex-col-reverse"} `}
    >
      {chess.board().map((row, i) => {
        return (
          <div className="flex" key={i}>
            {row.map((sq, j) => (
              <div
                onClick={() => {
                  // if (color == "white") {
                  //   if (moveCount % 2 !== 0) return;
                  // } else {
                  //   if (moveCount % 2 == 0) return;
                  // }
                  if (eror && sq) setEror(null);
                  const letter = String.fromCharCode(j + 97);
                  const no = 8 - i;
                  const sqr = letter + no;
                  // console.log(sqr);
                  if (!from) {
                    if (!sq) {
                      return setEror("invalid move; pick a piece");
                    }
                    if (eror) setEror(null);
                    setFrom(sqr);
                    // console.log("from: ", sqr);
                  } else {
                    ws.send(
                      JSON.stringify({
                        type: "move",
                        move: { from, to: sqr },
                      })
                    );
                    // console.log(JSON.stringify({ from, to: sqr }));
                    try {
                      chess.move({ from, to: sqr });
                      // console.log(chess.board());
                      setFrom(null);
                    } catch (err) {
                      console.log(err);
                      console.log("invalid move");
                      setEror("invalid error");
                    }
                  }
                }}
                className={`grid cursor-pointer place-items-center w-14 h-14 ${
                  (i + j) % 2 == 0 ? "bg-white" : "bg-green-500"
                } ${sq?.color == "w" ? "text-red-500" : "text-black"} `}
                key={j}
              >
                {/* {String.fromCharCode(j + 97)}
              {8 - i} */}
                {sq?.type}
                {/* {sq?.square} */}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
