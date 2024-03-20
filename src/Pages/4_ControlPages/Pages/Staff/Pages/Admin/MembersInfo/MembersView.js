import React, { useCallback, useEffect, useState } from "react";
import { MembersViewTable } from "./Components";

function MembersView({members=[], onChange}){
    const [membersState, setMembersState] = useState(members);
    const onCheckBoxChanged = useCallback(
            (id, key)=>(typeof(onChange)==="function")?
                (e)=>{
                    onChange(id, key, e.target.checked);
                }:
                ()=>{
                    
                }
        ,
        [onChange]
    );
    const onCheckBoxClicked = useCallback(
        (index, key)=>(e)=>{
            setMembersState(
                [
                    ...membersState.slice(0, index),
                    {
                        ...membersState[index],
                        [key]: e.target.checked
                    },
                    ...membersState.slice(index+1)
                ]
            );
        },
        [membersState, setMembersState]
    )
    useEffect(
        ()=>{
            setMembersState(members);
        },
        [members]
    );

    return (
        <MembersViewTable>
            <tbody>
                <tr>
                    <th>가입 번호</th>
                    <th>이름</th>
                    <th>아이디</th>
                    <th>전화번호</th>
                    <th>이메일</th>
                    <th>과정</th>
                    <th>입학년도</th>
                    <th>전공</th>
                    <th>가입비 납부</th>
                    <th>입금자명</th>
                </tr>
                {
                    membersState.map(
                        ({aaaNo, name, id, mobile, email, course, schoolNo, major, paid, depositor}, index)=>{
                            return (
                                <tr key={index}>
                                    <td>{aaaNo}</td>
                                    <td>{name}</td>
                                    <td>{id}</td>
                                    <td>{mobile}</td>
                                    <td>{email}</td>
                                    <td>{course}</td>
                                    <td>{schoolNo}</td>
                                    <td>{major}</td>
                                    <td>
                                        <input type="checkbox" checked={paid} onClick={onCheckBoxClicked(index, "paid")} onChange={onCheckBoxChanged(id, "paid")} title=""/>
                                    </td>
                                    <td>{depositor}</td>
                                </tr>
                            )
                        }
                    )
                }
            </tbody>
        </MembersViewTable>
    )
}

export default MembersView;