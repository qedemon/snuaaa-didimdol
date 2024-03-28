import React, { useCallback, useEffect, useRef, useState } from 'react';
import AttendantListUl, { AttendantBody, AttendantContainer, AttendantContentBody, AttendantContentContainer, AttendantContentHeader, AttendantHeader, AttendantListSelect } from './Components';
import { SquareButton } from '../../Components';
import HomeButtonImg from "../../Assets/home.png";
import RefreshButtonImg from "../../Assets/refresh.png"
import { useNavigate } from 'react-router-dom';
import {useContext as useAuth} from "../../../../Context/Auth";
//import {useContext as useModalController} from "../../../../Context/Modal";
import request from "../../../../Utility/Connection";
import useAsync from '@/Hooks/useAsync';

function Attendant(){
    const navigate = useNavigate();
    const prevAuth = useRef(undefined);
    const auth = useAuth();
    const [attendantList, setAttendantList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    
    const onSelectChange = useCallback(
        (e)=>{
            setSelectedIndex(e.target.value);
        },
        [setSelectedIndex]
    );

    const loadAttendant = useCallback(
        async ()=>{
            const timeout = new Promise(
                (resolve)=>{
                    setTimeout(
                        ()=>{
                            resolve();
                        },
                        500
                    )
                }
            )
            const targetDidimdolClassId = (auth.userInfo?.didimdolClass?.belongs??[]).filter(({role})=>["lecturer", "assistant"].includes(role))[0]?.didimdolClass._id;
            if(targetDidimdolClassId){
                const {data} = await request.get(`/didimdolClass/getDidimdolClassById/${targetDidimdolClassId}`);
                if(data && data.didimdolClass){
                    const {didimdolClass} = data;
                    const attendantList = (
                        (didimdolClass)=>{
                            const now = new Date(Date.now());
                            const nowTitle = (
                                (date)=>{
                                    const year = date.getFullYear();
                                    const month = date.getMonth() + 1;  // getMonth()는 0부터 시작하기 때문에 +1을 합니다.
                                    const day = date.getDate();
                                
                                    return `${year}. ${month}. ${day}. 디딤돌`;
                                }
                            )(now);
                            return Object.entries(
                                {
                                    [nowTitle]: now,
                                    ...didimdolClass?.attendant??{}
                                }
                            )
                            .map(
                                ([title, value])=>{
                                    return {
                                        title,
                                        date: new Date(value),
                                        students: (didimdolClass?.students??[])
                                            .reduce(
                                                (result, student)=>{
                                                    const log = (student.attendant?.logs??{})[title];
                                                    if(log){
                                                        return [
                                                            ...result,
                                                            {
                                                                ...student,
                                                                authenticatedAt: new Date(log.authenticatedAt)
                                                            }
                                                        ]
                                                    }
                                                    return result
                                                },
                                                []
                                            )
                                            .sort(
                                                (A, B)=>B.authenticatedAt.getTime()-A.authenticatedAt.getTime()
                                            )
                                    }
                                }
                            )
                            .sort(
                                (A, B)=>B.date.getTime()-A.date.getTime()
                            )
                        }
                    )(didimdolClass);
                    setAttendantList(attendantList);
                    setSelectedIndex((index)=>index<0?0:index)
                }
                await timeout;
            }
        },
        [auth, setAttendantList, setSelectedIndex]
    )
    const [pending, error, refresh] = useAsync(loadAttendant);
    if(error){
        console.error(error);
    }

    useEffect(
        ()=>{
            if(auth!==prevAuth.current)
                refresh();
            prevAuth.current=auth;
        },
        [refresh, auth]
    );
    return (
        <AttendantContainer>
            <AttendantHeader>
                <SquareButton imgSrc={HomeButtonImg} onClick={()=>{navigate("../")}} spinning={pending}/>
                <h1>디딤돌 출석 확인</h1>
                <SquareButton imgSrc={RefreshButtonImg} onClick={refresh} spinning={pending}/>
            </AttendantHeader>
            <AttendantBody>
                <AttendantContentContainer>
                    <AttendantContentHeader>
                        <AttendantListSelect onChange={onSelectChange}>
                            {
                                attendantList.map((attendant, index)=>(<option key={attendant.title} value={index}>{attendant.title}</option>))
                            }
                        </AttendantListSelect>
                    </AttendantContentHeader>
                    <AttendantContentBody>
                        {
                            selectedIndex>=0?
                            (
                                <AttendantListUl>
                                    {
                                        (attendantList[selectedIndex]?.students??[]).map(
                                            ({name, authenticatedAt}, index)=>(
                                                <li key={index}>
                                                    {`${name} / ${authenticatedAt.toLocaleString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`}
                                                </li>
                                            )
                                        )
                                    }
                                </AttendantListUl>
                            ):
                            null
                        }
                    </AttendantContentBody>
                </AttendantContentContainer>
            </AttendantBody>
        </AttendantContainer>
    )
}

export default Attendant;