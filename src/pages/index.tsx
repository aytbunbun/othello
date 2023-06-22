import { useState } from 'react';
import { Cell } from '../components/Cell';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const colors: string[] = ['', '黒のターン', '白のターン'];
  const directions: { y: number; x: number }[] = [
    { y: -1, x: 0 },
    { y: -1, x: 1 },
    { y: 0, x: 1 },
    { y: 1, x: 1 },
    { y: 1, x: 0 },
    { y: -1, x: -1 },
    { y: 0, x: -1 },
    { y: 1, x: -1 },
  ];
  const gameSystem = (
    x: number,
    y: number,
    isOrange: boolean,
    turn: number,
    newBoard: number[][]
  ) => {
    let isOrangePlace = false;
    for (const dir of directions) {
      for (let i = 1; i < 8; i++) {
        if (newBoard[y + dir.y * i] === undefined) {
          break;
        } else if (newBoard[y + dir.y * i][x + dir.x * i] === turn) {
          break;
        } else if (newBoard[y + dir.y * i][x + dir.x * i] === 0) {
          break;
        } else if (newBoard[y + dir.y * i][x + dir.x * i] === 3) {
          break;
        } else if (
          newBoard[y + dir.y * i][x + dir.x * i] === 3 - turn &&
          newBoard[y + dir.y * (i + 1)] !== undefined &&
          newBoard[y + dir.y * (i + 1)][x + dir.x * (i + 1)] === turn
        ) {
          if (!isOrange) {
            newBoard[y][x] = turn;
            for (let m = 1; m <= i + 1; m++) {
              newBoard[y + dir.y * m][x + dir.x * m] = turn;
            }
          } else {
            if (i > 0) {
              isOrangePlace = true;
            }
          }
          break;
        }
      }
    }
    return { board: newBoard, color: isOrangePlace };
  };
  const onClick = (x: number, y: number) => {
    console.table(board);
    console.log(x, y);
    if (board[y][x] === 3) {
      const newBoard: number[][] = JSON.parse(JSON.stringify(board));
      const stones = gameSystem(x, y, false, turnColor, newBoard).board;

      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          stones[i][j] %= 3;
        }
      }
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (gameSystem(j, i, true, 3 - turnColor, stones).color && stones[i][j] === 0) {
            stones[i][j] = 3;
          }
        }
      }

      let nextTurnColor = 3 - turnColor;
      if (!stones.some((row) => row.includes(3))) {
        nextTurnColor = turnColor;
      }
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          stones[i][j] %= 3;
        }
      }
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (gameSystem(j, i, true, nextTurnColor, stones).color && stones[i][j] === 0) {
            stones[i][j] = 3;
          }
        }
      }
      setTurnColor(nextTurnColor);
      setBoard(stones);
    }
  };
  return (
    <div className={styles.container}>
      <div
        style={{ color: turnColor === 1 ? '#000' : '#fff', backgroundColor: 'green', fontSize: 60 }}
      >
        {colors[turnColor]}
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell key={`${x}-${y}`} color={color} onClick={() => onClick(x, y)} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
