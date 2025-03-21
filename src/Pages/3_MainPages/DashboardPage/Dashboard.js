import { Link } from "react-router-dom";

import ClassContainer from "./Components/ClassContainer";
import AttendnaceLogContainer from "./Components/AttendanceLogContainer";
import StatusContainer from "./Components/StatusContainer";

import style from "./Dashboard.module.css";

const statusList = {
    "적": "red",
    "황": "orange",
    "녹": "blue",
    "회": "gray",
    "인준": "인준",
  }
  
const mockData = {
status: statusList["녹"],
numSaveCount: 0,
numClasses: 0,
numAssoc: 0,
isPracAccepted: false,
statusText: "디딤돌 수강신청을 환영해요!",
};

function DashBoard({user, setPageIndex:setPageIndexFuction}){
    const setPageIndex = setPageIndexFuction??(()=>{});
    const didimdol = Array.isArray(user?.didimdolClass?.belongs)?
        user.didimdolClass.belongs.filter(
            ({role})=>role==="student"
        )[0]?.didimdolClass
        :undefined;
    const logs = user?.attendant?.logs??{};

    const status = (
        (info)=>{
            if(!info){
            return mockData;
            }
            return {
            status: statusList[info.status]??mockData.status,
            numSaveCount: info.shield??mockData.numSaveCount,
            numClasses: info.absent??mockData.numClasses,
            numAssoc: info.numAssoc??mockData.numAssoc,
            isPracAccepted: info.license??mockData.isPracAccepted,
            statusText: info.message??mockData.statusText
            }
        }
    )(user?.attendant?.info);

    return (
        <>
            <div className={style.dashBoardHeaderContainer}>
            <h1 className={style.dashBoardHeader}>
                안녕하세요 <span className={style.bold}>{user.name}</span> 님,
            </h1>
            <p className={style.dashBoardEngHeader}>
                Welcome to Amateur Astronomy Association
            </p>
            </div>

            <div className={style.scrollWrapper}>
            <StatusContainer status={status} />

            <ClassContainer didimdol={didimdol} />

            <div className={style.infoButtonContainer}>
                <button
                className={style.infoButton}
                onClick={() => {
                    setPageIndex(2);
                }}
                >
                인준기준
                </button>
                {<button
                className={style.infoButton}
                onClick={() => {
                    setPageIndex(1);
                }}
                >
                디딤돌 안내
                </button>}
                <Link to="https://our.snuaaa.net">
                <button className={style.infoButton}>
                    커뮤니티
                </button>
                </Link>
            </div>

            <div className={style.dividor} />

            <AttendnaceLogContainer logs={logs} />
            </div>
        </>
    )
}

export default DashBoard;