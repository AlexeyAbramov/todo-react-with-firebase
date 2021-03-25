import styles from "./TodoTitle.module.css";
import { currentDate } from "../../helpers";

const TodoTitle = () => {
  
  return (
    <div className={styles.title}>
      <h1 className={styles.text}>{`Сегодня, ${currentDate}`}</h1>
    </div>
  );
};

export default TodoTitle;
