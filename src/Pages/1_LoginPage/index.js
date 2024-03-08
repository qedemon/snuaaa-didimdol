import { useEffect, useState } from "react";
import { cubicBezier, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

import Logo from "@components/Logo";
import LoginForm from "./Components/LoginForm";

import StarsImage from "@images/Stars.svg";
import style from "./index.module.css";
import FindFormModal from "./Components/FindFormModal";

const logoAnimate = {
  before: {
    transform: "translateY(0)",
  },
  after: {
    transform: "translateY(-25dvh)",
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
  const [findModalOpen, setFindModalOpen] = useState(false);

  const handleClick = () => {
    if (!formState) {
      setFormState(true);
    }
  };

  useEffect(() => {
    if (user?.valid) {
      navigate(-1);
    }
  }, [user, navigate]);


  const openFindModal = ()=>{
    setFindModalOpen(true);
  }
  const closeFindModal = ()=>{
    setFindModalOpen(false);
  }

  return (
    <div className={style.loginPage}>
      <div />
      <motion.div
        className={style.logoContainer}
        animate={formState ? logoAnimate.after : logoAnimate.before}
        transition={transition}
      >
        <motion.img
          src={StarsImage}
          alt="stars"
          initial={starsAnimate.before}
          animate={formState ? starsAnimate.after : starsAnimate.before}
          transition={transition}
        />
        <Logo className={style.logo} />
      </motion.div>
      <div />
      <LoginForm
        onClick={handleClick}
        formState={formState}
        transition={transition}
        openFindModal={openFindModal}
      />
      <p className={style.copyRight}>AAApp2024</p>
      <div />
      {
        findModalOpen?
        (
          <FindFormModal onClose={closeFindModal}/>
        ):
        null
      }
    </div>
  );
}
