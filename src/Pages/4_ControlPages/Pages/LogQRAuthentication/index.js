import React, { useCallback, useEffect, useState } from "react";
import {useContext as useAuth} from "../../Context/Auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Background, LogQRAuthenticationContainer } from "./Components";
import request from "../../Utility/Connection";
import { LaunchButton } from "../../Components";

function LogQRAuthentication(props){
    const navigate = useNavigate();
    const auth = useAuth();
    //const modalController = useModalController().current;
    const params = useParams();
    const authenticationId = params?.authenticationId;
    const [qrAuthentication, setQRAuthentication] = useState()
    useEffect(
        ()=>{
            console.log(auth);
            if(!auth?.authorized){
                navigate("/login");
                return;
            }
            (
                async ()=>{
                    const {data} = await request.get(`qrAuthentication/getQRAuthentication/${authenticationId}`);
                    if(data){
                        const {qrAuthentication, error} = data;
                        if(error){
                            setQRAuthentication(null);
                        }
                        else{
                            setQRAuthentication(qrAuthentication);
                        }
                    }
                }
            )();
        },
        [auth, authenticationId, navigate]
    )

    const logQRAuthentication = useCallback(
        ()=>{
            (
                async ()=>{
                    const {data} = await request.post(`qrAuthentication/logQRAuthentication`, {authenticationId});
                    if(data){
                        const {qrAuthenticationLog} = data;
                        if(!qrAuthenticationLog){
                            alert("인증 실패");
                        }
                        else{
                            alert(qrAuthenticationLog.message);
                        }
                    }
                }
            )();
        },
        [authenticationId]
    )

    return (
        <Background>
            <LogQRAuthenticationContainer>
                {
                    qrAuthentication?
                        (
                            <>
                                <h2><span>{auth.userInfo.name}</span> {`(${auth.userInfo.major})`}</h2>
                                <h1>{qrAuthentication.context.title}</h1>
                            </>
                        ):
                        qrAuthentication===null?
                            (
                                <h1>뭔가 잘못되었습니다.</h1>
                            ):
                            (
                                <h1>QR 정보를 불러우는 중.</h1>
                            )
                }
                <LaunchButton onClick = {logQRAuthentication} className="blue">참석하기</LaunchButton>
                <Link to="/">
                    <LaunchButton className="blue">홈으로</LaunchButton>
                </Link>
            </LogQRAuthenticationContainer>
        </Background>
    )
}

export default LogQRAuthentication;