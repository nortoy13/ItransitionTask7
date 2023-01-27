import { useEffect, useState } from "react";
import Cell from "../Cell/Cell";
import "./Main.css";
import { Patterns } from "../WinningPatterns";

const Main = ({ socket, roomCode }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [canPlay, setCanPlay] = useState(true);
  const [isWin, setIsWin] = useState("");
  useEffect(() => {
    socket.on("updateGame", (id) => {
      console.log("use Effect", id);
      setBoard((data) => ({ ...data, [id]: "O" }));
      setCanPlay(true);
    });
    return () => socket.off("updateGame");
  });

  useEffect(() => {
    checkWin();
  }, [board]);

  const handleCellClick = (e) => {
    const id = e.currentTarget.id;
    if (canPlay && board[id] === "") {
      setBoard((data) => ({ ...data, [id]: "X" }));
      socket.emit("play", { id, roomCode });
      setCanPlay(false);
    }
  };
  const playAgain = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setIsWin("");
  };

  const checkWin = () => {
    Patterns.forEach((pattern) => {
      if (
        board[pattern[0]] === "X" &&
        board[pattern[1]] === "X" &&
        board[pattern[2]] === "X"
      ) {
        setIsWin("you win");
      }
      if (
        board[pattern[0]] === "O" &&
        board[pattern[1]] === "O" &&
        board[pattern[2]] === "O"
      ) {
        setIsWin("you lose");
      }
    });
  };

  return (
    <main>
      {isWin ? (
        <p className="winner">
          {isWin} <button onClick={playAgain}>play again</button>
        </p>
      ) : (
        <></>
      )}
      <section className="main-section">
        <Cell handleCellClick={handleCellClick} id={"0"} text={board[0]} />
        <Cell handleCellClick={handleCellClick} id={"1"} text={board[1]} />
        <Cell handleCellClick={handleCellClick} id={"2"} text={board[2]} />

        <Cell handleCellClick={handleCellClick} id={"3"} text={board[3]} />
        <Cell handleCellClick={handleCellClick} id={"4"} text={board[4]} />
        <Cell handleCellClick={handleCellClick} id={"5"} text={board[5]} />

        <Cell handleCellClick={handleCellClick} id={"6"} text={board[6]} />
        <Cell handleCellClick={handleCellClick} id={"7"} text={board[7]} />
        <Cell handleCellClick={handleCellClick} id={"8"} text={board[8]} />
      </section>
    </main>
  );
};

export default Main;
