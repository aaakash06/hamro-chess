import { Chess, Color, PieceSymbol, Square } from "chess.js";
import React, { useState } from "react";

const Board = ({
  chess,
  board,
  ws,
  color,
  moveCount,
  setBoard,
}: {
  chess: Chess;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  ws: WebSocket;
  color: string;
  moveCount: React.MutableRefObject<number>;
  setBoard: (
    value: React.SetStateAction<
      ({
        square: Square;
        type: PieceSymbol;
        color: Color;
      } | null)[][]
    >
  ) => void;
}) => {
  const [eror, setEror] = useState<string | null>(null);
  const [from, setFrom] = useState<string | null>(null);

  return (
    <div
      className={`flex ${color == "white" ? "flex-col " : "flex-col-reverse"} `}
    >
      {board.map((row, i) => {
        return (
          <div className="flex justify-center " key={i}>
            {row.map((sq, j) => (
              <div
                onClick={() => {
                  if (color == "white") {
                    if (moveCount.current % 2 !== 0) return;
                  } else {
                    if (moveCount.current % 2 == 0) return;
                  }

                  if (eror && sq) setEror(null);
                  const letter = String.fromCharCode(j + 97);
                  const no = 8 - i;
                  const sqr = letter + no;

                  if (!from) {
                    if (!sq) {
                      return setEror("invalid move; pick a piece");
                    }
                    if (eror) setEror(null);
                    setFrom(sqr);
                  } else {
                    try {
                      chess.move({ from, to: sqr });
                      setBoard(chess.board());

                      ws.send(
                        JSON.stringify({
                          type: "move",
                          move: { from, to: sqr },
                        })
                      );
                      moveCount.current++;
                      setFrom(null);
                    } catch (err) {
                      console.log(err);
                      console.log("invalid move");
                      setEror("invalid error");
                    }
                  }
                }}
                className={`grid cursor-pointer place-items-center w-16 h-16 ${
                  (i + j) % 2 == 0 ? "bg-white" : "bg-green-500"
                } ${sq?.color == "w" ? "text-red-500" : "text-black"} `}
                key={j}
              >
                {/* {String.fromCharCode(j + 97)}
              {8 - i} */}

                {sq && (
                  <img
                    src={`/${
                      sq?.color == "w"
                        ? "w" + sq.type + ".png"
                        : "b" + sq?.type + ".png"
                    }`}
                    alt="chess"
                  />
                )}

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
