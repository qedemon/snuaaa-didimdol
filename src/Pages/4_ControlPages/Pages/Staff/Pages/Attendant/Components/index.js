/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const AttendantContainerCSS = css`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas: 
        "header"
        "body";
    grid-template-rows: 50px 1fr;
    padding: 8px;
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
    overflow: hidden;
`;
function AttendantBody({children}){
    return (
        <div css={AttendantBodyCSS}>
            {children}
        </div>
    )
}
export {AttendantBody};

const AttendantContentContainerCSS = css`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas: 
        "header"
        "body";
    grid-template-rows: auto 1fr;
    overflow: hidden;
    gap: 8px;
`;
function AttendantContentContainer({children}){
    return (
        <div css={AttendantContentContainerCSS}>
            {children}
        </div>
    )
}
export {AttendantContentContainer}

const AttendantContentHeaderCSS = css`
    grid-area: header;
    padding: 4px;
`;
function AttendantContentHeader({children}){
    return <div css={AttendantContentHeaderCSS}>
        {children}
    </div>
}
export {AttendantContentHeader}

const AttendantContentBodyCSS = css`
    grid-area: body;
    height: 100%;
    overflow: scroll;
    border: 1px solid black;
`;
function AttendantContentBody({children}){
    return <div css={AttendantContentBodyCSS}>
        {children}
    </div>
}
export {AttendantContentBody}

const AttendtListSelectCSS = css`
    padding: 4px;
    font-size: 15px;
    color: black;
    background-color: white:
    border: 1px solid black;
`
function AttendantListSelect({onChange, children}){
    return (
        <select css={AttendtListSelectCSS} onChange={onChange}>
            {children}
        </select>
    )
}
export {AttendantListSelect}

const AttendentListUlCSS = css`
    list-style-type: none;
    text-align: left;
    padding: 0px;
    &>li{
        border: 1px solid black;
        padding: 8px;
        border-radius: 5px;
        margin: 8px;
    }
`
function AttendantListUl({children}){
    return (
        <ul css={AttendentListUlCSS}>
            {children}
        </ul>
    )
}
export default AttendantListUl;
/*
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