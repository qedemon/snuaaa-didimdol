/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const SquareButtonCSS = css`
    height: 50px;
    max-height: calc(100% - 8px);
    aspect-ratio: 1 / 1;
    padding: 0px;
    background: none;
    border: 0px;
    &>img{
        width: 100%;
        height: 100%;
    }
    &.spinning>img{
        animation: rotation 1s linear infinite;
        @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(-360deg);
            }
        }
    }
`;

function SquareButton({onClick, css, imgSrc, spinning}){
    return (
        <button css={[SquareButtonCSS, ...Array.isArray(css)?css:[css]]} className={spinning?"spinning":""} onClick={onClick}>
            <img src={imgSrc} alt="Home"/>
        </button>
    )
}

export default SquareButton;