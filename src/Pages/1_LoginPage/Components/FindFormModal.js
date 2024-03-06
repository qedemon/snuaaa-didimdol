import style from "./FindFormModal.module.css";
import loginFormStyle from "./LoginForm.module.css";

import Modal from "@components/Modal";
import Button from "@components/Button";
import Input from "@/Components/Input";
import axios from "@connections/NovaConnection";
import { useCallback, useRef, useState } from "react";
import useAsync from "@/Hooks/useAsync";

async function findId(name, email, log){
    const response = await axios.get(`/user/findId/${name}/${email}`, false);
    if(response?.data?.user){
        log(`아이디는 "${response.data.user.id}"입니다.`);
    }
    else{
        log("아이디를 찾는 데에 실패하였습니다.")
    }
}

function FindIdForm({onChange}){
    return (
        <>
            <label className={loginFormStyle.loginLabel}>이름</label>
            <Input
                className={loginFormStyle.loginInput}
                name="name"
                placeholder="이름"
                onChange={onChange}
            />
            <label className={loginFormStyle.loginLabel}>이메일</label>
            <Input
                className={loginFormStyle.loginInput}
                name="email"
                placeholder="E-mail"
                onChange={onChange}
            />
        </>
    )
}

function FindPasswordForm({onChange}){
    return (
        <>
            <label className={loginFormStyle.loginLabel}>이름</label>
            <Input
                className={loginFormStyle.loginInput}
                name="id"
                placeholder="ID"
                onChange={onChange}
            />
            <label className={loginFormStyle.loginLabel}>이름</label>
            <Input
                className={loginFormStyle.loginInput}
                name="name"
                placeholder="이름"
                onChange={onChange}
            />
            <label className={loginFormStyle.loginLabel}>이메일</label>
            <Input
                className={loginFormStyle.loginInput}
                name="email"
                placeholder="E-mail"
                onChange={onChange}
            />
        </>
    )
}

function FindFormModal({onClose, ...props}){
    const [selectedMode, setSelectedMode] = useState("id");
    const userData = useRef({});
    const [message, setMessage] = useState("");
    

    const onChange = useCallback(
        ({name, value})=>{
            userData.current[name]=value;
        },
        [userData]
    );

    const [pending, error, onSubmit] = useAsync(
        selectedMode==="id"?
        async ()=>{
            return await findId(userData.current.name, userData.current.email, alert);
        }:
        ()=>{
            return new Promise(
                (resolve)=>{
                    console.log(userData.current)
                    setTimeout(
                        ()=>{
                            resolve(true)
                        },
                        1000
                    )
                }
            )
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
                    onClick={()=>{setSelectedMode("id")}}
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
                    onClick={()=>{setSelectedMode("password")}}
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
            </div>
            <div className={style.footer}>
                <div className={style.footerMessageContainer}>
                    {((error?.message)??"")||message}
                </div>
                <div className={style.footerButtonContainer}>
                    <Button className={`${style.footerButton } ${style.Cancel}`} onClick={onClose}>Cancel</Button>
                    <Button className={`${style.footerButton } ${style.OK}`} onClick={onSubmit} pending={pending}>OK</Button>
                </div>
            </div>
        </Modal>
    )
}

export default FindFormModal;