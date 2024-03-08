import React, { useCallback, useRef, useState } from "react";
import { useContext as useModalController } from "../../../Context/Modal";
import { LaunchButton, Input } from "../../../Components";
import { MessageBoxBody, MessageBoxContainer, MessageBoxFooter, MessageBoxHeader } from "../Components/MessageBox/Components";

function DepositSubmitPage({onSubmit, ...props}){
    const controller = useModalController().current;
    const inputRef = useRef();
    const [message, setMessage] = useState("");
    const onClose = useCallback(
        ()=>{
            controller.close();
        },
        [controller]
    )
    const onSubmitHandler = useCallback(
        ()=>{
            const value = inputRef.current.value;
            if(value.length===0){
                setMessage("송금하신 예금주명을 입력해주세요.");
            }
            else{
                if(typeof(onSubmit)==="function"){
                    onSubmit(inputRef.current.value);
                }    
            }
        },
        [onSubmit]
    )
    return (
        <MessageBoxContainer onClose={onClose}>
            <MessageBoxHeader>
                <h1>
                    송금하신 계좌 <span>예금주</span>명
                </h1>
                <p>
                    입금확인용으로만 사용됩니다.
                </p>
            </MessageBoxHeader>
            <MessageBoxBody>
                <Input ref={inputRef} placeholder="송금하신 예금주명을 입력해주세요."/>
                <label>{message??"\u00A0"}</label>
            </MessageBoxBody>
            <MessageBoxFooter>
                <LaunchButton onClick={onSubmitHandler}>
                    Submit
                </LaunchButton>
            </MessageBoxFooter>
        </MessageBoxContainer>
    )
}

export default DepositSubmitPage;