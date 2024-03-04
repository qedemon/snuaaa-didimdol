import { EnrollPageIndexContext } from "../..";
import { useContext } from "react";
import { motion } from "framer-motion";

import Button from "../../../../Components/Button";

import style from "./InfoCarousel.module.css";

function transformAnimate(index) {
  return {
    transform: `translateX(${index * 100}%)`,
  };
}

export default function InfoCarousel({
  index,
  pictureIndex,
  data,
  transition,
}) {
  const { handleGotoNextPage } = useContext(EnrollPageIndexContext);
  const dataLength = data.length;

  return (
    <ul className={style.infoCarousel}>
      {data.map((el, idx) => (
        <motion.li
          key={idx}
          className={style.infoCarouselItem}
          initial={transformAnimate(idx)}
          animate={transformAnimate(idx - index)}
          transition={transition}
        >
          <div className={style.infoCarouselContent}>
            {el.title}
            <ul className={style.pictureCarousel}>
              {el.pictures.map((picture, pictureIdx) => (
                <motion.li
                  key={pictureIdx}
                  className={style.pictureCarouselItem}
                  initial={transformAnimate(pictureIdx)}
                  animate={transformAnimate(pictureIdx - pictureIndex)}
                  transition={transition}
                >
                  {picture}
                </motion.li>
              ))}
            </ul>
            {el.description}
          </div>
          {idx === dataLength - 1 ? (
            <Button
              className={style.nextPageButton}
              onClick={handleGotoNextPage}
            >
              인준기준 보러가기
            </Button>
          ) : (
            <></>
          )}
        </motion.li>
      ))}
    </ul>
  );
}
