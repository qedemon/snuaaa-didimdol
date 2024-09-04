import { motion, AnimatePresence } from "framer-motion";
import { EnrollPageIndexContext } from "..";
import { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";

import Button from "@components/Button";

import LeftCircleButton from "@images/LeftCircleButton.svg";
import RightCircleButton from "@images/RightCircleButton.svg";
import CharactersWelcome from "@images/CharactersWelcome.json";
import StarsImage from "@images/Stars.svg";
import CheckCircle from "@images/CheckCircle.svg";
import style from "./index.module.css";

const transitionTime = 2;
const transitionDurationTime = 0.8;

const animate = {
  appear: {
    opacity: 1,
  },
  disappear: {
    opacity: 0,
  },
};

const transition = {
  duration: transitionDurationTime,
};

export default function WelcomePage() {
  const { handleGotoNextPage, handleChangePage} = useContext(EnrollPageIndexContext);
  const [contentIndex, setContentIndex] = useState(0);

  const gotoNext = () => {
    setContentIndex(2);
  };

  const gotoPrev = () => {
    setContentIndex(1);
  };

  useEffect(() => {
    if (contentIndex === 0) {
      const timeId = setTimeout(() => {
        setContentIndex(1);
      }, transitionTime * 1000);

      return () => {
        clearTimeout(timeId);
      };
    } else if (contentIndex === 2) {
      const timeId = setTimeout(() => {
        setContentIndex(3);
      }, transitionTime * 1000);

      return () => {
        clearTimeout(timeId);
      };
    }
  }, [contentIndex]);

  return (
    <>
      <div className={style.welcomePage}>
        <div className={style.welcomeImageContainer}>
          <img className={style.starsImage} src={StarsImage} alt="stars" />
          <Lottie animationData={CharactersWelcome} />
        </div>
        <div className={style.contentContainer}>
          <AnimatePresence>
            {contentIndex === 0 && (
              <motion.div
                className={style.content}
                initial={animate.appear}
                animate={animate.appear}
                exit={animate.disappear}
                transition={transition}
              >
                <p className={`${style.large} ${style.bold}`}>
                  <span className={style.yellow}>디딤돌 신청페이지</span>에
                  <br />
                  오신 것을 환영합니다!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {contentIndex === 1 && (
              <motion.div
                className={style.content}
                initial={animate.disappear}
                animate={animate.appear}
                exit={animate.disappear}
                transition={transition}
              >
                <div className={style.contentDivider}>
                  <p>
                    디딤돌(신입생 프로그램)은 신입회원이
                    <br />
                    동아리에 새로 가입하여
                    <br />
                    <span className={`${style.red} ${style.bold}`}>
                      동아리 사람들과 함께 친해지고
                    </span>
                    <br />
                    <span className={`${style.green} ${style.bold}`}>
                      별과 관측장비에 대해 배우고 사용해보며
                    </span>
                    ,<br />
                    동아리에 적응하는 신입생 대상 프로그램입니다.
                  </p>
                  <p className={style.bold}>
                    디딤돌을 완료하면
                    <br /> <span className={style.lightblue}>AAA의 정회원</span>
                    으로 인정받게 됩니다.
                  </p>
                </div>
                <div className={style.buttonContainer}>
                  <div />
                  <div />
                  <div className={style.button} onClick={gotoNext}>
                    <img src={RightCircleButton} alt="prev" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {contentIndex >= 2 && (
              <motion.div
                className={style.content}
                initial={animate.disappear}
                animate={animate.appear}
                exit={animate.disappear}
                transition={transition}
              >
                <div className={style.contentDivider}>
                  <p className={style.bold}>
                    <span className={style.green}>정회원</span>이 되면 어떤
                    혜택이 있나요?
                  </p>
                  <div className={style.benefitList}>
                    <div className={style.benefitListItem}>
                      <img src={CheckCircle} alt="check" />
                      <p>총회(동아리 의사결정 기구) 의결권을 얻습니다.</p>
                    </div>
                    <div className={style.benefitListItem}>
                      <img src={CheckCircle} alt="check" />
                      <p>동아리의 장비를 대여할 수 있습니다.</p>
                    </div>
                    <div className={style.benefitListItem}>
                      <img src={CheckCircle} alt="check" />
                      <p>자율 관측활동을 주최할 수 있습니다.</p>
                    </div>
                  </div>
                  <p className={style.caution}>
                    디딤돌은{" "}
                    <span className={style.lightblue}>조 별로 2시간 동안</span>{" "}
                    진행됩니다.
                    <br />
                    <span className={style.underline}>
                      다음 안내사항들을 잘 읽어보시고 신청 부탁드립니다.
                    </span>
                  </p>
                </div>
                <div className={style.buttonContainer}>
                  <div className={style.button} onClick={gotoPrev}>
                    <img src={LeftCircleButton} alt="prev" />
                  </div>
                  {contentIndex === 3 && (
                    <motion.div
                      initial={animate.disappear}
                      animate={animate.appear}
                      transition={transition}
                    >
                      <Button
                        className={style.nextPageButton}
                        onClick={()=>handleChangePage(2)}
                      >
                        안내사항 읽기
                      </Button>
                    </motion.div>
                  )}
                  <div />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    </>
  );
}
