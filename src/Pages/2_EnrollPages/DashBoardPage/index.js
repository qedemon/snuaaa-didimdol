import { useContext, useEffect, useState } from "react";
import { useAuth } from "@/Contexts/AuthContext";
import axios from "@connections/NovaConnection";
import { EnrollPageIndexContext } from "..";

import SelectedClassContainer from "../4_SelectPage/Components/SelectedClassContainer";
import ClassDetailContainer from "../4_SelectPage/Components/ClassDetailContainer";
import Button from "@/Components/Button";

import ProfileImage from "@images/CharacterProfileImage.svg";
import style from "./index.module.css";

export default function DashBoardPage() {
  const { handleChangePage } = useContext(EnrollPageIndexContext);
  const { user } = useAuth();

  const [classes, setClasses] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const getClasses = async () => {
    try {
      const response = await axios.get("/didimdolClass/allDidimdolClasses/");

      if (response.data.result === 0) {
        setClasses(response.data.didimdolClasses);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <>
      {user?.valid && classes && (
        <div className={style.DashBoardPage}>
          <div className={style.userInfo}>
            <img
              className={style.userImage}
              src={user.profilePath ?? ProfileImage}
              alt="profile"
            />
            <p className={style.userName}>{user.name}</p>
            <p className={style.userNo}>{user.aaaNo}</p>
          </div>
          <div className={style.redirectionContainer}>
            <p className={style.redirectionHeader}>바로가기</p>
            <div className={style.buttonWrapper}>
              <button
                onClick={() => {
                  handleChangePage(1);
                }}
              >
                디딤돌 안내
              </button>
              <button
                onClick={() => {
                  handleChangePage(2);
                }}
              >
                인준 기준
              </button>
            </div>
          </div>
          <div className={style.classContainer}>
            <p className={style.classHeader}>나의 디딤돌 신청 현황</p>
            <div className={style.classList}>
              {user.didimdolClass.wants.map((el, idx) => {
                const data = classes.find((cls) => cls._id === el);
                return (
                  <div
                    className={style.classItem}
                    key={idx}
                    onClick={() => {
                      setSelectedClass(data);
                    }}
                  >
                    <SelectedClassContainer index={idx + 1} data={data} />
                  </div>
                );
              })}
            </div>
            <Button
              className={style.modifiyButton}
              onClick={() => {
                handleChangePage(3);
              }}
            >
              신청 수정하기
            </Button>
          </div>

          <ClassDetailContainer
            data={selectedClass}
            onClose={() => {
              setSelectedClass(null);
            }}
            inputCondition={false}
          />
        </div>
      )}
    </>
  );
}
