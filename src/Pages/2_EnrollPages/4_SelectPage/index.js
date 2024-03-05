import { useEffect, useState } from "react";
import { transpose } from "@/Utils/Utils";
import axios from "@connections/NovaConnection";

import ClassDetailContainer from "./Components/ClassDetailContainer";

import style from "./index.module.css";

const timeTable = [
  ["3:30", "6:30"],
  ["5:00", "8:00"],
  ["6:30", "9:30"],
];

const weekTable = ["월", "화", "수", "목", "금"];

const makeClassTable = () =>
  Array.from(Array(timeTable.length), () => Array(weekTable.length).fill(null));

export default function SelectPage() {
  const [classTable, setClassTable] = useState(makeClassTable());

  const [timeIndex, setTimeIndex] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const getClasses = async () => {
    try {
      const response = await axios.get("/didimdolClass/allDidimdolClasses/");

      if (response.data.result === 0) {
        const responseData = response.data.didimdolClasses;
        const nextClassTable = makeClassTable();
        const startTimeNumberTable = transpose(timeTable)[0].map((el) =>
          Number(el.replace(":", ""))
        );

        responseData.forEach((el) => {
          const row = startTimeNumberTable.indexOf(
            Number(el.daytime.start.replace(":", ""))
          );
          const col = weekTable.indexOf(el.daytime.day);
          nextClassTable[row][col] = el;
        });
        setClassTable(nextClassTable);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const insertSelectedClasses = (selectedClass) => {
    const nextSelectedClasses = [...selectedClasses];
    nextSelectedClasses.push(selectedClass);
    setSelectedClasses(nextSelectedClasses);
  };

  const deleteSelectedClasses = (selectedClass) => {
    const nextSelectedClasses = selectedClasses.filter(
      (el) => el !== selectedClass
    );
    setSelectedClasses(nextSelectedClasses);
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <>
      <div className={style.selectPage}>
        <h1 className={style.header}>
          <span className={style.yellow}>디딤돌</span> 신청
        </h1>
        <p className={style.caution}>3월 14일까지 신청해주세요</p>

        <div className={style.timeTableContainer}>
          {timeTable.map((el, idx) => (
            <button
              key={idx}
              className={`${style.timeTableItem} ${
                idx === timeIndex ? style.selected : ""
              }`}
              onClick={() => {
                setTimeIndex(idx);
              }}
              disabled={idx === timeIndex}
            >
              {el[0]} ~ {el[1]}
            </button>
          ))}
        </div>

        {timeIndex !== null && (
          <>
            <div className={style.classContainer}>
              {weekTable.map((el, idx) => (
                <div key={idx} className={style.classItem}>
                  <p className={style.week}>{el}</p>
                  <button
                    className={`${style.classButton} ${
                      classTable[timeIndex][idx] === null
                        ? style.disabled
                        : classTable[timeIndex][idx] === selectedClass
                        ? style.selected
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedClass(classTable[timeIndex][idx]);
                    }}
                    disabled={
                      classTable[timeIndex][idx] === null ||
                      classTable[timeIndex][idx] === selectedClass
                    }
                  >
                    {classTable[timeIndex][idx] !== null
                      ? `${classTable[timeIndex][idx].title}조`
                      : "X"}
                  </button>
                </div>
              ))}
            </div>

            <div className={style.selectionContainer}>
              {selectedClasses.length > 0 ? (
                <div>{selectedClasses.map((el) => el.title)}</div>
              ) : (
                <div className={style.selectionDescription}>
                  아직 선택한 디딤돌 조가 없습니다.
                  <br />
                  <br />
                  <span className={style.bold}>
                    시간과 요일을 정하여 디딤돌조
                    <br />
                    슬로건 자세히 읽어보기
                  </span>
                </div>
              )}
            </div>
          </>
        )}
        <ClassDetailContainer
          data={selectedClass}
          onClose={() => {
            setSelectedClass(null);
          }}
          onConfirm={() => {
            insertSelectedClasses(selectedClass);
          }}
          inputCondition={
            selectedClasses.length < 3 &&
            selectedClasses.includes(selectedClass)
          }
        />
      </div>
    </>
  );
}
