/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";
import {ReactComponent as CloseButton} from "@assets/Images/Close.svg";

const SelectPageContainerCSS = css`
    display: grid;
    grid-template-rows: auto 1fr;
    width: 70%;
    max-height: 80%;
    position: relative;
    background-color: white;

    padding: 8px;
    &>div.head{
        display: flex;
        justify-content: right;
        & .close{
            & *{
                stroke: var(--blue-primary);
            }
        }
    }

    &>div.body{
        width: 100%;
        height: 100%;
        overflow: auto;
    }
`;
function SelectPageContainer({onClose, children}){
    return (
        <div css={SelectPageContainerCSS}>
            <div className="head">
                <CloseButton className="close" onClick={onClose}/>
            </div>
            <div className="body">
                {children}
            </div>
        </div>
    )
}
export {SelectPageContainer}

const SelectItemCSS = css`
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;

    background: white;
    border: 1px solid #666666;

    padding: 8px;

    cursor: pointer;
`;
function SelectItem({onClick, children}){
    return (
        <div css={SelectItemCSS} onClick={onClick}>
            {children}
        </div>
    )
}
export default SelectItem;