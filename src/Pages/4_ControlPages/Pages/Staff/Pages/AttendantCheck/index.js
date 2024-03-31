import React, { useCallback, useEffect, useState } from "react";
import { AttendantCheckDetailContainer, AttendantCheckContainer, AttendantCheckCountContainer, AttendantCheckHeader, AttendantCheckLockEditable, AttendantCheckMemberList, AttendantCheckMemberItem, AttendantCheckLogger } from "./Components";
import { Link } from "react-router-dom";
import {useContext as useAuth} from "../../../../Context/Auth";
import {useContext as useModalController} from "../../../../Context/Modal";
import loadAttendant from "./loadAttendant";
import { localDateString } from "@/Utils/Utils";
import SelectPage from "../../../Modal/SelectPage";
import updateAttendants from "./updateAttendants";
import request from "@/Pages/4_ControlPages/Utility/Connection";

function AttendantCheck(){

    const auth = useAuth();
    const [attendantList, setAttendantList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const [updateLog, setUpdateLog] = useState({pending: false, message: ""});
    const loadAttendantList = useCallback(
        async (auth)=>{
            setUpdateLog({pending: true, message: "출석 정보 불러오는 중..."});
            const attendantList = (await loadAttendant(auth))??[];
            setAttendantList(attendantList);
            setSelectedIndex(0);
            setUpdateLog({pending: false, message: "출석 정보 불러오기 완료."});
        },
        [setAttendantList, setSelectedIndex]
    );
    useEffect(
        ()=>{
            loadAttendantList(auth);
        },
        [auth, loadAttendantList]
    )


    const modalController = useModalController().current;
    const openAttendantSelect = useCallback(
        ()=>{
            modalController.setChildren(
                {
                    component: SelectPage,
                    props: {
                        list: attendantList.map(
                            ({date}, index)=>{
                                return {
                                    label: localDateString(date),
                                    value: index
                                }
                            }
                        ),
                        onSelect: (value)=>{
                            modalController.close();
                            setSelectedIndex(value);
                        }
                    }
                }
            );
            modalController.open();
        },
        [attendantList, modalController]
    )

    const [locked, setLocked] = useState(true);
    const onLockClicked = useCallback(
        ()=>{
            setLocked((locked)=>!locked);
        },
        [setLocked]
    );

    const selectedAttendant = attendantList[selectedIndex]??{};
    const students = (selectedAttendant?.students??[]).map((student)=>({...student, checked: student?.authenticatedAt??false}));
    const updateCheck = useCallback(
        (index, check)=>()=>{
            if(locked)
                return;
            (
                async()=>{
                    setAttendantList(updateAttendants(selectedIndex, index, (student)=>({...student, pending: true})))
                    const updated = await (
                        async (student, attendant)=>{
                            await (
                                async (user, attendant, check)=>{
                                    if(check){
                                        await request.post("qrAuthentication/addQRAuthenticationLogForUser/", 
                                            {
                                                targetUserId: user.id,
                                                type: "디딤돌",
                                                createdAt: new Date(attendant.date)
                                            }    
                                        )
                                    }
                                    else{
                                        await request.post("qrAuthentication/deleteQRLogsFromUser/",
                                            {
                                                targetUserId: user.id,
                                                filter: {
                                                    "authentication.context.title": attendant.title
                                                }
                                            }
                                        )
                                    }
                                }
                            )(student, attendant, check)
                            const {authenticatedAt, ...remain} = student;
                            return {
                                ...remain,
                                authenticatedAt: check?new Date(attendant.date):null,
                                pending: false
                            }
                        }
                    )(attendantList[selectedIndex].students[index], attendantList[selectedIndex])

                    setAttendantList(updateAttendants(selectedIndex, index, updated));
                }
            )();
        },
        [attendantList, selectedIndex, locked]
    )

    return (
        <AttendantCheckContainer>
            <AttendantCheckHeader>
                <h1>디딤돌 <b>출석 확인</b></h1>
                <h2>Welcome to Amateur Astronomy Association</h2>
                <div className="homeLink"><Link to={"/"}>Home</Link></div>
            </AttendantCheckHeader>
            <AttendantCheckCountContainer onClick={openAttendantSelect}>
                <div className="classInfo">
                    <h1 className="date">{selectedAttendant?.date?localDateString(selectedAttendant?.date):""}</h1>
                    <h2 className="classIndex">{`디딤돌 수업 # ${selectedAttendant.no}`}</h2>
                </div>
                <div className="attendantCount">
                    <h1><span className="white">{selectedAttendant.count}</span> {`/ ${students.length}`}</h1>
                    <h2>오늘 출석 수</h2>
                </div>
            </AttendantCheckCountContainer>
            <AttendantCheckDetailContainer>
                <div className="head">
                    <AttendantCheckLogger className="logger" pending={updateLog.pending} message={updateLog.message}/>
                    <AttendantCheckLockEditable lock={locked} onClick={onLockClicked} messages={["Lock", "편집"]}/>
                </div>
                <div className="body">
                    <AttendantCheckMemberList>
                        {
                            students.map(
                                (user, index)=>(<AttendantCheckMemberItem key={index} user={user} lock={locked} onCheckClick={updateCheck(index, !user.checked)}/>)
                            )
                        }
                    </AttendantCheckMemberList>
                </div>
            </AttendantCheckDetailContainer>
        </AttendantCheckContainer>
    )
}

export default AttendantCheck;