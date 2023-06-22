import { Cell } from '../components/Cell';
import styles from './index.module.css';
import{useGame}from '../hooks/useGame'

const colors: string[] = ['', '黒のターン', '白のターン'];
const Home = () => {
  const {turnColor,board,onClick} = useGame();
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
