import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
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
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    for (const dir of directions) {
      for (let i = 1; i < 8; i++)
        if (board[y + dir.y * i] === undefined) {
          break;
        } else if (board[y + dir.y * i][x + dir.x * i] === turnColor) {
          break;
        } else if (board[y + dir.y * i][x + dir.x * i] === 0) {
          break;
        } else if (
          board[y + dir.y * i][x + dir.x * i] !== turnColor &&
          board[y + dir.y * (i + 1)] !== undefined &&
          board[y + dir.y * (i + 1)][x + dir.x * (i + 1)] === turnColor
        ) {
          newBoard[y][x] = turnColor;
          for (let m = 1; m < i + 1; m++) {
            newBoard[y + dir.y * m][x + dir.x * m] = turnColor;
          }

          setTurnColor(3 - turnColor);
          break;
        }
    }
    setBoard(newBoard);
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
