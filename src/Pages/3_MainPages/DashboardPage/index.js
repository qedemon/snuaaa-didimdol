import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@contexts/AuthContext";

import DashBoard from "./Dashboard";
import LogoutButton from "@components/LogoutButton";
import InfoPage from "@/Pages/2_EnrollPages/2_InfoPage";
import style from "./index.module.css";
import InfoQuizPage from "@/Pages/2_EnrollPages/3_InfoQuizPage";

export default function DashboardPage() {
  const { user } = useAuth(true);
  const navigate = useNavigate();

  const [pageIndex, setPageIndex] = useState(0);

  const didimdol = Array.isArray(user?.didimdolClass?.belongs)?
    user.didimdolClass.belongs.filter(
      ({role})=>role==="student"
    )[0]?.didimdolClass
    :undefined;

  useEffect(() => {
    if (user?.isAdmin || user?.isStaff) {
      navigate("/control/Staff");
    }
    else if(user?.valid && !didimdol){
      navigate("/enroll");
    }
  });

  return (
    <>
      {user?.valid && (
        <div className={style.MainContainer}>
          <LogoutButton />
          {pageIndex === 0 ? (
            <DashBoard user={user} setPageIndex={setPageIndex}/>
          ) : pageIndex === 1 ? (
            <InfoPage
              onClick={() => {
                setPageIndex(0);
              }}
            />
          ) : (
            <InfoQuizPage
              onClick={() => {
                setPageIndex(0);
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
