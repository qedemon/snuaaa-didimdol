import { useState } from "react";

import Button from "../../../Components/Button";

import CharactersBig from "../../../Assets/Images/CharactersBig.svg";
import CheckCircle from "../../../Assets/Images/CheckCircle.svg";
import style from "./index.module.css";
import QuizModal from "./Components/QuizModal";
import { QuizFailModal, QuizSuccessModal } from "./Components/QuizResultModal";

export default function InfoQuizPage() {
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
      <img className={style.image} src={CharactersBig} alt="characters" />
      <div className={style.infoQuizContainer}>
        <h1 className={style.infoQuizHeader}>
          <span className={style.yellow}>AAA</span> 인준 기준
        </h1>
        <h2 className={style.infoQuizSecondHeader}>
          2024년 5월 25일까지
          <br /> 하기 사항 완료
        </h2>
        <div className={style.infoQuizConditionContainer}>
          <img src={CheckCircle} alt="check" />
          <p>3회 이상 불참 시 인준 불가</p>
        </div>
        <div className={style.infoQuizConditionContainer}>
          <img src={CheckCircle} alt="check" />
          <p>장비실습 이수</p>
        </div>
        <div className={style.infoQuizConditionContainer}>
          <img src={CheckCircle} alt="check" />
          <p>별모임에 1회 이상 참여</p>
        </div>
        <p className={style.infoQuizCaution}>
          자율돔관, 소규모 관측회 참여시
          <br /> 1회에 한하여 불참 1회 삭제
        </p>
        <Button className={style.button} onClick={openQuizModal}>
          이해하였습니다.
        </Button>
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
