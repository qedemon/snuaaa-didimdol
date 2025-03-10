import { useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/Contexts/AuthContext";
import useAsync from "@/Hooks/useAsync";
import axios from "@connections/NovaConnection";
import { EnrollPageIndexContext } from "..";

import SelectedClassContainer from "./Components/SelectedClassContainer";
import ClassDetailContainer from "./Components/ClassDetailContainer";
import ConfirmModal from "./Components/ConfirmModal";
import BackButton from "@/Components/BackButton";
import Spinner from "@/Components/Spinner";
import Button from "@/Components/Button";

import style from "./index.module.css";

import {DayColor} from "../Styles";
import { useEnv } from "@/Hooks/useEnv";

function formatTimeDifference(A, B) {
  let seconds = Math.round((A-B)/1000);
  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // 결과 문자열 구성 (0인 값은 표시하지 않음)
  const parts = [];
  if (days > 0) parts.push(`${days}일`);
  if (hours > 0) parts.push(`${hours}시간`);
  if (minutes > 0) parts.push(`${minutes}분`);
  if (seconds > 0) parts.push(`${seconds}초`);

  return parts.length > 0 ? parts.join(" ") + " 남음" : "0초";
}

const weekTable = ["월", "화", "수", "목", "금"];

export default function SelectPage() {
  const loadedEnv = useEnv();
  const 수강신청일시 = ((dateStr)=>dateStr?new Date(dateStr):null)(loadedEnv?.수강신청일시);
  const [now, setNow] = useState(Date.now());
  const 신청가능 = (수강신청일시 && now>=수강신청일시);
  useEffect(
    ()=>{
      setTimeout(
        ()=>{
          setNow(Date.now())
        },
        1000
      )
    },
    [now, setNow]
  )

  const { user, updateUser } = useAuth();
  const { isEnrolled, handleChangePage, handleGotoNextPage } = useContext(
    EnrollPageIndexContext
  );

  const [timeTable, setTimeTable] = useState(
    [
    ]
  );
  const makeClassTable = useCallback(
    (timeTable)=>Array.from(Array(timeTable.length), () => Array(weekTable.length).fill(null)),
    []
  )
  const [classes, setClasses] = useState([]);
  const [classTable, setClassTable] = useState(makeClassTable(timeTable));

  const [timeIndex, setTimeIndex] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const [loadingState, setLoadingState] = useState(true);
  const [modalState, setModalState] = useState(false);

  const getClasses = async () => {
    try {
      const response = await axios.get("/didimdolClass/allDidimdolClasses/");

      if (response.data.result === 0) {
        const responseData = response.data.didimdolClasses;
        setClasses(responseData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingState(false);
    }
  };

  const postClasses = async (user, classes) => {
    try {
      const body = {
        id: user.id,
        wants: classes.map((el) => el._id)
      };

      const response = await axios.post("/user/updateDidimdolWants/", body);
      const {message, updated} = response.data;
      const nextDidimbolClass =
        updated.didimdolClass;
      updateUser("didimdolClass", nextDidimbolClass);
      if(message){
        alert(message);
      }
      else{
        if (isEnrolled) {
          handleChangePage(6);
        } else {
          handleGotoNextPage();
        }
      }
    } catch (e) {
      console.error(e);
      throw new Error("서버와의 통신 중 오류가 발생했습니다");
    }
  };

  const [postPending, postError, postClassesAsync] = useAsync(postClasses);

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

  const moveSelectedClass = (index, isDownward) => {
    const nextSelectedClasses = [...selectedClasses];
    const classToMove = nextSelectedClasses.splice(index, 1)[0];
    if (isDownward) {
      nextSelectedClasses.splice(index + 1, 0, classToMove);
    } else {
      nextSelectedClasses.splice(Math.max(index - 1, 0), 0, classToMove);
    }
    setSelectedClasses(nextSelectedClasses);
  };

  const preventClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (!loadingState && classes.length !== 0) {

      setSelectedClasses(
        user?.didimdolClass?.wants?.reduce(
          (result, id) =>{
            const found = classes?.find((el) => el?._id === id);
            return found?[...result, found]:result
          }
          ,[]
        ) ?? []
      );
    }
  }, [loadingState, classes, user]);

  useEffect(
    ()=>{
      if(!classes?.length)
        return;

      const timeTable = classes.map(
        ({daytime: {start, end}})=>{
          return [start, end];
        }
      ).reduce(
        (result, [start, end])=>{
          return result.find(
            ([prevStart, prevEnd])=>(prevStart===start)&&(prevEnd===end)
          )?result:[...result, [start, end]]
        },
        []
      ).sort(
        (a, b)=>{
          function timeToMinutes(time) {
              const [hours, minutes] = time.split(":").map(Number);
              return hours * 60 + minutes;
          }
          const [A, B] = [a, b].map(([start, end])=>({start: timeToMinutes(start), end: timeToMinutes(end)}));
          if(A.start<B.start)
            return -1;
          else if(A.start>B.start)
            return 1;
          if(A.end<B.end)
            return -1;
          else if(A.end>B.end)
            return 1;
          return 0;
        }
      );
      setTimeTable(timeTable);

      if(!timeTable?.length)
        return;
      const nextClassTable = makeClassTable(timeTable);

      classes.forEach((el) => {
        const row = timeTable.findIndex(
          ([start, end])=>(el.daytime.start===start)&&(el.daytime.end===end)
        );
        const col = weekTable.indexOf(el.daytime.day);
        if(row>=0 && col>=0)
          nextClassTable[row][col] = el;
      });
      setClassTable(nextClassTable);
    },
    [classes, setClassTable, setTimeTable, makeClassTable]
  )
  
  return (
    <>
      {isEnrolled && (
        <BackButton
          onClick={() => {
            handleChangePage(6);
          }}
        />
      )}

      {loadingState && (
        <div className={style.loading} onClick={preventClick}>
          <Spinner />
        </div>
      )}

      <div className={style.selectPage}>
        <h1 className={style.header}>
          <span className={style.yellow}>디딤돌</span> 신청
        </h1>

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
                  } ${
                    ((day)=>day?DayColor[day]:"")(classTable[timeIndex][idx]?.daytime?.day)
                  }`}
                  onClick={() => {
                    setSelectedClass(classTable[timeIndex][idx]);
                  }}
                  disabled={
                    classTable[timeIndex][idx] === null ||
                    classTable[timeIndex][idx] === selectedClass
                  }
                >
                  {
                    classTable[timeIndex][idx] !== null
                    ? (
                        ({title, wants, maxWant})=>{
                          return (
                            <>
                              <p><span className={`${style.classTitle}`}>{`${title}조`}</span></p>
                              <p>{`${wants}/${maxWant}`}</p>
                            </>
                          )
                        }
                      )(classTable[timeIndex][idx])
                    : (
                      <p><span className={`${style.classTitle}`}>X</span></p>
                    )
                  }
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={style.selectionContainer}>
          {selectedClasses.length > 0 ? (
            <div>
              <p className={style.selectionHeader}>디딤돌 조 선택 현황</p>
              <div className={style.selectionList}>
                <AnimatePresence>
                  {selectedClasses.map((el, idx) => (
                    <SelectedClassContainer
                      key={el._id}
                      index={idx + 1}
                      data={el}
                      onDelete={() => {
                        deleteSelectedClasses(el);
                      }}
                      onMove={(isDownward) => {
                        moveSelectedClass(idx, isDownward);
                      }}
                      modifiable
                    />
                  ))}
                </AnimatePresence>
              </div>
              <div className={style.confirmButtonContainer}>
              {
                신청가능?
                (
                  <Button
                    className={style.confirmButton}
                    disabled={(selectedClasses.length === 0) || !신청가능}
                    onClick={() => {
                      setModalState(true);
                    }}
                  >
                    신청하기
                  </Button>
                ):
                (
                  <div className={style.timeDifference}>
                    {formatTimeDifference(수강신청일시, now)}
                  </div>
                )
              }
              </div>
            </div>
          ) : (
            <div className={style.selectionDescription}>
              아직 선택한 디딤돌 조가 없습니다.
              <br />
              <br />
              <span className={style.bold}>
                시간과 요일을 클릭하여
                <br />
                디딤돌조에 대한 설명을 확인하세요.
              </span>
            </div>
          )}
        </div>

        <ClassDetailContainer
          data={selectedClass}
          onClose={() => {
            setSelectedClass(null);
          }}
          onConfirm={() => {
            insertSelectedClasses(selectedClass);
          }}
          enabled={
            selectedClasses.length < 3 &&
            !selectedClasses.includes(selectedClass) &&
            !(selectedClass&&selectedClass.wants>=selectedClass.maxWant) &&
            !(selectedClass?.freeze)
          }
          message={
            selectedClasses.length >= 3?
              "전부 선택함":
              selectedClasses.includes(selectedClass)?
                "이미 선택 중":
                selectedClass&&selectedClass.wants>=selectedClass.maxWant?
                  "정원 초과":
                  selectedClass?.freeze?
                    "잠겨있음":
                    "신청하기"
          }
          className={selectedClass?DayColor[selectedClass?.daytime?.day]:""}
        />
      </div>
      {modalState && (
        <ConfirmModal
          onClose={() => {
            setModalState(false);
          }}
          onSubmit={() => {
            postClassesAsync(user, selectedClasses);
          }}
          classList={selectedClasses}
          pending={postPending}
          error={postError}
        />
      )}
    </>
  );
}
