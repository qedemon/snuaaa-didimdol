import { createContext, useState } from "react";

import WelcomePage from "./1_WelcomePage";
import InfoPage from "./2_InfoPage";
import InfoQuizPage from "./3_InfoQuizPage";
import SelectPage from "./4_SelectPage";

import LogoutButton from "../../Components/LogoutButton";

const PageList = [
  <WelcomePage />,
  <InfoPage />,
  <InfoQuizPage />,
  <SelectPage />,
];

const EnrollPageIndexContext = createContext({
  pageIndex: 0,
  handleGotoNextPage: () => {},
});

export { EnrollPageIndexContext };

export default function EnrollPage() {
  const [pageIndex, setPageIndex] = useState(0);

  const handleGotoNextPage = () => {
    setPageIndex((prevPageIndex) => prevPageIndex + 1);
  };

  return (
    <EnrollPageIndexContext.Provider
      value={{
        pageIndex,
        handleGotoNextPage,
      }}
    >
      <LogoutButton />
      {PageList[pageIndex]}
    </EnrollPageIndexContext.Provider>
  );
}
