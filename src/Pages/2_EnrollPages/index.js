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

const PageList = [
  <WelcomePage />,
  <InfoPage />,
  <InfoQuizPage />,
  <SelectPage />,
  <WelcomePartyPage />,
  <EndPage />,
  <DashBoardPage />,
];

const EnrollPageIndexContext = createContext({
  pageIndex: 0,
  isEnrolled: false,
  handleGotoNextPage: () => {},
  handleChangePage: () => {},
});

export { EnrollPageIndexContext };

export default function EnrollPage() {
  const { user } = useAuth(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleGotoNextPage = () => {
    setPageIndex((prevPageIndex) => prevPageIndex + 1);
  };

  const handleChangePage = (idx) => {
    setPageIndex(idx);
  };

  useEffect(() => {
    if (user?.valid) {
      const enrollState = user.didimdolClass;
      if (enrollState.wants.length > 0) {
        if (enrollState.party === null) {
          setPageIndex(4);
        } else {
          setIsEnrolled(true);
          if (pageIndex === 0) {
            setPageIndex(6);
          }
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
