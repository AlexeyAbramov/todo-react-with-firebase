import React, { useState, useEffect } from "react";
import styles from "./TodoSort.module.css";

import { Button, ButtonGroup } from "@material-ui/core";

const TodoSort = React.memo(function TodoSort(props) {
  const [sortInputs, setSortInputs] = useState([]);
  useEffect(() => {
    setSortInputs([
      { name: "all", text: "ВСЕ" },
      { name: "active", text: "АКТИВНЫЕ" },
      { name: "done", text: "ВЫПОЛНЕННЫЕ" },
    ]);
  }, []);
  // memo и [] т.к данные статичны и нет необходимости повторного рендера

  const [results, setResults] = useState([]);
  useEffect(() => {
    const all = props.todos.length;
    const active = props.todos.filter((todo) => !todo.completed).length;
    const done = all - active;
    setResults([all, active, done]);
  }, [props.todos]);
  // dependencies - [props.todos]
  
  const buttons = sortInputs.map(({ name, text }, index) => {
    const status = props.activeSortInput === name;
    return (
      <Button
        key={name}
        className={`${styles.button} ${status ? styles.active : ""}`}
        onClick={() => !status && props.switchName(name)}
      >
        <span>{text} <sup className={styles.sup}>{`[${results[index]}]`}</sup></span>
      </Button>
    );
  });
  return <ButtonGroup>{buttons}</ButtonGroup>;
});

export default TodoSort;
