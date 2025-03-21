import { useEffect, useState, useMemo } from "react";

import Modal from "@components/Modal";
import Button from "@components/Button";

import Check from "@images/Check.svg";
import style from "./QuizModal.module.css";
import { useEnv } from "@/Hooks/useEnv";

/*const checkList = [
  "3회 이상 불참 시 인준 불가",
  "별모임 or 자돔 or 소관 2회 이상 참여",
  "장비실습 선택사항",
  "별모임 or 자돔 or 소관 1회 이상 참여",
  "장비실습 필수사항",
  "2024년 11월 6일까지 완료",
];*/

export default function QuizModal({ onClose, onSubmit }) {
  const loadedEnv = useEnv();
  const checkList = useMemo( ()=>loadedEnv?.깜짝퀴즈??[], [loadedEnv]);

  const [selectedList, setSelectedList] = useState(
    Array.from(checkList, () => false)
  );
  useEffect(
    ()=>{
      setSelectedList(Array.from(checkList, ()=>false))
    },
    [checkList, setSelectedList]
  );

  const handleCheck = (index) => {
    const nextSelectedList = [...selectedList];
    nextSelectedList[index] = !nextSelectedList[index];
    setSelectedList(nextSelectedList);
  };

  const handleSubmit = () => {
    const correctCondition = selectedList.every(
      (el, index)=>el===checkList[index].valid
    )

    onSubmit(correctCondition);
  };

  return (
    <Modal className={style.quizModal} onClose={onClose}>
      <h1 className={style.quizModalHeader}>깜짝 퀴즈</h1>
      <p className={style.quizModalDescription}>
        AAA 회원 인준 기준에 알맞은 것을{" "}
        <span className={style.underLine}>모두</span> 골라주세요
      </p>
      <ul className={style.checkList}>
        {checkList.map((el, idx) => (
          <li key={idx} className={style.checkListItem}>
            <div
              className={`${style.checkBox} ${
                selectedList[idx] ? style.selected : ""
              }`}
              onClick={() => {
                handleCheck(idx);
              }}
            >
              <img src={Check} alt="" />
            </div>
            <p
              className={`${style.checkBoxText} ${
                selectedList[idx] ? style.selected : ""
              }`}
            >
              {el.text}
            </p>
          </li>
        ))}
      </ul>
      <Button className={style.submitButton} onClick={handleSubmit}>
        확인하기
      </Button>
    </Modal>
  );
}
