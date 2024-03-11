/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";
import { ReactComponent as Character } from "../Assets/character.svg";

const LogQRAuthenticationContainerCSS = css`
    display: grid;
    gap: 16px;
    justify-items: center;
    & h1, & h2{
        margin: 0px;
    }
    & h2{
        color: rgba(34, 40, 136, 1);
        font-size: 24px;
        font-weight: 600;
        line-height: 36px;
        letter-spacing: 0em;
        text-align: center;
        &>span{
            color: rgba(247, 201, 119, 1);
        }
    }
    & h1{
        margin-bottom: 32px;
        color: rgba(34, 40, 136, 1);
        font-size: 32px;
        font-weight: 600;
        line-height: 48px;
        letter-spacing: 0em;
        text-align: right;
    }
`;
function LogQRAuthenticationContainer({children}){
    return (
        <div css={LogQRAuthenticationContainerCSS}>
            <Character/>
            {children}
        </div>
    )
}
export {LogQRAuthenticationContainer}

export {default as Background} from "./Background";