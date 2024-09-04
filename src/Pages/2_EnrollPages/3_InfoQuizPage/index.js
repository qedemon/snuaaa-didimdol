import { useState } from "react";

import Button from "@components/Button";
import BackButton from "@/Components/BackButton";

import CharactersBig from "@images/CharactersBig.svg";
import CheckCircle from "@images/CheckCircle.svg";
import style from "./index.module.css";
import QuizModal from "./Components/QuizModal";
import { QuizFailModal, QuizSuccessModal } from "./Components/QuizResultModal";

export default function InfoQuizPage({ onClick }) {
  const [quizModalState, setQuizModalState] = useState(0); // 0: none, 1: quiz, 2: result
  const [quizCorrectState, setQuizCorrectState] = useState(false);

  const openQuizModal = () => {
    setQuizModalState(1);
  };

  const closeModal = () => {
    setQuizModalState(0);
  };

  const handleQuizSubmit = (condition) => {
    setQuizCorrectState(condition);
    setQuizModalState(2);
  };

  return (
    <div className={style.infoQuizPage}>
      {onClick && <BackButton onClick={onClick} />}
      <img className={style.image} src={CharactersBig} alt="characters" />
      <div className={style.infoQuizContainer}>
        <h1 className={style.infoQuizHeader}>
          <span className={style.yellow}>AAA</span> 인준 기준
        </h1>
        <h2 className={style.infoQuizSecondHeader}>
          2024년 11월 23일까지
          <br /> 하기 사항 완료
        </h2>
        <div className={style.infoQuizConditionWrapper}>
          <div className={style.infoQuizConditionContainer}>
            <img src={CheckCircle} alt="check" />
            <p>3회 이상 불참 시 인준 불가</p>
          </div>
          {
          /*<p className={style.infoQuizCaution}>
            ※ <span className={style.bold}>자율돔관, 소규모 관측회</span> 참여시
            <br /> 1회에 한하여 불참 1회 삭제
          </p>*/
          }
        </div>
        <div className={style.infoQuizConditionContainer}>
          <img src={CheckCircle} alt="check" />
          <p>장비실습 이수</p>
        </div>
        <div className={style.infoQuizConditionContainer}>
          <img src={CheckCircle} alt="check" />
          <p>별모임 or 자돔 or 소관에 1회 이상 참여</p>
        </div>

        {onClick === undefined && (
          <Button className={style.button} onClick={openQuizModal}>
            이해하였습니다.
          </Button>
        )}
      </div>
      {quizModalState === 1 && (
        <QuizModal onClose={closeModal} onSubmit={handleQuizSubmit} />
      )}
      {quizModalState === 2 &&
        (quizCorrectState ? (
          <QuizSuccessModal />
        ) : (
          <QuizFailModal onClick={closeModal} />
        ))}
    </div>
  );
}
