import React, { useCallback, useRef, useState } from "react";
import { LoginPageContainer, LoginPageContentContainer } from "./Components";
import { useNavigate } from "react-router-dom";
import {useContext as useModalController} from "../../../Context/Modal";
import { Form, LaunchButton } from "../../../Components";
import FormSchema from "./FormSchema";
import request from "../../../Utility/Connection";
import {useContext as useAuth} from "../../../Context/Auth";

function LoginPage({returnPath="/", ...props}){
    const controller = useModalController().current;
    const auth = useAuth();
    const navigate = useNavigate()
    const formController = useRef();
    const [loginState, setLoginState] = useState("로그인");
    const onSubmit = useCallback(
        async ()=>{
            const loginInfo = await formController.current.getValues();
            if(["id", "password"].map((key)=>loginInfo[key]).every(({validation: result})=>result)){
                try{
                    setLoginState("로그인 중...")
                    const {data} = await request.post("/authenticate/", 
                        {
                            id: loginInfo.id.value,
                            password: loginInfo.password.value
                        }
                    );
                    if(data?.authenticated){
                        const {token} = data;
                        setLoginState("로그인 완료");
                        controller.close();
                        setTimeout(()=>{
                            auth.setToken(token);
                            navigate(returnPath);
                        }, 250)
                    }
                }
                catch(error){
                    setLoginState("로그인 실패");
                }
            }
        },
        [formController, auth, controller, navigate, returnPath]
    )
    return (
        <LoginPageContainer>
            <p className="title">나의 AAA</p>
            <p className="title">가입번호 조회</p>
            <LoginPageContentContainer>
                <h1>2024 AAA 가입폼을 작성한 회원만 동아리 가입번호를 조회 할 수 있습니다. </h1>
                <p>※ 디딤돌 수강 및 인준 조건을 맞추지 않으신 회원은 아직 <span>정회원</span>이 아님을 알려드립니다.</p>
                <Form ref={formController} formSchema={FormSchema} className="content"/>
                <LaunchButton onClick={onSubmit}>{loginState}</LaunchButton>
            </LoginPageContentContainer>
        </LoginPageContainer>
    )
}

export default LoginPage;