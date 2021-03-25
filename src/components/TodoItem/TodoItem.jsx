import React, { useState } from "react";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
  const {
    id,
    title,
    text,
    completed,
    completedDate,
    important,
    tags,
  } = props.todo;
  const [isShow, setIsShow] = useState(false);
  // Object completed styles
  const completedStyles = {
    bar: {
      backgroundColor: completed ? "#55B833" : "#DB4242",
    },
    item: {
      filter: completed && "none",
      border: completed && "1px solid #55B833",
      backgroundColor: important ? "#db4242" : "#FFF",
    },
    content: {
      opacity: completed && 0.45,
      title: {
        textDecoration: completed && "line-through",
      },
    },
    settings: {
      edit: {
        background: "url(images/edit.png) no-repeat center center / cover",
      },
      done: {
        background: "url(images/done.png) no-repeat center center / cover",
      },
      important: {
        background: "url(images/important.png) no-repeat center center / cover",
      },
      delete: {
        background: "url(images/trash.png)no-repeat center center / cover",
      },
    },
  };
  //toggleShowTextContent
  const toggleShow = () => {
    setIsShow(!isShow);
  };
  return (
    <li className={styles.item} style={completedStyles.item}>
      <div className={styles.status}>
        <div className={styles.bar} style={completedStyles.bar}></div>
      </div>
      <div className={styles.main}>
        <div className={styles.content} style={completedStyles.content}>
          <div className="top" onClick={() => text && toggleShow()}>
            <h2 className={styles.title} style={completedStyles.content.title}>
              {title}
            </h2>
            {tags && (
              <ul className={styles.tags}>
                {tags.map((tag, index) => (
                  <li key={index} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {isShow && (
            <div className={styles.bottom}>
              <div className={styles.line}></div>
              <div className={styles.text}>{text}</div>
            </div>
          )}
        </div>
        <ul className={styles.settings}>
          {!completed && (
            <React.Fragment>
              <li
                className={styles.setting}
                style={completedStyles.settings.edit}
                onClick={() => {
                  props.toggleEdit(id);
                }}
              ></li>
              <li
                className={styles.setting}
                style={completedStyles.settings.done}
                onClick={() => {
                  props.doneTodo(id);
                }}
              ></li>
              <li
                className={`${styles.setting} ${styles.important}`}
                style={completedStyles.settings.important}
                onClick={() => {
                  props.toggleImportant(id);
                }}
              ></li>
            </React.Fragment>
          )}
          {completed && (
            <li className={styles.date}>
              <span>Выполнено: {completedDate}</span>
            </li>
          )}
          <li
            className={styles.setting}
            style={completedStyles.settings.delete}
            onClick={() => {
              props.deleteTodo(id);
            }}
          ></li>
        </ul>
      </div>
    </li>
  );
};

export default TodoItem;
