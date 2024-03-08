import React, { useCallback } from "react";
import { UserInfoPageContainer } from "./Components";
import {useContext as useModalController} from "../../../Context/Modal";

function UserInfoPage({userInfo, ...props}){
    const controller = useModalController().current;
    const closeModal = useCallback(
        ()=>{
            controller?.close && controller.close();
        },
        [controller]
    )
    return (
        <UserInfoPageContainer onClose={closeModal}>
            <h2 className="name"><span>{userInfo?.isStaff?`${userInfo?.name} (Staff)`:userInfo.name}</span> On-Board</h2>
            <h3 className="label">가입번호</h3>
            <h1 className="AAANo">{userInfo?.aaaNo}</h1>
        </UserInfoPageContainer>
    )
}
export default UserInfoPage;