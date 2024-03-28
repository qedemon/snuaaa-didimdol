import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleSheetFileView, MembersInfoContainer, MembersInfoHeader } from "./Components";
import MembersView from "./MembersView";
import request from "../../../../../Utility/Connection";

async function loadMembers(){
    return await request.get("/user/getAllUsers");
}

async function updateSheet(){
    return await request.get("/googleSheet/loadAllUsers");
}

async function updateMembers(dataToUpdate){
    return await request.post("/user/updateUsers", dataToUpdate);
}

function MembersInfo({...props}){
    const [message, setMessage] = useState("");
    const [sheetURL, setSheetURL] = useState("");
    const [members, setMembers] = useState([]);
    const dataChanged = useRef(new Map());

    const load = useCallback(
        async ()=>{
            setMessage("불러오는 중");
            loadMembers().then(
                ({data:{users, error}})=>{
                    if(error){
                        console.log(error);
                        return;
                    }

                    updateSheet().then(
                        ({data: {url, error}})=>{
                            if(error){
                                console.log(error);
                            }
                            setSheetURL(url);
                        }
                    )

                    dataChanged.current = new Map();
                    setMembers(users??[]);
                    setMessage("불러오기 완료")
                }
            )
        },
        [setMembers, setMessage, dataChanged, setSheetURL]
    )
    useEffect(
        ()=>{
            load();
        },
        [load]
    )
    const onChange = useCallback(
        (id, key, checked)=>{
            dataChanged.current.set(id, {[key]: checked});
        },
        [dataChanged]
    );
    const onSave = useCallback(
        async ()=>{
            const dataToUpdate = members.reduce(
                (result, {id, paid})=>{
                    const newPaid = dataChanged.current.get(id)?.paid;
                    return (newPaid!==undefined && newPaid!==paid)?
                    [
                        ...result,
                        {
                            id, paid: newPaid
                        }
                    ]:
                    result;
                },
                []
            );
            setMessage("저장하는 중");
            await updateMembers(dataToUpdate);
            setMessage("저장 완료");
            await load();
        },
        [members, dataChanged, load, setMessage]
    )
    console.log(sheetURL);
    return (
        <MembersInfoContainer>
            <h1>가입 현황</h1>
            <MembersInfoHeader>
                <button onClick={load}>Load</button>
                <button onClick={onSave}>Save</button>
                <label>{message}</label>
                <GoogleSheetFileView sheetPath={process.env.REACT_APP_ADMIN_SHEET}></GoogleSheetFileView>
            </MembersInfoHeader>
            <MembersView members={members} onChange={onChange}></MembersView>
        </MembersInfoContainer>
    )
}

export default MembersInfo;