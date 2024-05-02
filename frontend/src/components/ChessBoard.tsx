import { Chess } from "chess.js";
// import { useEffect } from "react";
import { useState } from "react";

const ChessBoard = async () => {
  const chess = new Chess();
  let color = "white";
  const [moveCount, setCount] = useState(0);
  const ws = new WebSocket("ws://localhost:8080");
  ws.onopen = () => {
    console.log("connected to the wss");
    ws.send(JSON.stringify({ type: "init_game" }));
  };
  ws.onclose = () => {
    console.log("disconnected to the wss");
  };

  ws.onmessage = async (message) => {
    const data = JSON.parse(message.data.toString());
    console.log("message :  %s ", message.data);
    if (data.type == "init_game") {
      color = data.payload.color;
    }
    if (data.type == "move") {
      try {
        chess.move(data.move);
        setCount((count) => count++);
      } catch (err) {
        console.log("invalid move from other side");
      }
    }
  };
  return (
    <ChessSetUp
      color={color}
      ws={ws}
      chess={chess}
      moveCount={moveCount}
    ></ChessSetUp>
  );
};

const ChessSetUp = ({
  color,
  ws,
  chess,
  moveCount,
}: {
  color: string;
  ws: WebSocket;
  chess: Chess;
  moveCount: number;
}) => {
  const [eror, setEror] = useState<string | null>(null);
  const [from, setFrom] = useState<string | null>(null);

  // console.log(chess.board());

  // useEffect(() => {
  //   console.log("move made");
  // }, [board]);

  return (
    <>
      <div
        className={`flex ${
          color == "white" ? "flex-col " : "flex-col-reverse"
        } `}
      >
        {chess.board().map((row, i) => {
          return (
            <div className="flex" key={i}>
              {row.map((sq, j) => (
                <div
                  onClick={() => {
                    if (color == "white") {
                      if (moveCount % 2 !== 0) return;
                    } else {
                      if (moveCount % 2 == 0) return;
                    }
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
                        console.log(chess.board());
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
      <div className="mt-10 text-black font-bold">{eror}</div>
    </>
  );
};

export default ChessBoard;
