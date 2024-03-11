/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";
import {ReactComponent as CloseButton} from "../Assets/CloseButton.svg";
import {ReactComponent as Planet} from "../Assets/Planet.svg"

const UserInfoPageContainerCSS = css`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &>.content{
        display: grid;
        grid-template-rows: auto 84px 54px 68px;
        align-items: end;
        &>*{
            margin: 0px;
        }
        &>.name{
            color: white;
            font-size: 24px;
            font-weight: 700;
            line-height: 36px;
            letter-spacing: 0em;
            text-align: center;
            &>span{
                font-size: 24px;
                font-weight: 700;
                line-height: 36px;
                letter-spacing: 0em;
                text-align: center;
                text-decoration: underline;
            }
        }
        &>.label{
            color: white;
            font-size: 20px;
            font-weight: 400;
            line-height: 30px;
            letter-spacing: 0em;
            text-align: center;
        }
        &>.AAANo{
            color: white;
            font-size: 32px;
            font-weight: 700;
            line-height: 48px;
            letter-spacing: 0em;
            text-align: center;
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
    }
    &>.closeButton{
        position: absolute;
        top: 71px;
        right: 18px;
        cursor: pointer;
    }
`;

function UserInfoPageContainer({onClose, children, ...props}){
    return (
        <div css={UserInfoPageContainerCSS} {...props}>
            <div className="content">
                <Planet className="planet"/>
                {
                    children
                }
            </div>
            <CloseButton className="closeButton" onClick={onClose}/>
        </div>
    );
}
export {UserInfoPageContainer};