import { useContext, useEffect } from "react";
import { useAuth } from "@/Contexts/AuthContext";
import useAsync from "@/Hooks/useAsync";
import axios from "@connections/NovaConnection";
import { EnrollPageIndexContext } from "..";

import Button from "@components/Button";

import CharactersBig from "@images/CharactersBig.svg";
import style from "./index.module.css";
import Spinner from "@/Components/Spinner";

export default function WelcomePartyPage() {
  const { user, updateUser } = useAuth();
  const { handleGotoNextPage } = useContext(EnrollPageIndexContext);

  const preventClick = (e) => {
    e.stopPropagation();
  };

  const postAttendParty = async (user, condition) => {
    try {
      const body = [
        {
          id: user.id,
          didimdolClass: {
            ...user.didimdolClass,
            party: condition,
          },
        },
      ];

      const response = await axios.post("/user/updateUsers/", body);
      const nextDidimbolClass =
        response.data.updated.updated[0].user.didimdolClass;
      updateUser("didimdolClass", nextDidimbolClass);
      handleGotoNextPage();
    } catch (e) {
      console.error(e);
      throw new Error("서버와의 통신 중 오류가 발생했습니다");
    }
  };

  const [postPending, postError, postAttendPartyAsync] =
    useAsync(postAttendParty);

  return (
    <>
      <div className={style.welcomePartyPage}>
        <img className={style.image} src={CharactersBig} alt="characters" />
        <div className={style.welcomePartyContainer}>
          <div>
            <h1 className={style.welcomePartyHeader}>안내문</h1>
            <h2 className={style.welcomePartySecondHeader}>AAA 신입생환영회</h2>
          </div>
          <p className={style.welcomePartyDescription}>
            신입회원 여러분에게 동아리 소개와 한 학기 디딤돌 프로그램을 안내하는
            자리입니다.
            <br />
            <br />
            디딤돌 조별 첫만남이 있으니 동아리 활동에 관심 있는 분들께서는 꼭
            참석해주시기 바랍니다.
          </p>
          <p
            className={`${style.welcomePartyDescription} ${style.bold} ${style.noWrap} ${style.darkBlue}`}
          >
            일정 : 3월 16일 토요일 오후 5시
            <br />
            장소 : 56동 105호
            <br />
            <br />
            행사 일정
            <br />
            동아리 소개 및 디딤돌 안내{" "}
            <span className={style.bluePrimary}>(3-4시)</span>
            <br />
            조별 활동 <span className={style.bluePrimary}>(4-5시)</span>
            <br />
            친목다지기(낙성대 이동){" "}
            <span className={style.bluePrimary}>(6시~)</span>
            <br />
          </p>
          <div className={style.buttonContainer}>
            <Button
              className={style.button}
              onClick={() => {
                postAttendPartyAsync(user, true);
              }}
              disabled={postPending}
            >
              참여
            </Button>
            <Button
              className={style.button}
              onClick={() => {
                postAttendPartyAsync(user, false);
              }}
              disabled={postPending}
            >
              불참
            </Button>
          </div>
        </div>
      </div>
      {postPending && (
        <div className={style.loading} onClick={preventClick}>
          <Spinner />
        </div>
      )}
      {postError && <p className={style.error}>{postError.message}</p>}
    </>
  );
}
