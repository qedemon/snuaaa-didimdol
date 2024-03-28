/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const StaffHomeContainerCSS = css`
    width: 100%;
    height: 100%;
    display: grid;
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
    display: flex;
    justify-content: center;
    align-items: center;
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
    justify-items: center;
    align-items: center;
    padding: 20px;
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
    height: 100%;
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
    display: grid;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 8px;
    grid-template-areas:
        "image"
        "label";
    &>img{
        grid-area: image;
        display: block;
        width: 80%;
        aspect-ratio: 1 / 1;
        border: 1px solid black;
        border-radius: 16px;
    }
    &>label{
        grid-area: label;
    }
`
function StaffHomeIcon({children}){
    return (
        <div css={StaffHomeIconCSS}>
            {children}
        </div>
    );
}
export {StaffHomeIcon}