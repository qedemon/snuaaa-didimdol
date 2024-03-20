/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const AttendantContainerCSS = css`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas: 
        "header"
        "body"
        "footer";
    grid-template-rows: 50px 1fr 40px;
`;
function AttendantContainer({children}){
    return (
        <div css={AttendantContainerCSS}>
            {children}
        </div>
    )
}
export {AttendantContainer};

const AttendantHeaderCSS = css`
    grid-area: header;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 16px;
    &>h1{
        flex-grow: 1;
    }
`;
function AttendantHeader({children}){
    return (
        <div css={AttendantHeaderCSS}>
            {children}
        </div>
    )
}
export {AttendantHeader};

const AttendantBodyCSS = css`
    grid-area: body;
    display: grid;
    justify-items: center;
    align-items: center;
    padding: 20px;
`;
function AttendantBody({children}){
    return (
        <div css={AttendantBodyCSS}>
            {children}
        </div>
    )
}
export {AttendantBody};

/*
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
export {StaffHomeIcon}*/