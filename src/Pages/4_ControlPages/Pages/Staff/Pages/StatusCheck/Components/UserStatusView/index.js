/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";
import StatusContentContainer from "@/Pages/3_MainPages/DashboardPage/Components/StatusContentContainer";
import statusColorlist from "../statusColorList";

const UserStatusViewContainerCSS = css`
    grid-area: user;
    width: 300px;
    border-radius: 8px;

    padding: 8px 40px;

    box-shadow: 0px 4px 4px 0px #00000040;

    display: grid;
    gap: 8px;

    &>div.userInfo{
        display: grid;
        padding: 4px 0px;
        border-width: 0px 0px 1px 0px;
        border-color: white;
        border-style: solid;
        &>h1{
            font-size: 20px;
            font-weight: 800;
            line-height: 20px;
            text-align: center;
            padding: 4px;
        }
        &>h2{
            font-size: 12px;
            font-weight: 400;
            line-height: 12px;
            text-align: center;
            padding: 4px;
        }
    }
`;

function UserStatusView({user}){
    const backgroundCSS = css`background: ${statusColorlist[user.status]??statusColorlist["녹"]};`
    return (
        <div css={[UserStatusViewContainerCSS, backgroundCSS]}>
            <div className="userInfo">
                <h1>{user.name}</h1>
                <h2>{`${user.colNo}-${user.major}`}</h2>
            </div>
            <StatusContentContainer status={user}/>
        </div>
    )
}

export default UserStatusView;