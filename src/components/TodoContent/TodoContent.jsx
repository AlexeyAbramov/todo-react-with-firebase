import styles from "./TodoContent.module.css";

import TodoTitle from "../TodoTitle";
import TodoList from "../TodoList";

const TodoContent = (props) => {
  return (
    <section className={styles.content}>
      <TodoTitle />
      <TodoList
        state={props.state}
        isLoading={props.isLoading}
        toggleImportant={props.toggleImportant}
        doneTodo={props.doneTodo}
        addTodo={props.addTodo}
        deleteTodo={props.deleteTodo}
        toggleEdit={props.toggleEdit}
        switchName={props.switchName}
        switchSort={props.switchSort}
        filterRequest={props.filterRequest}
        filteredTodos={props.filteredTodos}
      />
    </section>
  );
};

export default TodoContent;
