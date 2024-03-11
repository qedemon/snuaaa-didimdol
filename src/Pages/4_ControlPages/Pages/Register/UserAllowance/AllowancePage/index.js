import React, { useCallback, useEffect, useState } from "react";
import { AllowancePageContainer } from "./Component";
import AllowanceTextPath from "./Assets/allowanceText.txt";
import axios from "axios";
import {useContext as useModalController} from "../../../../Context/Modal";

function AllowancePage({...props}){
    const controller = useModalController().current;
    const [allowanceText, setAllowanceText] = useState("");
    const onClose = useCallback(
        ()=>{
            controller.close();
        },
        [controller]
    )
    useEffect(
        ()=>{
            axios.get(AllowanceTextPath).then(
                ({data})=>{
                    setAllowanceText(data);
                }
            )
        },
        [setAllowanceText]
    )
    return (
        <AllowancePageContainer onClose={onClose}>
            <h1 className="title">개인정보 수집 및 이용동의</h1>
            <pre className="content">{allowanceText}</pre>
        </AllowancePageContainer>
    )
}
export default AllowancePage;