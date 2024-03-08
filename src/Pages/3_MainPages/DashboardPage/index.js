import LogoutButton from "@components/LogoutButton";
import { useAuth } from "@contexts/AuthContext";

import ProfileImage from "@images/CharacterProfileImage.svg";
import style from "./index.module.css";

export default function DashboardPage() {
  const { user } = useAuth(true);

  return (
    <>
      {user?.valid && (
        <div className={style.DashBoardPage}>
          <LogoutButton />
          <div className={style.userInfo}>
            <img
              className={style.userImage}
              src={user.profilePath ?? ProfileImage}
              alt="profile"
            />
            <p className={style.userName}>{user.name}</p>
            <p className={style.userNo}>{user.aaaNo}</p>
            {(!user.isStudent || !user.paid) && (
              <p className={style.userDescription}>
                디딤돌 수강신청 대상이 아닙니다!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
