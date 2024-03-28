import React from "react";
import { StaffHomeBody, StaffHomeContainer, StaffHomeHeader, StaffHomeIcon, StaffHomeIconContainer } from "./Components";
import {useContext as useAuth} from "../../../../Context/Auth";
import {useContext as useModalController} from "../../../../Context/Modal";
import getIcons from "./getIcons";
import { useNavigate } from "react-router-dom";

function Home(){
    const auth = useAuth();
    const navigate = useNavigate();
    const modalController = useModalController().current;
    const icons = getIcons({auth, navigate, modalController});

    return (
        <StaffHomeContainer>
            <StaffHomeHeader>
                <h1>Staff Home</h1>
            </StaffHomeHeader>
            <StaffHomeBody>
                <StaffHomeIconContainer>
                    {
                        icons.map(
                            (iconInfo, index)=>{
                                return (
                                    <StaffHomeIcon key={index}>
                                        <img src={iconInfo.img} alt={iconInfo.label} onClick={iconInfo.callback} />
                                        <label>{iconInfo.label}</label>
                                    </StaffHomeIcon>
                                )
                            }
                        )
                    }
                </StaffHomeIconContainer>
            </StaffHomeBody>
        </StaffHomeContainer>
    )
}

export default Home;