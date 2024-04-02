import React, { useCallback } from "react";
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

    const logout = useCallback(
        ()=>{
            auth.logout();
            navigate("/login");
        },
        [auth]
    )

    return (
        <StaffHomeContainer>
            <StaffHomeHeader>
                <h1>안녕하세요 <b>{auth?.userInfo?.name}</b> 님</h1>
                <h2>Welcome to Amateur Astronomy Association</h2>
                <div className="logout" onClick={logout}>
                    <label>Log out</label>
                </div>
            </StaffHomeHeader>
            <StaffHomeBody>
                <StaffHomeIconContainer>
                    {
                        icons.map(
                            (iconInfo, index)=>{
                                return (
                                    <StaffHomeIcon key={index} onClick={iconInfo.callback}>
                                        <div>
                                            {
                                                iconInfo.img?
                                                    <img src={iconInfo.img} alt={iconInfo.label} />:
                                                    null
                                            }
                                            {
                                                iconInfo.svg?
                                                    <iconInfo.svg/>:
                                                    null
                                            }
                                        </div>
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