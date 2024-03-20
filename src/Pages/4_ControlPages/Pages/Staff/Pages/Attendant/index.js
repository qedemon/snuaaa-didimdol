import React from 'react';
import { AttendantBody, AttendantContainer, AttendantHeader } from './Components';
import { SquareButton } from '../../Components';
import HomeButtonImg from "../../Assets/home.png";
import RefreshButtonImg from "../../Assets/refresh.png"
import { useNavigate } from 'react-router-dom';
import {useContext as useAuth} from "../../../../Context/Auth";
import {useContext as useModalController} from "../../../../Context/Modal";

function Attendant(){
    const navigate = useNavigate();
    const auth = useAuth();
    console.log(auth?.userInfo);
    return (
        <AttendantContainer>
            <AttendantHeader>
                <SquareButton imgSrc={HomeButtonImg} onClick={()=>{navigate("../")}}/>
                <h1>디딤돌 출석 확인</h1>
                <SquareButton imgSrc={RefreshButtonImg}/>
            </AttendantHeader>
            <AttendantBody>

            </AttendantBody>
        </AttendantContainer>
    )
}

export default Attendant;