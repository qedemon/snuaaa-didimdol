import React, {useEffect, useCallback} from "react";
import Auth from "../../Context/Auth";
import { setCookie } from "../../Utility/Cookie";

function Home(){
    const auth = Auth.useContext();
    const userInfo = auth?.authorized?
        auth.userInfo:
        {};
    useEffect(
        ()=>{
            if(!auth?.authorized){
                window.location.replace("/Login");
            }
        },
        [auth]
    );
    const onLogoutClicked = useCallback(
        ()=>{
            setCookie("token", "", Date.now());
            window.location.reload();
        },
        []
    );
    return (
        <div>
            <h2>
                Didimdol.Nova
            </h2>
            {
                auth?.authorized?
                (   
                    <>
                    <div>{`${userInfo.name}`}</div>
                    <div>{`${userInfo.colNo} / ${userInfo.major}`}</div>
                    <div>{`${userInfo.aaaNo}`}</div>
                    <div>{`${userInfo.email}`}</div>
                    <div>{`${auth?.authorized?"협조해 주시어 감사합니다.":"로그인으로 이동"}`}</div>
                    </>
                ):
                (
                    <></>
                )
            }
            <div>
                <button onClick={onLogoutClicked}>Logout</button>
            </div>
        </div>
    )
}

export default Home;