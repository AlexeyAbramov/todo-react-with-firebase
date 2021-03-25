import styles from "./TodoFilter.module.css";

import { Input } from "@material-ui/core";

const TodoFilter = (props) => {
  return (
    <>
      <Input
        color="secondary"
        className={styles.filter}
        placeholder="Фильтр по названию"
        onInput={props.filterRequest}
      ></Input>
    </>
  );
};

export default TodoFilter;
