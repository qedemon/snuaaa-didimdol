import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useContext as useAuth } from "../../../../Context/Auth";
import { useContext as useModalController } from "../../../../Context/Modal";
import { FilterButton, FinderInput, StatusCheckContainer, StatusCheckDidimdolClassSelector, StatusCheckHeader, StatusCheckStudentsViewBody, StatusCheckStudentsViewContainer, StatusCheckStudentsViewHeader, StatusCheckStudentsViewItem, UserStatusView } from "./Components";
import { Link } from "react-router-dom";
import loadDidimdol from "./loadDidimdol";
import SelectFilter from "./Components/SelectFilter";

const mockData = {
    name: "김이름",
    major: "아마추어천문학부",
    colNo: "24",
    status: "녹",
    numSaveCount: 0,
    numClasses: 0,
    numAssoc: 0,
    isPracAccepted: false,
    statusText: "디딤돌 수강신청을 환영해요!",
};

function StatusCheck(){
    const searchInputRef = useRef();
    const auth = useAuth();
    const [targetDidimdolClassId, setTargetDidimdolClassId] = useState();
    const [belongs, setBelongs] = useState([]);
    const onDidimdolClassSelectChange = useCallback(
        ({target: {value}})=>{
            setTargetDidimdolClassId(value);
        },
        [setTargetDidimdolClassId]
    )
    useEffect(
        ()=>{
            const belongs = (auth.userInfo?.didimdolClass?.belongs??[]).filter(({role})=>["lecturer", "assistant"].includes(role)).sort((A, B)=>A.didimdolClass.title-B.didimdolClass.title);
            setBelongs(belongs);
            if(Array.isArray(belongs) && belongs.length>0){
                setTargetDidimdolClassId(belongs[0].didimdolClass._id);
            }
        },
        [auth, setBelongs, setTargetDidimdolClassId]
    )

    const modalController = useModalController().current;
    const [students, setStudents] = useState();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [filter, setFilter] = useState(
        {
            name: "",
            status: ["적", "황", "녹", "회"]
        }
    );
    const filterFunction = useCallback(
        (student)=>{
            return student.name.includes(filter.name) && filter.status.includes(student.status);
        },
        [filter]
    )
    const onSearchNameChange = useCallback(
        (event)=>{
            const name = event.target.value;
            setFilter((filter)=>({...filter, name}));
        },
        [setFilter]
    )
    const onFilterButtonClick = useCallback(
        ()=>{
            modalController.setChildren(
                {
                    component: SelectFilter,
                    props: {
                        filter: {
                            status: [{key: "적", label: "위험"}, {key: "황", label: "경고"}, {key: "녹", label: "안전"}, {key: "회", label: "인준 불가"}].map(
                                ({key, label})=>(
                                    {
                                        key,
                                        label,
                                        selected: filter.status.includes(key),
                                    }
                                )
                            )
                        },
                        onSelect: (value)=>{
                            setFilter((filter)=>({...filter, status: value.status.reduce((result, {key, selected})=>selected?[...result, key]:result, [])}));
                            modalController.close();
                        }
                    }
                }
            );
            modalController.open();
        },
        [modalController, filter]
    )
    /*const updateStudents = useCallback(
        (index, update)=>{
            setStudents(
                (students)=>{
                    return Array.isArray(students)?
                        [
                            ...students.slice(0, index),
                            typeof(update)==="function"?
                                update(students[index]):
                                update,
                            ...students.slice(index+1)
                        ]:
                        students
                }
            )
        },
        [setStudents]
    )*/

    const selectedStudent = useMemo(
        ()=>{
            if(Array.isArray(students) && selectedIndex!==null){
                return students[selectedIndex];
            }
            else{
                return mockData;
            }
        },
        [students, selectedIndex]
    )
    useEffect(
        ()=>{

            (
                async ()=>{
                    const didimdol = await loadDidimdol(targetDidimdolClassId);
                    if(didimdol?.students){
                        const students = didimdol.students.map(
                            ({name, major, colNo, attendant}, index)=>{

                                return {
                                    ...mockData,
                                    name,
                                    major,
                                    colNo,
                                    index,
                                    ...(
                                        (attendantInfo)=>{
                                            if(!attendantInfo){
                                                return {};
                                            }
                                            const {status, absent: numClasses, shield: numSaveCount, numAssoc, support, message: statusText, license: isPracAccepted} = attendantInfo;
                                            return {
                                                status, numClasses, numSaveCount, numAssoc, support, statusText, isPracAccepted
                                            }
                                        }
                                    )(attendant?.info)
                                }
                            }
                        );
                        setStudents(students);
                        if(Array.isArray(students)){
                            setSelectedIndex(0);
                        }
                    }
                }
            )();
        },
        [targetDidimdolClassId, setStudents, setSelectedIndex]
    )

    return (
        <StatusCheckContainer>
            <StatusCheckHeader>
                <h1 className="title">우리 조 <b>인준 현황</b></h1>
                <h2 className="logo">Welcome to Amateur Astronomy Association</h2>
                <div className="homeLink">
                    <Link to="/">Home</Link>
                </div>
            </StatusCheckHeader>
            {
                (Array.isArray(belongs) && belongs.length>1)?
                (
                    <StatusCheckDidimdolClassSelector onChange={onDidimdolClassSelectChange} defaultValue={targetDidimdolClassId}>
                        {
                            belongs.map(({didimdolClass: {_id, daytime, title}})=>(<option key={_id} value={_id}>{`${title}조 ${daytime.day}요일 ${daytime.start}`}</option>))
                        }
                    </StatusCheckDidimdolClassSelector>
                ):null
            }
            <UserStatusView user={selectedStudent}/>
            <StatusCheckStudentsViewContainer>
                <StatusCheckStudentsViewHeader>
                    <FinderInput ref={searchInputRef} placeholder="이름으로 찾기" onChange={onSearchNameChange}/>
                    <FilterButton onClick={onFilterButtonClick}/>
                </StatusCheckStudentsViewHeader>
                <StatusCheckStudentsViewBody>
                    {
                        Array.isArray(students)?
                            students.filter(filterFunction).map(
                                (student, index)=>{
                                    return (
                                        <StatusCheckStudentsViewItem key={index} user={student} selected={selectedIndex===student.index} onClick={()=>{setSelectedIndex(student.index)}}/>
                                    )
                                }
                            ):
                            null
                    }
                </StatusCheckStudentsViewBody>
            </StatusCheckStudentsViewContainer>
        </StatusCheckContainer>
    )
}

export default StatusCheck;