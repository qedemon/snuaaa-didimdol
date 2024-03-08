/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const ChangePasswordContainerCSS = css`
    width: 100%;
    display: grid;
    gap: 16px;
    justify-items: center;
`;
function ChangePasswordContainer({children}){
    return (
        <div css={ChangePasswordContainerCSS}>
            {children}
        </div>
    )
}
export {ChangePasswordContainer}

const ChangePasswordFormContainerCSS = css`
    min-width: 250px;
    width: 80%;
`;
function ChangePasswordFormContainer({children}){
    return (
        <div css={ChangePasswordFormContainerCSS}>
            {children}
        </div>
    )
}
export {ChangePasswordFormContainer};

export {default as Background} from "./Background";