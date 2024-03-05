import { motion } from "framer-motion";

import Close from "@images/Close.svg";
import style from "./Modal.module.css";

const windowVariants = {
  open: {
    transform: "scale(1)",
    opacity: 1,
  },
  close: {
    transform: "scale(1.2)",
    opacity: 0,
  },
};

export default function Modal({ className = "", children, onClose }) {
  function preventClose(e) {
    e.stopPropagation();
  }

  return (
    <div className={style.windowBackground} onClick={preventClose}>
      <motion.div
        className={style.window}
        variants={windowVariants}
        initial="close"
        animate="open"
      >
        <div className={className}>{children}</div>
        {onClose && (
          <div className={style.closeButton} onClick={onClose}>
            <img src={Close} alt="close" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
