import { EnrollPageIndexContext } from "../..";
import { useContext } from "react";

import Modal from "@components/Modal";
import Button from "@components/Button";

import CharacterSuccess from "@images/CharacterSuccess.svg";
import CharacterFail from "@images/CharacterFail.svg";
import style from "./QuizResultModal.module.css";

export function QuizSuccessModal() {
  const { handleGotoNextPage } = useContext(EnrollPageIndexContext);

  return (
    <Modal className={style.quizResultModal}>
      <div className={style.quizResultModalImageContainer}>
        <img
          className={style.quizResultModalImage}
          src={CharacterSuccess}
          alt="fail"
        />
      </div>
      <div className={style.quizResultModalTextContainer}>
        <h1 className={style.quizResultModalHeader}>인준 준비 완료!</h1>
        <p className={style.quizResultModalDescription}>
          완벽해요! 디딤돌 신청만 남았어요.
        </p>
        <Button className={style.button} onClick={handleGotoNextPage}>
          신청하기
        </Button>
      </div>
    </Modal>
  );
}

export function QuizFailModal({ onClick }) {
  return (
    <Modal className={style.quizResultModal}>
      <div className={style.quizResultModalImageContainer}>
        <img
          className={style.quizResultModalImage}
          src={CharacterFail}
          alt="fail"
        />
      </div>
      <div className={style.quizResultModalTextContainer}>
        <h1 className={style.quizResultModalHeader}>앗 아쉬워요!</h1>
        <p className={style.quizResultModalDescription}>
          다시 한 번 복습 하고 도전해볼까요?
        </p>
        <Button className={style.button} onClick={onClick}>
          복습하기
        </Button>
      </div>
    </Modal>
  );
}
