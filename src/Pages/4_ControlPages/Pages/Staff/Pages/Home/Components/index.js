/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const StaffHomeContainerCSS = css`
    width: 100%;
    height: 100%;
    display: grid;
    padding: 8px 16px;
    gap: 24px;
    grid-template-areas: 
        "header"
        "body"
        "footer";
    grid-template-rows: 40px 1fr 40px;
`;
function StaffHomeContainer({children}){
    return (
        <div css={StaffHomeContainerCSS}>
            {children}
        </div>
    )
}
export {StaffHomeContainer};

const StaffHomeHeaderCSS = css`
    grid-area: header;
    display: grid;
    position: relative;
    &>h1{
        padding: 4px 8px;
        font-family: NIXGONFONTS V2.0;
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
        text-align: left;
        &>b{
            fornt-weight: 800
        }
    }
    &>h2{
        padding: 4px 8px;
        font-family: NIXGONFONTS V2.0;
        font-size: 12px;
        font-weight: 400;
        line-height: 12px;
        text-align: left;
        color: #A5A5A5;
    }
    &>div.logout{
        position: absolute;
        top: 3px;
        right: 0px;
        font-size: 12px;
        font-weight: 600;
        line-height: 12px;
        color: var(--blue-primary);
    }
`;
function StaffHomeHeader({children}){
    return (
        <div css={StaffHomeHeaderCSS}>
            {children}
        </div>
    )
}
export {StaffHomeHeader};

const StaffHomeBodyCSS = css`
    grid-area: body;
    display: grid;
    padding: 0px 20px;
    justify-items: center;
    align-items: start;
`;
function StaffHomeBody({children}){
    return (
        <div css={StaffHomeBodyCSS}>
            {children}
        </div>
    )
}
export {StaffHomeBody};


const StaffHomeIconContainerCSS = css`
    width: 100%;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(4, 1fr);
    @media (max-aspect-ratio: 2/3) {
        grid-template-rows: repeat(4, 1fr);
        grid-template-columns: repeat(3, 1fr);
    }
    @media (min-aspect-ratio: 3/2){
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(5, 1fr);
    }
    gap: 8px;
    justify-items: center;
    align-items: center;
`;
function StaffHomeIconContainer({children}){
    return (
        <div css={StaffHomeIconContainerCSS}>
            {children}
        </div>
    )
}
export {StaffHomeIconContainer}

const StaffHomeIconCSS = css`
    background: white;
    display: grid;
    justify-items: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    padding: 8px 0px 4px 0px;
    gap: 8px;
    grid-template-areas:
        "image"
        "label";
    grid-template-rows: 1fr auto;

    border-radius: 16px;
    box-shadow: 0px 4px 4px 0px #00000040;

    &>div{
        grid-area: image;
        height: 100%;
        overflow: hidden;
        &>img, &>svg{
            height: 100%;
        }
    }
    &>label{
        grid-area: label;
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        text-align: center;

    }
`
function StaffHomeIcon({children, ...props}){
    return (
        <div css={StaffHomeIconCSS} {...props}>
            {children}
        </div>
    );
}
export {StaffHomeIcon}