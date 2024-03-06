import { useCallback, useEffect, useState } from "react";
import { cubicBezier } from "framer-motion";

import ButtonContainer from "./Components/ButtonContainer";
import InfoCarousel from "./Components/InfoCarousel";

import InfoData from "./Components/InfoData";
import style from "./index.module.css";

const duration = 1;
const transition = { ease: cubicBezier(0.65, 0, 0.35, 1), duration };

export default function InfoPage() {
  const [infoIndex, setInfoIndex] = useState(0);
  const pictureIndexLengths = InfoData.map((el) => el.pictures.length);
  const [pictureIndexes, setPictureIndexes] = useState(
    Array.from({ length: pictureIndexLengths.length }, () => 0)
  );

  const [moveState, setMoveState] = useState(false);
  const [initTouchPos, setInitTouchPos] = useState(null);

  const handleScrollNextFrame = useCallback(() => {
    if (!moveState) {
      if (pictureIndexes[infoIndex] === pictureIndexLengths[infoIndex] - 1) {
        const nextInfoIndex = infoIndex + 1;
        if (nextInfoIndex < InfoData.length) {
          setInfoIndex(nextInfoIndex);
        }
      } else {
        const nextPictureIndexes = [...pictureIndexes];
        nextPictureIndexes[infoIndex] += 1;
        setPictureIndexes(nextPictureIndexes);
      }

      setMoveState(true);
      setTimeout(() => {
        setMoveState(false);
      }, duration * 1000);
    }
  }, [moveState, infoIndex, pictureIndexes]);

  const handleScrollPreviousFrame = useCallback(() => {
    if (!moveState) {
      if (pictureIndexes[infoIndex] === 0) {
        const nextInfoIndex = infoIndex - 1;
        if (nextInfoIndex >= 0) {
          setInfoIndex(nextInfoIndex);
        }
      } else {
        const nextPictureIndexes = [...pictureIndexes];
        nextPictureIndexes[infoIndex] -= 1;
        setPictureIndexes(nextPictureIndexes);
      }

      setMoveState(true);
      setTimeout(() => {
        setMoveState(false);
      }, duration * 1000);
    }
  }, [moveState, infoIndex, pictureIndexes]);

  const handleChangeIndex = useCallback(
    (index) => {
      if (!moveState) {
        setInfoIndex(index);
        setPictureIndexes(0);

        setMoveState(true);
        setTimeout(() => {
          setMoveState(false);
        }, duration * 1000);
      }
    },
    [moveState]
  );

  const handleTouchStart = useCallback(
    (e) => {
      if (!moveState) {
        setInitTouchPos(e.touches[0].clientX);
      }
    },
    [moveState]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (initTouchPos !== null) {
        const threshold = 50;
        const finalTouchPos = e.touches[0].clientX;

        if (Math.abs(finalTouchPos - initTouchPos) > threshold) {
          if (finalTouchPos < initTouchPos) {
            handleScrollNextFrame();
          } else {
            handleScrollPreviousFrame();
          }

          setInitTouchPos(null);
        }
      }
    },
    [handleScrollNextFrame, handleScrollPreviousFrame, initTouchPos]
  );

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleTouchStart, handleTouchMove]);

  return (
    <div className={style.infoPage}>
      <InfoCarousel
        index={infoIndex}
        pictureIndexes={pictureIndexes}
        data={InfoData}
        transition={transition}
      />
      <ButtonContainer
        index={infoIndex}
        length={InfoData.length}
        onNext={handleScrollNextFrame}
        onPrev={handleScrollPreviousFrame}
        onClick={handleChangeIndex}
        transition={transition}
      />
    </div>
  );
}
