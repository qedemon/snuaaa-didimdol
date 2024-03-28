/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const MessageBoxContainerCSS = css`
    width: 346px;
    background-color: white;
    position: relative;
    display: grid;
    padding: 48px 32px 28px 32px;
    
    align-items: center;
    justify-items: center;
    gap: 28px;

    & p{
        margin: 0px;
        font-size: 21px;
        font-weight: 600;
        line-height: 32px;
        text-align: center;
        color: rgba(34, 40, 136, 1);
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