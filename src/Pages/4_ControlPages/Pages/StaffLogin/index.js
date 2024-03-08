import React, {useState, useCallback, useRef} from "react";
import { Container, Input, Button, Message } from "./Components";
import request from "../../Utility/Connection";
import { setCookie } from "../../Utility/Cookie";

const States = {
    init: 0,
    fetching: 1,
    success: 2,
    fail: 3
}

function getMessageFromState(state){
    if(state===States.success){
        return "로그인 성공";
    }
    if(state===States.fail){
        return "로그인 실패";
    }
    if(state===States.fetching){
        return "로그인 중";
    }
    return "로그인 계정은 our.snuaaa.net 계정과 연동됩니다."
}

function StaffLogin(){
    const [loginState, setLoginState] = useState(States.init);
    const idRef = useRef();
    const passwordRef = useRef();
    const onLoginClicked = useCallback(
        ()=>{
            setLoginState(States.fetching);
            const id = idRef.current.value;
            const password = passwordRef.current.value;
            (
                async (id, password)=>{
                    try{
                        const {data} = await request.post("/authenticate/", {id, password});
                        if(data?.authenticated){
                            const {token} = data;
                            setCookie("token", token);
                            setLoginState(States.success);
                            setTimeout(()=>{
                                console.log("home");
                                window.location.replace("/");
                            }, 250)
                        }
                    }
                    catch(error){
                        setLoginState(States.fail);
                    }
                }
            )(id, password)
        },
        [idRef, passwordRef]
    )
    return (
        <>
            <h2>AAA - 디딤돌 Staff Login</h2>
            <Container>
                <Input ref={idRef} className="id" id="userId" type="text" placeholder="아이디"/>
                <Input ref={passwordRef} className="password" id="password" type="password" placeholder="비밀번호"/>
                <Button onClick={onLoginClicked}>로그인</Button>
                <Message>{getMessageFromState(loginState)}</Message>
            </Container>
        </>
    )
}

export default StaffLogin;