/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const MessageBoxContainerCSS = css`
    width: 346px;
    background-color: white;
    position: relative;
    display: grid;
    padding: 48px 32px 16px 32px;
    
    align-items: center;
    justify-items: center;
    gap: 32px;

    & p{
        margin: 0px;
        font-size: 21px;
        font-weight: 400;
        line-height: 32px;
        text-align: center;
    }
`;

function MessageBoxContainer({children}){
    return (
        <div css={MessageBoxContainerCSS}>
            {children}
        </div>
    )
}

export {MessageBoxContainer};