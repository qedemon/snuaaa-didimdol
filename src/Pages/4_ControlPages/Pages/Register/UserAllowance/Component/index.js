/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";
import {ReactComponent as More} from "../Assets/moreButton.svg";

const MoreButtonCSS = css`
    height: 24px;
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
function MoreButton({className, ...props}){
    return (
        <div css={MoreButtonCSS} className={className}{...props}>
            <More/>
        </div>
    )
}
export {MoreButton}

const UserAllowanceContainerCSS = css`
    width: 100%;
    display: flex;
    padding: 0px 20px;
    &>.left{
        flex-grow: 1;
    }
`;
function UserAllowanceContainer({children, ...props}){
    return (
        <div css={UserAllowanceContainerCSS} {...props}>
            {children}
        </div>
    )
}
export {UserAllowanceContainer}