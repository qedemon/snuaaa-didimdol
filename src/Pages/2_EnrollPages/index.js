import { createContext, useState } from "react";

import InfoPage from "./1_InfoPage";
import InfoQuizPage from "./2_InfoQuizPage";
import LogoutButton from "../../Components/LogoutButton";

const PageList = [<InfoPage />, <InfoQuizPage />];

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
