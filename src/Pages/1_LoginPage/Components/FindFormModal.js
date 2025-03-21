import style from "./FindFormModal.module.css";
import loginFormStyle from "./LoginForm.module.css";

import Modal from "@components/Modal";
import Button from "@components/Button";
import Input from "@/Components/Input";
import axios from "@connections/NovaConnection";
import { useCallback, useRef, useState } from "react";
import useAsync from "@/Hooks/useAsync";

async function findId(name, email, log){
    log(`아이디를 찾는 중...`)
    const response = await axios.get(`/user/findId/${name}/${email}`, false);
    if(response?.data?.user){
        log(`아이디는 "${response.data.user.id}"입니다.`);
    }
    else{
        log("아이디를 찾는 데에 실패하였습니다.")
    }
}

async function resetPassword(id, name, email, log){
    log(`비밀번호 초기화를 요청중...`);
    const response = await axios.post("/user/remoteResetPassword", {id, name, email}, false);
    if(response?.data?.sendEmail){
        log("이메일을 보냈습니다.");
    }
    else{
        log("비밀번호 초기화 실패");
    }
}

function FindIdForm({onChange}){
    return (
        <>
            <div className={style.inputContainer}>
                <label className={style.loginLabel}>이름</label>
                <Input
                    className={`${loginFormStyle.loginInput} ${style.input}`}
                    name="name"
                    placeholder="이름"
                    onChange={onChange}
                />
            </div>
            <div className={style.inputContainer}>
                <label className={style.loginLabel}>이메일</label>
                <Input
                    className={`${loginFormStyle.loginInput} ${style.input}`}
                    name="email"
                    placeholder="E-mail"
                    onChange={onChange}
                />
            </div>
        </>
    )
}

function FindPasswordForm({onChange}){
    return (
        <>
            <div className={style.inputContainer}>
                <label className={style.loginLabel}>아이디</label>
                <Input
                    className={`${loginFormStyle.loginInput} ${style.input}`}
                    name="id"
                    placeholder="ID"
                    onChange={onChange}
                />
            </div>
            <div className={style.inputContainer}>
                <label className={style.loginLabel}>이름</label>
                <Input
                    className={`${loginFormStyle.loginInput} ${style.input}`}
                    name="name"
                    placeholder="이름"
                    onChange={onChange}
                />
            </div>
            <div className={style.inputContainer}>
                <label className={style.loginLabel}>이메일</label>
                <Input
                    className={`${loginFormStyle.loginInput} ${style.input}`}
                    name="email"
                    placeholder="E-mail"
                    onChange={onChange}
                />
            </div>
        </>
    )
}

function FindFormModal({onClose, ...props}){
    const [selectedMode, setSelectedMode] = useState("id");
    const userData = useRef({});
    const [message, setMessage] = useState("");

    const onSelectButtonClick = useCallback(
        (mode)=>()=>{
            setSelectedMode(mode);
            userData.current={};
        },
        [userData, setSelectedMode]
    )

    const onChange = useCallback(
        ({name, value})=>{
            userData.current[name]=value;
        },
        [userData]
    );

    const [pending, error, onSubmit] = useAsync(
        selectedMode==="id"?
        async ()=>{
            const {name, email} = userData.current;
            return await findId(name, email, setMessage);
        }:
        async ()=>{
            const {id, name, email} = userData.current;
            return await resetPassword(id, name, email, setMessage);
        }
    );

    return (
        <Modal className={style.findFormModal}>
            <div className={style.header}>
                <Button 
                    className={
                        selectedMode==="id"?
                        [
                            style.selectButton,
                            style.selected
                        ].join(" "):
                        style.selectButton
                    } 
                    onClick={onSelectButtonClick("id")}
                >
                    아이디 찾기
                </Button>
                <Button 
                    className={
                        selectedMode==="password"?
                        [
                            style.selectButton,
                            style.selected
                        ].join(" "):
                        style.selectButton
                    } 
                    onClick={onSelectButtonClick("password")}
                >
                    비밀번호 찾기
                </Button>
            </div>
            <div className={style.body}>
                {
                    selectedMode==="id"?
                        (<FindIdForm onChange={onChange}/>):
                        (<FindPasswordForm onChange={onChange}/>)
                }
                <div className={style.messageContainer}>
                    {
                        ((str)=>str===""?" ":str)(message||(error?.message??""))
                    }
                </div>
            </div>
            <div className={style.footer}>
                <div className={style.footerButtonContainer}>
                    <Button className={`${style.footerButton } ${style.Cancel}`} onClick={onClose}>Cancel</Button>
                    <Button className={`${style.footerButton } ${style.OK}`} onClick={onSubmit} pending={pending}>OK</Button>
                </div>
            </div>
        </Modal>
    )
}

export default FindFormModal;