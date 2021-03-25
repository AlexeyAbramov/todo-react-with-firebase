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
      {!todos.length && <span>Добавьте задачу</span>}
    </div>
  );
};
export default TodoList;
