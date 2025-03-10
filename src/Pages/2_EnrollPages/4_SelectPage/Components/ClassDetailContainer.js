import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Close from "@images/Close.svg";
import style from "./ClassDetailContainer.module.css";
import Button from "@/Components/Button";

function detailContainerAnimate(condition) {
  return {
    transform:
      condition === 3?
        "translateY(-50dvh)"
        :condition === 2
          ? "translateY(0dvh)"
            : condition === 1
            ? "translateY(35dvh)"
            : "translateY(100dvh)",
    boxShadow: condition
      ? "0px -4px 20px -10px #463bd5"
      : "0px 0px 0px 0px #463bd5",
  };
}

function fadeOutAnimate(condition) {
  return {
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, ${
      condition>0 ? 0 : 0.5
    }) 100%)`,
  };
}

export default function ClassDetailContainer({
  data,
  onClose,
  onConfirm,
  enabled,
  message,
  hideButton,
  className
}) {
  // 데이터
  const title = (data?.title ?? "") + "조";
  const time =
    (data?.daytime?.day ?? "") + "요일 " + (data?.daytime?.start ?? "");
  const keywords = data?.description?.keywords ?? [];
  const description = data?.description?.introduction ?? "";

  // 활동 게이지 추적
  const gaugeRef = useRef();
  const gaugeLeftPartRef = useRef();

  const widthTotal = gaugeRef?.current?.offsetWidth ?? 100;
  const [widthPercent, setWidthPercent] = useState(0);
  const widthPercentFinal = data?.description?.ratios[0]?.ratio ?? 0;

  const leftGauge = Math.round((widthPercent / widthTotal) * 100) ?? 0;
  const rightGauge = 100 - leftGauge;

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        setWidthPercent(width);
      }
    });

    observer.observe(gaugeLeftPartRef.current);
  }, []);

  // 위아래 스크롤 추적 및 창 닫기 감지
  const [initTouchPos, setInitTouchPos] = useState(null);
  const [touchActive, setTouchActive] = useState(false);
  const [scrollState, setScrollState] = useState(0);
  //const [fullSize, setFullSize] = useState(false);

  const touchStart = useCallback(
    (xPos, yPos)=>{
      if (data) {
        setInitTouchPos(yPos);
        setTouchActive(false);
      }
    },
    [data, setTouchActive]
  );

  const touchMove = useCallback(
    (xPos, yPos)=>{
      if ((initTouchPos !== null) && !touchActive) {
        const threshold = 50;
        const finalTouchPos = yPos;

        if (Math.abs(finalTouchPos - initTouchPos) > threshold) {
          if (finalTouchPos < initTouchPos) {
            //setFullSize(true);
            setScrollState(
              (prev)=>{
                return (prev<2)?prev+1:prev;
              }
            );
          } else {
            //setFullSize(false);
            setScrollState(
              (prev)=>{
                return (prev>0)?prev-1:prev;
              }
            );
          }
          setTouchActive(true);
        }
      }
    },
    [initTouchPos, touchActive, setScrollState, setTouchActive]
  )

  const handleTouchStart = useCallback(
    (e) => {
      touchStart(e.touches[0].clientX, e.touches[0].clientY);
    },
    [touchStart]
  );

  const handleTouchMove = useCallback(
    (e) => {
      touchMove(e.touches[0].clientX, e.touches[0].clientY);
    },
    [touchMove]
  );
  
  const [mouseTouchStart, setMouseTouchStart] = useState(false);
  const handleMouseDown = useCallback(
    (e)=>{
      setMouseTouchStart(true);
      touchStart(e.clientX, e.clientY);
    },
    [touchStart, setMouseTouchStart]
  );
  const handleMouseUp = useCallback(
    (e)=>{
      setMouseTouchStart(false);
    },
    [setMouseTouchStart]
  );
  const handleMouseMove = useCallback(
    (e)=>{
      if(mouseTouchStart){
        touchMove(e.clientX, e.clientY);
      }
    },
    [mouseTouchStart, touchMove]
  )

  // 버튼 클릭 및 창 닫기
  const closeModal = () => {
    //setFullSize(false);
    setScrollState(0);
    onClose();
  };

  const preventClose = (e) => {
    e.stopPropagation();
  };

  const handleConfirm = () => {
    closeModal();
    onConfirm();
  };

  return (
    <>
      <motion.div
        initial={detailContainerAnimate(false)}
        animate={detailContainerAnimate(Boolean(data) + scrollState)}
        className={`${style.classDetailContainer} ${className}`}
        onClick={preventClose}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className={style.closeButton} onClick={closeModal}>
          <img src={Close} alt="close" />
        </div>

        <div className={style.contentWrapper}>
          <div className={style.groupHeaderContainer}>
            <h1 className={style.groupTitle}>{title}</h1>
            <p className={style.groupTime}>({time})</p>
          </div>
          <div className={style.line} />
          <div className={style.groupKeywordContainer}>
            <p className={style.groupKeywordHeader}>우리 조 3가지 키워드</p>
            <div className={style.groupKeywords}>
              {keywords.map((el, idx) => (
                <p key={idx} className={style.groupKeyword}>
                  {el}
                </p>
              ))}
            </div>
          </div>
          <div className={style.groupActivityContainer}>
            <p className={style.groupActivityHeader}>우리조 활동은요</p>
            <div className={style.groupActivityGaugeContainer}>
              <p className={style.groupActivityGaugeLegend}>관측</p>
              <div className={style.groupActivityGauge} ref={gaugeRef}>
                <motion.p
                  className={style.groupActivityGaugePart}
                  initial={{
                    width: "100%",
                  }}
                  animate={{
                    width: `${widthPercentFinal * 100}%`,
                  }}
                  ref={gaugeLeftPartRef}
                >
                  {leftGauge}%
                </motion.p>
                <motion.p
                  className={style.groupActivityGaugePart}
                  initial={{
                    width: "0%",
                  }}
                  animate={{
                    width: `${(1 - widthPercentFinal) * 100}%`,
                  }}
                >
                  {rightGauge}%
                </motion.p>
              </div>
              <p className={style.groupActivityGaugeLegend}>친목</p>
            </div>
          </div>
          <div className={style.groupRecommendContainer}>
            <p className={style.groupRecommendHeader}>이런 분께 추천해요</p>
            <p className={style.groupRecommendText}>{description}</p>
          </div>
            {
              hideButton?
                (
                  <>
                  </>
                ):
                (
                  <>
                    <p className={style.inputSelectionText}>마음에 들면 신청하기</p>
                    <Button
                      className={style.inputSelectionButton}
                      onClick={handleConfirm}
                      disabled={!enabled}
                    >
                      {message}
                    </Button>
                  </>
                )
            }
        </div>
      </motion.div>

      <AnimatePresence>
        {data && (
          <motion.div
            className={style.fadeOut}
            initial={fadeOutAnimate(1)}
            animate={fadeOutAnimate(scrollState)}
            exit={fadeOutAnimate(1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
