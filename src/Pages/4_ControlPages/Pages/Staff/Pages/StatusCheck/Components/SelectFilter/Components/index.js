/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";
import statusColorList from "../../statusColorList";

const FilterSelectContainerCSS = css`
    width: 230px;
    padding: 16px;
    border-radius: 8px;
    background: white;
    box-shadow: 0px 4px 4px 0px #00000040;

    display: grid;
    justify-items: center;
    align-items: center;
    gap: 24px;

    &>h1{
        font-size: 20px;
        font-weight: 800;
        line-height: 20px;
        text-align: center;
    }
`;
function FilterSelectContainer({children}){
    return (
        <div css={FilterSelectContainerCSS}>
            {children}
        </div>
    )
}
export {FilterSelectContainer};

const StatusFilterListCSS = css`
    display: grid;
    gap: 32px;
    list-style: none;
    padding: 0px;
    margin: 0px;
`;
function StatusFilterList({children}){
    return (
        <ul css={StatusFilterListCSS}>
            {
                children
            }
        </ul>
    )
}
export {StatusFilterList};

const StatusFilterItemCSS = css`
    display: flex;
    height: max-content;
    gap: 24px;
    &>label{
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
        text-align: left;
    }
    &>div.circle{
        width: 16px;
        height: 16px;
        border: 1px solid var(--black-secondary);
        border-radius: 100%;
        padding: 2px;
        &>div{
            border-radius: 100%;
            width: 100%;
            height: 100%;
        }
        overflow: hidden;
    }
`;
function StatusFilterItem({status, onClick}){
    const colorCSS = css`
        color: ${statusColorList[status.key]??statusColorList["녹"]}
    `;
    const checkedCSS = status.selected?
        css`
            background-color: ${statusColorList[status.key]??statusColorList["녹"]}
        `:
        css``;
    
    return (
        <li css={[StatusFilterItemCSS, colorCSS]} onClick={onClick}>
            <label>{status.label}</label>
            <div className="circle">
                <div css={checkedCSS}/>
            </div>
        </li>
    )
}
export {StatusFilterItem};