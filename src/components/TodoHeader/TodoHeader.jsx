import styles from "./TodoHeader.module.css";

const TodoHeader = ({ isAuth, email, handleLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.buttons}>
        {isAuth && <span className={styles.email}>{email}</span>}
        <button
          className={`${styles.bell} ${styles.button}`}
          style={{
            background: "url(images/bell.png) no-repeat center center / cover",
          }}
        ></button>
        <button
          className={`${styles.settings} ${styles.button}`}
          style={{
            background:
              "url(images/settings.png) no-repeat  center center / cover",
          }}
        ></button>
        {isAuth && (
          <button
            className={`${styles.logout} ${styles.button}`}
            style={{
              background:
                "url(images/logout.png) no-repeat center center / cover",
            }}
            onClick={handleLogout}
          ></button>
        )}
      </div>
    </header>
  );
};

export default TodoHeader;
