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

export default function InfoCarousel({ index, data, transition }) {
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
          <h1 className={style.infoTitle}>{el.title}</h1>
          {el.pictures.map((picture, pictureIdx) => (
            <img
              className={style.infoImage}
              key={pictureIdx}
              src={picture}
              alt={`${el.title} - ${pictureIdx + 1}번째 사진`}
            />
          ))}
          <p className={style.infoDescription}>{el.description}</p>
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
