import { useState, useEffect } from "react";

import styles from "./TodoLogin.module.css";

import { validateEmail } from "../../helpers";

const TodoLogin = ({
  toggleForms,
  handleSignIn,
  errorMessage,
  email,
  password,
  handleEmail,
  handlePassword,
}) => {
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    validateEmail(email) && password.length >= 6
      ? setDisabled(false)
      : setDisabled(true);
  }, [email, password]);
  return (
    <form className={styles.login}>
      <input
        type="text"
        placeholder="логин (почта)"
        value={email}
        onChange={handleEmail}
      />
      <input
        type="password"
        placeholder="пароль"
        value={password}
        onChange={handlePassword}
      />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
      <button
        className={styles.button}
        onClick={handleSignIn}
        disabled={disabled}
      >
        Войти
      </button>
      <p className={styles.message}>
        Нет аккаунта?
        <span className={styles.create} onClick={toggleForms}>
          Создать
        </span>
      </p>
    </form>
  );
};

export default TodoLogin;
