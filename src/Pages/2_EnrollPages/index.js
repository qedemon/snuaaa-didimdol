import { createContext, useEffect, useState } from "react";
import { useAuth } from "@/Contexts/AuthContext";

import WelcomePage from "./1_WelcomePage";
import InfoPage from "./2_InfoPage";
import InfoQuizPage from "./3_InfoQuizPage";
import SelectPage from "./4_SelectPage";
import WelcomePartyPage from "./5_WelcomePartyPage";
import EndPage from "./6_EndPage";
import DashBoardPage from "./DashBoardPage";

import LogoutButton from "@components/LogoutButton";
import { useNavigate } from "react-router-dom";

const EnrollPageIndexContext = createContext({
  pageIndex: 0,
  isEnrolled: false,
  handleGotoNextPage: () => {},
  handleChangePage: () => {},
});

export { EnrollPageIndexContext };

export default function EnrollPage() {
  const { user } = useAuth(true);
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const PageList = [
    <WelcomePage />,
    <InfoPage
      onClick={
        isEnrolled
          ? () => {
              setPageIndex(6);
            }
          : undefined
      }
    />,
    <InfoQuizPage
      onClick={
        isEnrolled
          ? () => {
              setPageIndex(6);
            }
          : undefined
      }
    />,
    <SelectPage />,
    <WelcomePartyPage />,
    <EndPage />,
    <DashBoardPage />,
  ];

  const handleGotoNextPage = () => {
    setPageIndex((prevPageIndex) => prevPageIndex + 1);
  };

  const handleChangePage = (idx) => {
    setPageIndex(idx);
  };

  useEffect(() => {
    if (user?.valid) {
      /*if (!user?.isStudent || !user?.paid) {
        navigate("/");
      }*/

      const enrollState = user.didimdolClass;
      if (enrollState.wants.length > 0) {
        setIsEnrolled(true);
        if (pageIndex === 0) {
          setPageIndex(6);
        }
      }
    }
  }, [user, pageIndex]);

  return (
    <>
      {user?.valid && (
        <EnrollPageIndexContext.Provider
          value={{
            pageIndex,
            isEnrolled,
            handleGotoNextPage,
            handleChangePage,
          }}
        >
          <LogoutButton />
          {PageList[pageIndex]}
        </EnrollPageIndexContext.Provider>
      )}
    </>
  );
}
