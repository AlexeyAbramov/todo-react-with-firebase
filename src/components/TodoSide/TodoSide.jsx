import React, { useState, useEffect, useRef } from "react";
import styles from "./TodoSide.module.css";

import { shortDate } from "../../helpers";

const TodoSide = ({
  todo,
  updateTitle,
  updateTags,
  deleteTag,
  updateTextarea,
  closeTodoSide,
  deleteTodo,
}) => {
  const [isEdited, setIsEdited] = useState(false);

  const titleRef = useRef(null);
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const [value, setValue] = useState(todo.title);
  useEffect(() => {
    window.addEventListener("click", titleChange);
    const textarea = document.getElementById("textarea");
    textarea.style.height = `${textarea.scrollHeight}px`;
    return () => {
      window.removeEventListener("click", titleChange);
    };
  });

  const handleTitleChange = (e) => {
    setValue(e.target.value);
  };
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter" && todo.title !== value) {
      updateTitle(value);
      e.target.blur();
    }
  };
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      updateTags(e.target.value);
      e.target.value = "";
      e.target.blur();
    }
  };
  const titleChange = (e) => {
    const titleHtml = document.getElementById("title");
    !e.path.includes(titleHtml) && todo.title !== value && updateTitle(value);
  };
  const handleTextareaChange = (e) => {
    !isEdited && setIsEdited(true);
    updateTextarea(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const { tags, text } = todo;
  return (
    <div className={styles.side}>
      <div className={styles.heading}>
        <div className="status">
          <div className={styles.bar}></div>
        </div>
        <div className={styles.wrapper}>
          <input
            type="text"
            id="title"
            placeholder="Введите заголовок"
            ref={titleRef}
            className={styles.title}
            value={value}
            onInput={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
          />
        </div>
      </div>
      <div className={styles.tags}>
        <div className="icon">
          <img className={styles.tagIcon} src="./images/tag.png" alt="icon" />
        </div>
        <ul className={styles.list}>
          {tags &&
            tags.map((tag, index) => {
              return (
                <li key={tag} className={styles.tag}>
                  {tag}
                  <div
                    className={styles.cross}
                    onClick={() => deleteTag(index)}
                  >
                    <span></span>
                    <span></span>
                  </div>
                </li>
              );
            })}
          <input
            type="text"
            className={styles.inputAddTag}
            placeholder="Добавить тег"
            onKeyDown={handleTagKeyDown}
          />
        </ul>
      </div>
      <div className={styles.text}>
        <textarea
          name="text"
          id="textarea"
          placeholder="Введите текст"
          className={styles.textarea}
          value={text}
          onChange={handleTextareaChange}
        ></textarea>
        <div className={styles.update}>
          {isEdited && <span>Дата обновления: {shortDate}</span>}
        </div>
      </div>
      <div className={styles.options}>
        <div className={styles.close} onClick={closeTodoSide}>
          <img
            className={styles.closeArrow}
            src="./images/close.png"
            alt="close__icon"
          />
        </div>
        <div className={styles.added}>
          <span className="dateAddedText">
            Создано:{" "}
            {
              todo.dateOfCreate
                ? todo.dateOfCreate
                : shortDate /* потом поменять */
            }
          </span>
        </div>
        <div className={styles.delete} onClick={() => deleteTodo(todo.id)}>
          <img
            className={styles.trash}
            src="./images/trash.png"
            alt="trash__icon"
          />
        </div>
      </div>
    </div>
  );
};

export default TodoSide;
