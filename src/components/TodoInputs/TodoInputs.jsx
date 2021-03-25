import TodoFilter from "../TodoFilter";
import TodoSort from "../TodoSort";
import styles from "./TodoInputs.module.css";

import { Button } from "@material-ui/core";

const TodoInputs = ({
  todos,
  filteredTodos,
  filterRequest,
  addTodo,
  activeSortInput,
  switchName,
}) => {
  return (
    <div className={styles.inputs}>
      <div className={styles.wrapper}>
        <TodoFilter
          filteredTodos={filteredTodos}
          filterRequest={filterRequest}
        />
        <Button variant="contained" className={styles.add} onClick={addTodo}>
          +
        </Button>
      </div>

      <TodoSort
        activeSortInput={activeSortInput}
        switchName={switchName}
        todos={todos}
      />
    </div>
  );
};

export default TodoInputs;
