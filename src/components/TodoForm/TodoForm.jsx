import { useState } from "react";

import TodoLogin from "../TodoLogin";
import TodoSignup from "../TodoSignup";

const TodoForm = ({
  handleReg,
  handleSignIn,
  errorMessage,
  username,
  email,
  password,
  handleUsername,
  handleEmail,
  handlePassword,
}) => {
  const [hasAccount, setHasAccount] = useState(true);
  const toggleForms = () => {
    setHasAccount((prevHasAccount) => !prevHasAccount);
  };
  return (
    <>
      {hasAccount ? (
        <TodoLogin
          toggleForms={toggleForms}
          handleSignIn={handleSignIn}
          errorMessage={errorMessage}
          email={email}
          password={password}
          handleEmail={handleEmail}
          handlePassword={handlePassword}
        />
      ) : (
        <TodoSignup
          toggleForms={toggleForms}
          username={username}
          email={email}
          password={password}
          handleUsername={handleUsername}
          handleEmail={handleEmail}
          handlePassword={handlePassword}
          handleReg={handleReg}
        />
      )}
    </>
  );
};

export default TodoForm;
