import { useEffect, useState } from "react";

import styles from "./TodoSignup.module.css";

import { validateEmail } from "../../helpers";

const TodoSignup = ({
  username,
  email,
  password,
  handleUsername,
  handleEmail,
  handlePassword,
  handleReg,
  toggleForms,
}) => {
  
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    validateEmail(email) && password.length >= 6
      ? setDisabled(false)
      : setDisabled(true);
  }, [username, email, password]);

  return (
    <form className={styles.login}>
      <input
        type="text"
        placeholder="имя"
        value={username}
        className={styles.username}
        onChange={handleUsername}
      />
      <input
        type="text"
        className={styles.email}
        placeholder="логин (почта)"
        value={email}
        onChange={handleEmail}
      />
      <input
        type="password"
        className={styles.password}
        placeholder="пароль"
        value={password}
        onChange={handlePassword}
      />
      <span className={styles.symbols}>не менее 6 символов</span>
      <button className={styles.button} onClick={handleReg} disabled={disabled}>
        Зарегистрироваться
      </button>
      <p className={styles.message}>
        Уже зарегистрированы?
        <span className={styles.create} onClick={toggleForms}>
          Войти
        </span>
      </p>
    </form>
  );
};

export default TodoSignup;
