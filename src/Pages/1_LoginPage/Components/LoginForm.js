import { useEffect, useState } from "react";
import useAsync from "@hooks/useAsync";
import { useAuth } from "@contexts/AuthContext";
import { motion } from "framer-motion";

import Button from "@components/Button";
import Input from "@components/Input";

import style from "./LoginForm.module.css";

const containerAnimate = {
  before: {
    width: "175px",
    height: "0%",
    padding: "16px 0pz",
    boxShadow: "0px 0px 0px 0px #463bd5",
    cursor: "pointer",
    transform: "translateY(0px)",
  },
  after: {
    width: "100%",
    height: "75%",
    padding: "24px 32px",
    boxShadow: "0px -4px 20px -10px #463bd5",
    cursor: "default",
    transform: "translateY(calc(25dvh + 32px))",
  },
};

const contentAnimate = {
  before: {
    opacity: 0,
  },
  after: {
    opacity: 1,
  },
};

function LoginForm() {
  const { login } = useAuth();
  const [isLoginPending, loginError, loginAsync] = useAsync(login);
  const [error, setError] = useState(false);
  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
  });

  const handleChange = ({ name, value }) => {
    setError(false);
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (!loginData.id || !loginData.password) {
      setError(true);
      return;
    }
    await loginAsync(loginData);
  };

  useEffect(() => {
    if (loginError) {
      setError(true);
    }
  }, [loginError]);

  return (
    <form className={style.loginForm} onSubmit={handleSubmit}>
      <Input
        className={style.loginInput}
        name="id"
        value={loginData.id}
        placeholder="아이디"
        onChange={handleChange}
        error={error}
      />
      <Input
        className={style.loginInput}
        name="password"
        value={loginData.password}
        placeholder="비밀번호"
        onChange={handleChange}
        password
        error={error}
      />
      <div className={style.idPasswordFind}>
        <a href="https://our.snuaaa.net/page/auth/login">
          아이디/비밀번호 찾기
        </a>
      </div>
      <div className={style.loginButtonContainer}>
        <Button className={style.loginButton} pending={isLoginPending}>
          로그인
        </Button>
        <p className={style.loginErrorMessage}>
          {error
            ? loginError
              ? loginError?.message
              : "아이디 및 비밀번호를 입력해 주세요."
            : ""}
        </p>
      </div>
    </form>
  );
}

export default function LoginFormContainer({ onClick, formState, transition }) {
  return (
    <motion.div
      className={style.loginFormContainer}
      initial={containerAnimate.before}
      animate={formState ? containerAnimate.after : containerAnimate.before}
      transition={transition}
      onClick={onClick}
    >
      {formState ? (
        <motion.div
          className={style.loginContent}
          initial={contentAnimate.before}
          animate={contentAnimate.after}
          transition={transition}
        >
          <h1 className={style.loginFormHeader}>Welcome back!</h1>
          <p className={style.loginFormSecondHeader}>디딤돌 로그인하기</p>
          <LoginForm />
        </motion.div>
      ) : (
        <motion.p
          className={style.loginFormStart}
          initial={contentAnimate.after}
          animate={contentAnimate.after}
          exit={contentAnimate.before}
          transition={transition}
        >
          시작하기
        </motion.p>
      )}
    </motion.div>
  );
}
