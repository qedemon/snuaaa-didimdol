import { createContext, useEffect, useState } from "react";

import WelcomePage from "./1_WelcomePage";
import InfoPage from "./2_InfoPage";
import InfoQuizPage from "./3_InfoQuizPage";
import SelectPage from "./4_SelectPage";
import WelcomePartyPage from "./5_WelcomePartyPage";
import EndPage from "./6_EndPage";
import DashBoardPage from "./DashBoardPage";

import LogoutButton from "@components/LogoutButton";
import { useAuth } from "@/Contexts/AuthContext";

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
  handleGotoNextPage: () => {},
});

export { EnrollPageIndexContext };

export default function EnrollPage() {
  const { user } = useAuth(true);
  const [pageIndex, setPageIndex] = useState(0);

  const handleGotoNextPage = () => {
    setPageIndex((prevPageIndex) => prevPageIndex + 1);
  };

  useEffect(() => {
    if (user?.valid) {
      const enrollState = user.didimdolClass;
      if (enrollState.wants.length > 0) {
        if (enrollState.party === null) {
          setPageIndex(4);
        } else {
          setPageIndex(6);
        }
      }
    }
  }, [user]);

  return (
    <>
      {user?.valid && (
        <EnrollPageIndexContext.Provider
          value={{
            pageIndex,
            handleGotoNextPage,
          }}
        >
          <LogoutButton />
          {PageList[pageIndex]}
        </EnrollPageIndexContext.Provider>
      )}
    </>
  );
}
