import { useEffect, useState } from "react";

import style from "./AttendanceLogContainer.module.css";

const logCategories = ["디딤돌", "별모임", "자율돔관", "소관", "etc"];

export default function AttendnaceLogContainer({ logs: initialLogs }) {
  const [filterIndex, setFilterIndex] = useState(0);
  const [logList, setLogList] = useState([]);

  useEffect(() => {
    if (initialLogs) {
      const nextLogList = Object.entries(initialLogs)
      .map(
        ([key, value])=>({...value, key})
      )
      .filter(
        (el) => el.type === logCategories[filterIndex]
      );
      nextLogList.sort((a, b) =>
        a.authenticatedAt > b.authenticatedAt ? 1 : -1
      );
      setLogList(nextLogList || []);
    }
  }, [filterIndex, initialLogs]);

  return (
    <div className={style.contentLogContainer}>
      <p className={style.contentLogHeader}>나의 참여 로그</p>
      <div className={style.filterButtonContainer}>
        {logCategories.map((el, idx) => (
          <div
            key={idx}
            className={`${style.filterButton} ${
              filterIndex === idx ? style.selected : ""
            }`}
            onClick={() => {
              setFilterIndex(idx);
            }}
          >
            {el}
          </div>
        ))}
      </div>
      <div className={style.logList}>
        {logList.map((el, idx) => (
          <div key={idx} className={style.logItem}>
            {idx + 1}. {el.key}
          </div>
        ))}
      </div>
    </div>
  );
}
