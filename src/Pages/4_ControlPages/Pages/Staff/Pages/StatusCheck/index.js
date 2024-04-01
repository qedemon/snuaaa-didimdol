import React, { useEffect, useMemo, useState } from "react";
import { useContext as useAuth } from "../../../../Context/Auth";
import { useContext as useModalController } from "../../../../Context/Modal";
import { FilterButton, FinderInput, StatusCheckContainer, StatusCheckHeader, StatusCheckStudentsViewBody, StatusCheckStudentsViewContainer, StatusCheckStudentsViewHeader, StatusCheckStudentsViewItem, UserStatusView } from "./Components";
import { Link } from "react-router-dom";
import loadDidimdol from "./loadDidimdol";

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
    const auth = useAuth();
    const [students, setStudents] = useState();
    const [selectedIndex, setSelectedIndex] = useState(null);
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
            if(!students){
                (
                    async ()=>{
                        const didimdol = await loadDidimdol(auth);
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
            }
        },
        [auth, students, setStudents, setSelectedIndex]
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
            <UserStatusView user={selectedStudent}/>
            <StatusCheckStudentsViewContainer>
                <StatusCheckStudentsViewHeader>
                    <FinderInput placeholder="이름으로 찾기"/>
                    <FilterButton/>
                </StatusCheckStudentsViewHeader>
                <StatusCheckStudentsViewBody>
                    {
                        Array.isArray(students)?
                            students.map(
                                (student, index)=>{
                                    return (
                                        <StatusCheckStudentsViewItem key={index} user={student} selected={selectedIndex===index} onClick={()=>{setSelectedIndex(index)}}/>
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