/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const TitleMessageCSS = css`
    font-size: 24px;
    font-weight: 800;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: left;
    background: linear-gradient(180deg, #1658B6, #F46E5F);
    background-clip: text;
    color: transparent;

    margin: 0px;
`;
function TitleMessage({children, ...props}){
    return (
        <p css={TitleMessageCSS} {...props}>
            {children}
        </p>
    )
}
export {TitleMessage}

const LinkMessageCSS = css`
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;

    color: rgba(255, 255, 255, 1);

    margin: 0px;
    cursor: pointer;
    user-select: none;

    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;
function LinkMessage({children, props}){
    return (
        <p css={LinkMessageCSS} {...props}>
            {children}
        </p>
    )
}
export {LinkMessage}

const LogoMessageCSS = css`
    font-size: 10px;
    font-weight: 300;
    line-height: 15px;
    letter-spacing: 0em;
    text-align: center;

    color: rgba(255, 255, 255, 1);

    margin: 0px;
`
function LogoMessage({children, props}){
    return (
        <p css={LogoMessageCSS} {...props}>
            {children}
        </p>
    )
}

export {LogoMessage}