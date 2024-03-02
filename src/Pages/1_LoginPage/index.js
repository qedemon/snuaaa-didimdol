import { useEffect, useState } from "react";
import { cubicBezier, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

import LoginForm from "./Components/LoginForm";
import Logo from "../../Components/Logo";

import StarsImage from "../../Assets/Images/Stars.svg";
import style from "./index.module.css";

const mainAnimate = {
  before: {
    bottom: "0%",
  },
  after: {
    bottom: "-10%",
  },
};

const starsAnimate = {
  before: {
    opacity: 1,
    width: "50%",
  },
  after: {
    opacity: 0,
    width: "0%",
  },
};

const transition = {
  ease: cubicBezier(0.33, 1, 0.68, 1),
  duration: 0.5,
};

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState(false);

  const handleClick = () => {
    if (!formState) {
      setFormState(true);
    }
  };

  useEffect(() => {
    if (user?.valid) {
      navigate("/enroll");
    }
  }, [user, navigate]);

  return (
    <motion.div
      className={style.loginPage}
      animate={formState ? mainAnimate.after : mainAnimate.before}
    >
      <div />
      <div className={style.logoContainer}>
        <motion.img
          src={StarsImage}
          alt="stars"
          initial={starsAnimate.before}
          animate={formState ? starsAnimate.after : starsAnimate.before}
          transition={transition}
        />
        <Logo className={style.logo} />
      </div>
      <LoginForm
        onClick={handleClick}
        formState={formState}
        transition={transition}
      />
      <p className={style.copyRight}>AAApp2024</p>
      <div />
    </motion.div>
  );
}
