import React from "react";
import { Chess } from "chess.js";
const ChessImage = () => {
  const chess = new Chess();
  return (
    <div>
      <div className="flex flex-col">
        {chess.board().map((row, i) => {
          return (
            <div className="flex justify-center " key={i}>
              {row.map((sq, j) => (
                <div
                  className={`grid cursor-pointer place-items-center max-md:w-16 max-md:h-16 max-sm:w-12 max-sm:h-12  w-20 h-20 lg:w-[5rem] lg:h-[5rem]   ${
                    (i + j) % 2 == 0 ? "bg-white" : "bg-green-500"
                  } ${sq?.color == "w" ? "text-red-500" : "text-black"} `}
                  key={j}
                >
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
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChessImage;
