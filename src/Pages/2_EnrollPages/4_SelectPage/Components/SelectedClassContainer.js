import { motion } from "framer-motion";

import CloseRed from "@images/CloseRed.svg";
import UpButton from "@images/UpButton.svg";
import DownButton from "@images/DownButton.svg";
import style from "./SelectedClassContainer.module.css";

const wrapperVariants = (index) => ({
  initial: {
    transform: `translateY(${(index - 1) * 100}%)`,
    opacity: 0,
  },
  animate: {
    transform: `translateY(${(index - 1) * 100}%)`,
    opacity: 1,
  },
});

const itemVariants = {
  initial: {
    transform: "scale(0)",
  },
  animate: {
    transform: "scale(1)",
  },
};

const transition = {
  duration: 0.4,
};

export default function SelectedClassContainer({
  index,
  data,
  modifiable,
  onDelete,
  onMove,
}) {
  // 데이터
  const title = (data?.title ?? "") + "조";
  const time =
    (data?.daytime?.day ?? "") + "요일 " + (data?.daytime?.start ?? "");
  const keywords = data?.description?.keywords ?? [];

  return (
    <motion.div
      className={style.selectionItemWrapper}
      variants={wrapperVariants(index)}
      initial={modifiable ? "initial" : "animate"}
      animate="animate"
      exit="initial"
      transition={transition}
    >
      <motion.div
        className={style.selectionItem}
        variants={itemVariants}
        initial={modifiable ? "initial" : "animate"}
        animate="animate"
        exit="initial"
        transition={transition}
      >
        {modifiable && (
          <div className={style.cancelButton} onClick={onDelete}>
            <img src={CloseRed} alt="close" />
          </div>
        )}
        <div className={style.selectionOrder}>{index}지망</div>
        <div className={style.selectionInfo}>
          <p className={style.selectionTitle}>
            {title} {time}
          </p>
          <div className={style.selectionKeywords}>
            {keywords.map((el, idx) => (
              <div key={idx} className={style.selectionKeyword}>
                {el}
              </div>
            ))}
          </div>
        </div>
        {modifiable && (
          <div className={style.buttonContainer}>
            <div
              onClick={() => {
                onMove(false);
              }}
            >
              <img src={UpButton} alt="up" />
            </div>
            <div
              onClick={() => {
                onMove(true);
              }}
            >
              <img src={DownButton} alt="down" />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
