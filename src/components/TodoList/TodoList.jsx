import React from "react";
import styles from "./TodoList.module.css";

import TodoInputs from "../TodoInputs";
import TodoItem from "../TodoItem";

const TodoList = (props) => {
  const { todos, req, activeSortInput } = props.state;
  const filteredItems = props.filteredTodos(
    props.switchSort(activeSortInput),
    req
  );
  return (
    <div className={styles.list}>
      <TodoInputs
        activeSortInput={activeSortInput}
        switchName={props.switchName}
        filterRequest={props.filterRequest}
        filteredTodos={props.filteredTodos}
        addTodo={props.addTodo}
        todos={todos}
      />
      <ul className={styles.list}>
        {filteredItems.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleEdit={props.toggleEdit}
            doneTodo={props.doneTodo}
            deleteTodo={props.deleteTodo}
            toggleImportant={props.toggleImportant}
          />
        ))}
      </ul>
      {props.isLoading && (
        <div className={styles.loading}>
          <img src="images/loading.gif" alt="loading__icon" />
        </div>
      )}
      {!todos.length && !props.isLoading && (
        <span className={styles.recommend}>Добавьте задачу</span>
      )}
    </div>
  );
};
export default TodoList;
