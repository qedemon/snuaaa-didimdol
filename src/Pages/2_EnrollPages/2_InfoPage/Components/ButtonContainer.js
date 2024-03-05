import { motion } from "framer-motion";

import LeftCircleButton from "@images/LeftCircleButton.svg";
import RightCircleButton from "@images/RightCircleButton.svg";
import style from "./ButtonContainer.module.css";

function buttonColorAnimate(condition) {
  return {
    borderColor: condition ? "var(--yellow)" : "var(--blue-primary)",
  };
}

export default function ButtonContainer({
  index,
  length,
  onNext,
  onPrev,
  onClick,
  transition,
}) {
  return (
    <div className={style.buttonContainer}>
      {index !== 0 ? (
        <div className={style.button} onClick={onPrev}>
          <img src={LeftCircleButton} alt="prev" />
        </div>
      ) : (
        <div className={style.button} />
      )}
      <div className={style.indexPointerContainer}>
        {Array.from({ length }).map((el, idx) => (
          <motion.div
            key={idx}
            className={style.indexPointer}
            initial={buttonColorAnimate(idx === index)}
            animate={buttonColorAnimate(idx === index)}
            transition={transition}
            onClick={() => {
              onClick(idx);
            }}
          />
        ))}
      </div>
      {index !== length - 1 ? (
        <div className={style.button} onClick={onNext}>
          <img src={RightCircleButton} alt="prev" />
        </div>
      ) : (
        <div className={style.button} />
      )}
    </div>
  );
}
