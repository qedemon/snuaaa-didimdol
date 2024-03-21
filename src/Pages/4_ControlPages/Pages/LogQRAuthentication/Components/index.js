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
        text-align: center;
    }
`;

const SpinningCharacterCSS = css`
    animation: rotation 0.5s linear infinite;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

function LogQRAuthenticationContainer({children, spinningCharacter}){
    return (
        <div css={LogQRAuthenticationContainerCSS}>
            <Character css={spinningCharacter?SpinningCharacterCSS:null}/>
            {children}
        </div>
    )
}
export {LogQRAuthenticationContainer}

export {default as Background} from "./Background";