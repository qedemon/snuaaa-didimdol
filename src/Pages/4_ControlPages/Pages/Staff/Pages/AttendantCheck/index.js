import React, { useCallback, useEffect,  useRef, useState } from "react";
import { AttendantCheckDetailContainer, AttendantCheckContainer, AttendantCheckCountContainer, AttendantCheckHeader, AttendantCheckLockEditable, AttendantCheckMemberList, AttendantCheckMemberItem, AttendantCheckLogger, AttendantCheckDidimdolSelect } from "./Components";
import { Link } from "react-router-dom";
import {useContext as useAuth} from "../../../../Context/Auth";
import {useContext as useModalController} from "../../../../Context/Modal";
import { localDateString } from "@/Utils/Utils";
import SelectPage from "../../../Modal/SelectPage";
import updateAttendants from "./Utils/updateAttendants";
import request from "@/Pages/4_ControlPages/Utility/Connection";
import loadDidimdol from "./Utils/loadDidimdol";
import getAttendant from "./Utils/getAttendant";
import getAttendantTitle from "./Utils/getAttendantTitle";
import DateSelectPage from "../../../Modal/DateSelectPage";

function AttendantCheck(){
    const auth = useAuth();
    const [targetDidimdolClassId, setTargetDidimdolClassId] = useState();
    const [belongings, setBelongings] = useState([]);
    useEffect(
        ()=>{
            const belongings = (auth.userInfo?.didimdolClass?.belongs??[]).filter(({role})=>["lecturer", "assistant"].includes(role)).sort((A, B)=>A.didimdolClass.title-B.didimdolClass.title);
            setBelongings(belongings);
            if(Array.isArray(belongings)&&belongings.length>0){
                setTargetDidimdolClassId(belongings[0].didimdolClass._id);
            }
        },
        [auth, setBelongings, setTargetDidimdolClassId]
    );

    const didlmdolClass = useRef();
    const [attendantDate, setAttendantDate] = useState(
        ((date)=>({[getAttendantTitle(date)]: date}))(new Date())
    );
    const [attendantList, setAttendantList] = useState({});
    const [selectedAttendantTitle, setSelectedAttendantTitle] = useState();
    
    const [updateLog, setUpdateLog] = useState({pending: false, message: ""});
    const loadDidimdolClass = useCallback(
        async (targetDidimdolClassId)=>{
            setUpdateLog({pending: true, message: "출석 정보 불러오는 중..."});
            const loadedDidimdolClass = (await loadDidimdol(targetDidimdolClassId));
            if(loadedDidimdolClass){
                didlmdolClass.current=loadedDidimdolClass;
                setAttendantDate((attendantDate)=>(
                    {
                        ...attendantDate,
                        ...Object.entries(loadedDidimdolClass.attendant)
                        .reduce(
                            (result, [key, value])=>(
                                {
                                    ...result, [key]: new Date(value)
                                }
                            ),
                            {}
                        )
                    }
                ));
                setUpdateLog({pending: false, message: "출석 정보 불러오기 완료"})
                return loadedDidimdolClass;
            }
        },
        [didlmdolClass, setUpdateLog, setAttendantDate]
    );
    useEffect(
        ()=>{
            if(didlmdolClass.current){
                const attendantDateList = Object.values(attendantDate)
                .sort(
                    (A, B)=>{
                        if(A<B){
                            return 1;
                        }
                        else if(A>B){
                            return -1;
                        }
                        return 0;
                    }
                );
                const attendantListArray = attendantDateList
                    .map(
                        (attendantDateValue)=>getAttendant(didlmdolClass.current, attendantDateValue)
                    )
                    .map(
                        (attendant, index, array)=>({...attendant, no: array.length-index})
                    )
                const attendantList = attendantListArray
                    .reduce(
                        (result, attendant)=>({...result, [attendant.title]: attendant}),
                        {}
                    );
                setAttendantList(attendantList);
                setSelectedAttendantTitle(
                    (selectedAttendantTitle)=>{
                        if(selectedAttendantTitle && attendantList[selectedAttendantTitle]){
                            return selectedAttendantTitle;
                        }
                        if(Array.isArray(attendantListArray) && attendantListArray.length>0){
                            return attendantListArray[0].title;
                        }
                        return selectedAttendantTitle;
                    }
                )
            }
        },
        [didlmdolClass, attendantDate, setAttendantList, setSelectedAttendantTitle]
    )

    const modalController = useModalController().current;
    const [attendantSelectOpenRquired, setAttendantSelectOpenRquired] = useState(false);
    const requireOpenAttendantSelect = useCallback(
        ()=>{
            setAttendantSelectOpenRquired(true);
        },
        [setAttendantSelectOpenRquired]
    );
    const openAttendantSelect = useCallback(
        ()=>{
            modalController.setChildren(
                {
                    component: SelectPage,
                    props: {
                        list: [
                            {
                                label: "날짜 추가",
                                value: null
                            },
                            ...(Object.values(attendantDate))
                            .sort(
                                (A, B)=>{
                                    if(A<B)
                                        return 1;
                                    else if(A>B)
                                        return -1;
                                    else
                                        return 0;
                                }
                            )
                            .map(
                                (date)=>{
                                    return {
                                        label: localDateString(date),
                                        value: date
                                    }
                                }
                            )
                        ],
                        onSelect: (value)=>{
                            if(value===null){
                                modalController.setChildren(
                                    {
                                        component: DateSelectPage,
                                        props:{
                                            onSelect: (value)=>{
                                                const localDate = (
                                                    (date)=>{
                                                        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18);
                                                    }
                                                )(new Date(value));
                                                setAttendantDate(
                                                    (attendantDate)=>(
                                                        {
                                                            ...attendantDate,
                                                            [getAttendantTitle(localDate)]: localDate
                                                        }
                                                    )
                                                );
                                                setAttendantSelectOpenRquired(true);
                                                modalController.close();
                                            }
                                        }
                                    }
                                );
                                modalController.open();
                            }
                            else{
                                modalController.close();
                                setSelectedAttendantTitle(getAttendantTitle(value));
                            }
                        }
                    }
                }
            );
            modalController.open();
        },
        [modalController, attendantDate, setAttendantDate, setSelectedAttendantTitle, setAttendantSelectOpenRquired]
    )
    useEffect(
        ()=>{
            if(attendantSelectOpenRquired){
                openAttendantSelect();
                setAttendantSelectOpenRquired(false);
            }
        },
        [attendantSelectOpenRquired, openAttendantSelect, setAttendantSelectOpenRquired]
    )

    const [locked, setLocked] = useState({current: true, prev: true});
    const onLockClicked = useCallback(
        ()=>{
            setLocked((locked)=>({...locked, current: !locked.current}));
        },
        [setLocked]
    );
    useEffect(
        ()=>{
            setLocked((locked)=>({...locked, current: true}))
        },
        [selectedAttendantTitle, setLocked]
    )

    const webSocket = useRef();
    const socketTimer = useRef();
    const [updateRequired, setUpdateRequired] = useState(true);
    const onWebSocketMessage = useCallback(
        (event)=>{
            const data = (
                (data)=>{
                    try{
                        return JSON.parse(event.data);
                    }
                    catch{
                        console.log(data);
                        return {};
                    }
                }
            )(event.data);
            if(Array.isArray(data?.updated) && data.updated.includes("attendant")){
                setUpdateRequired(true);
            }
        },
        [setUpdateRequired]
    )
    useEffect(
        ()=>{
            (
                async ()=>{
                    if(!webSocket.current){
                        await (
                            async()=>{
                                const webSocketURL = await (
                                    async ()=>{
                                        const {data} = await request.get("/webSocket");
                                        return data?.url;
                                    }
                                )();
                                if(socketTimer.current){
                                    clearInterval(socketTimer)
                                }
                                webSocket.current = new WebSocket(webSocketURL);
                                webSocket.current.onopen = ()=>{
                                    console.log("open socket");
                                    socketTimer.current = setInterval(
                                        ()=>{
                                            if(webSocket.current){
                                                webSocket.current.send("this is AttendantCheck.")
                                            };
                                        },
                                        10000
                                    )
                                }
                            }
                        )();
                    }
                    webSocket.current.onmessage = onWebSocketMessage;
                }
            )();

            return ()=>{
                if(socketTimer.current){
                    console.log("clear");
                    clearInterval(socketTimer.current);
                }
                if(webSocket.current){
                    webSocket.current.close();
                    console.log("close socket");
                }
            }
        },
        [webSocket, onWebSocketMessage, socketTimer]
    );

    useEffect(
        ()=>{
            if(!updateLog.pending && locked.current && updateRequired && targetDidimdolClassId){
                (
                    async() =>{
                        if(await loadDidimdolClass(targetDidimdolClassId)){
                            setUpdateRequired(false);
                        }
                    }
                )();
            }
            if(locked.prev!==locked.current){
                setLocked((locked)=>({...locked, prev: locked.current}));
                if(locked.current){
                    setUpdateRequired(true);
                }
            }
        },
        [targetDidimdolClassId, loadDidimdolClass, setUpdateRequired, updateRequired, updateLog, locked, setLocked]
    );

    const selectedAttendant = (selectedAttendantTitle?attendantList[selectedAttendantTitle]:null)??{};
    const students = (selectedAttendant?.students??[]).map((student)=>({...student, checked: student?.authenticatedAt??false}));
    const checkCount = students.reduce((result, {authenticatedAt})=>authenticatedAt?result+1:result, 0);
    const updateCheck = useCallback(
        (index, check)=>()=>{
            if(locked.current)
                return;
            (
                async()=>{
                    setAttendantList(updateAttendants(selectedAttendantTitle, index, (student)=>({...student, pending: true})))
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
                    )(attendantList[selectedAttendantTitle].students[index], attendantList[selectedAttendantTitle])

                    setAttendantList(updateAttendants(selectedAttendantTitle, index, updated));
                }
            )();
        },
        [attendantList, selectedAttendantTitle, locked]
    );
    
    const onTargetDidimdolClassIdSelect = useCallback(
        ({target: {value}})=>{
            setTargetDidimdolClassId(value);
            setUpdateRequired(true);
        },
        [setTargetDidimdolClassId, setUpdateRequired]
    )

    return (
        <AttendantCheckContainer>
            <AttendantCheckHeader>
                <h1>디딤돌 <b>출석 확인</b></h1>
                <h2>Welcome to Amateur Astronomy Association</h2>
                <div className="homeLink"><Link to={"/"}>Home</Link></div>
            </AttendantCheckHeader>
            {
                belongings.length>1?
                    (
                        <AttendantCheckDidimdolSelect onChange={onTargetDidimdolClassIdSelect} defaultValue={targetDidimdolClassId}>
                            {
                                belongings.map(
                                    ({didimdolClass: {_id, title, daytime}})=>(<option key={_id} value={_id}>{`${title}조 ${daytime.day}요일 ${daytime.start}`}</option>)
                                )
                            }
                        </AttendantCheckDidimdolSelect>
                    ):
                    null
            }
            
            <AttendantCheckCountContainer onClick={requireOpenAttendantSelect}>
                <div className="classInfo">
                    <h1 className="date">{selectedAttendant?.date?localDateString(selectedAttendant?.date):""}</h1>
                    <h2 className="classIndex">{`디딤돌 수업 # ${selectedAttendant.no}`}</h2>
                </div>
                <div className="attendantCount">
                    <h1><span className="white">{checkCount}</span> {`/ ${students.length}`}</h1>
                    <h2>오늘 출석 수</h2>
                </div>
            </AttendantCheckCountContainer>
            <AttendantCheckDetailContainer>
                <div className="head">
                    <AttendantCheckLogger className="logger" pending={updateLog.pending} message={updateLog.message}/>
                    <AttendantCheckLockEditable lock={locked.current} onClick={onLockClicked} messages={["Lock", "편집"]}/>
                </div>
                <div className="body">
                    <AttendantCheckMemberList>
                        {
                            students.map(
                                (user, index)=>(<AttendantCheckMemberItem key={index} user={user} lock={locked.current} onCheckClick={updateCheck(index, !user.checked)}/>)
                            )
                        }
                    </AttendantCheckMemberList>
                </div>
            </AttendantCheckDetailContainer>
        </AttendantCheckContainer>
    )
}

export default AttendantCheck;