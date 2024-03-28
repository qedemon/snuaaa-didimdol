import React, { useCallback, useEffect, useState } from "react";
import {useContext as useAuth} from "../../Context/Auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useContext as useModalController} from "../../Context/Modal";
import { Background, LogQRAuthenticationContainer } from "./Components";
import request from "../../Utility/Connection";
import { LaunchButton } from "../../Components";
import AlertMessageBox from "../Modal/AlertBoxPage";
import useAsync from "@/Hooks/useAsync";

function LogQRAuthentication(props){
    const navigate = useNavigate();
    const auth = useAuth();
    const modalController = useModalController().current;
    const params = useParams();
    const authenticationId = params?.authenticationId;
    const [qrAuthentication, setQRAuthentication] = useState();
    const [loadingError, setLoadingError] = useState();
    useEffect(
        ()=>{
            if(!auth?.authorized){
                navigate("/login");
                return;
            }
            (
                async ()=>{
                    const {data} = await request.get(`qrAuthentication/getQRAuthenticationById/${authenticationId}`);
                    if(data){
                        const {qrAuthentication, error} = data;
                        if(error){
                            setQRAuthentication(null);
                            setLoadingError(error==="expired"?"만료된 QR입니다.":error);
                        }
                        else{
                            setQRAuthentication(qrAuthentication);
                            setLoadingError(null);
                        }
                    }
                }
            )();
        },
        [auth, authenticationId, navigate, setLoadingError, setQRAuthentication]
    )

    const logQRAuthentication = useCallback(
        async ()=>{
            const timeOut = new Promise(
                (resolve)=>{
                    setTimeout(resolve, 1000);
                }
            )
            const {data} = await request.post(`qrAuthentication/logQRAuthentication`, {authenticationId});
            if(data){
                const {qrAuthenticationLog} = data;
                if(!qrAuthenticationLog){
                    modalController.setChildren(
                        {
                            component: AlertMessageBox,
                            props: {
                                message: "인증 실패"
                            }
                        }
                    );
                    modalController.open();
                }
                else{
                    await timeOut;
                    modalController.setChildren(
                        {
                            component: AlertMessageBox,
                            props: {
                                message: qrAuthenticationLog.message
                            }
                        }
                    );
                    modalController.open();
                }
            }
        },
        [authenticationId, modalController]
    );

    const [pending, error, asyncLogQR] = useAsync(logQRAuthentication);
    console.error(error);

    return (
        <Background>
            <LogQRAuthenticationContainer spinningCharacter={pending}>
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
                                <h1>{loadingError}</h1>
                            ):
                            (
                                <h1>QR 정보를 불러우는 중.</h1>
                            )
                }
                <LaunchButton onClick = {asyncLogQR} className="blue" disabled={pending}>{pending?"참석 중":"참석하기"}</LaunchButton>
                <Link to="/">
                    <LaunchButton className="blue">홈으로</LaunchButton>
                </Link>
            </LogQRAuthenticationContainer>
        </Background>
    )
}

export default LogQRAuthentication;