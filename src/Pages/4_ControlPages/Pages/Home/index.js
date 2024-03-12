import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Background, ContentContainer, LaunchButton, LinkMessage, MenuContainer, TitleMessage } from "./Components";
import { ReactComponent as Rocket } from "./Assets/Rocket.svg";
import {useContext as useModalController} from "../../Context/Modal";
import {useContext as useAuth} from "../../Context/Auth";
import UserInfoPage from "./UserInfoPage";
import {QRPage} from "../Modal";

function Home({path, userInfoOpen, ...props}){
    const navigate = useNavigate();
    const auth = useAuth();
    const modalController = useModalController().current;
    const openUserInfo = useCallback(
        ()=>{
            if(auth?.authorized){
                modalController.setChildren(
                    {
                        component: UserInfoPage,
                        props: {
                            userInfo: auth.userInfo
                        }
                    }
                );
                modalController.open();
            }
            else{
                navigate("/login")
            }
        },
        [modalController, auth, navigate]
    );
    /*const login = useCallback(
        ()=>{
            modalController.setChildren(
                {
                    component: LoginPage,
                    props: {
                        returnPath: "/"
                    }
                }
            );
            modalController.open();
        },
        [modalController]
    )*/
    const logout = useCallback(
        ()=>{
            auth.logout();
            navigate("/");
        },
        [auth, navigate]
    )

    const openQR = useCallback(
        ()=>{
            if(auth?.authorized){
                modalController.setChildren(
                    {
                        component: QRPage,
                        props: {
                            userInfo: auth.userInfo
                        }
                    }
                );
                modalController.open();
            }
            else{
                navigate("/login")
            }
        },
        [auth, modalController, navigate]
    )

    useEffect(
        ()=>{
            if(userInfoOpen){
                openUserInfo();
            }
            else{
                modalController.close();
            }
        },
    )
    useEffect(
        ()=>{
            console.log(`last edit: ${process.env.REACT_APP_LAST_EDIT}`);
        },
        []
    )
    return (
        <Background>
            <ContentContainer>
                <Rocket/>
                <TitleMessage>별의 세계로 떠나 볼까요?</TitleMessage>
                <LinkMessage>{`AAA 2024 신입생 가입하기${process.env.REACT_APP_TEST?" 테스트":""}`}</LinkMessage>
                <MenuContainer>
                    {
                        auth?.userInfo?
                        (
                            <>
                                <LaunchButton onClick={openUserInfo}>가입번호 조회</LaunchButton>
                                {
                                    auth?.userInfo?.isAdmin?
                                    (
                                        <>
                                            <Link to="Admin">
                                                <LaunchButton>가입 현황</LaunchButton>
                                            </Link>
                                            <LaunchButton onClick={openQR}>QR코드 생성</LaunchButton>
                                        </>
                                    ):
                                    null
                                }
                                <LaunchButton onClick={logout}>로그아웃</LaunchButton>
                                <Link to="/enroll">
                                    <LaunchButton className="blue">디딤돌 신청하기</LaunchButton>
                                </Link>
                            </>
                        )
                        :
                        (
                            <>
                                <Link to="Register">
                                    <LaunchButton>가입하기</LaunchButton>
                                </Link>
                            </>
                        )
                    }
                </MenuContainer>
                
            </ContentContainer>
        </Background>
    )
}

export default Home;