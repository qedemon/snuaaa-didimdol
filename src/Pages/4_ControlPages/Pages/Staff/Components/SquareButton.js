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
`;

function SquareButton({onClick, css, imgSrc}){
    return (
        <button css={[SquareButtonCSS, ...Array.isArray(css)?css:[css]]} onClick={onClick}>
            <img src={imgSrc} alt="Home"/>
        </button>
    )
}

export default SquareButton;