/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";
import {ReactComponent as CloseButton} from "../Assets/CloseButton.svg";

const MessageBoxContainerCSS = css`
    width: 346px;
    background-color: white;
    position: relative;
    &>.closeButton{
        position: absolute;
        top: 16px;
        right: 16px;
    }

    display: grid;
    padding-top: 48px;
    padding-bottom: 48px;
    grid-template-areas: 
        "header"
        "body"
        "footer";

    flex-direction: column;
    align-items: center;
`;

function MessageBoxContainer({children, onClose, ...props}){
    return (
        <div css={MessageBoxContainerCSS}>
            {children}
            <CloseButton className="closeButton" onClick={onClose} />
        </div>
    )
}

export {MessageBoxContainer};

const MessageBoxHeaderCSS = css`
    grid-area: header;
    align-self: start;

    display: flex;
    flex-direction: column;
    align-items: center;

    &>H1{
        width: 235px;
        font-size: 18px;
        font-weight: 400;
        line-height: 27px;
        letter-spacing: 0em;
        text-align: center;
        margin: 0px;
        &>span{
            color: rgba(22, 88, 182, 1);
        }
    }
    &>p{
        margin: 0px;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: center;
        text-decoration: underline;
        color: rgba(102, 102, 102, 1);
    }
    margin-bottom: 16px;
`;
function MessageBoxHeader({children}){
    return (
        <div css={MessageBoxHeaderCSS}>
            {children}
        </div>
    )
}
export {MessageBoxHeader}

const MessageBoxBodyCSS = css`
    grid-area: body;
    padding: 0px 32px;
    &>p.label{
        margin: 0px;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: center;
        text-decoration: underline;
        color: rgba(102, 102, 102, 1);
    }
    margin-bottom: 16px;
`
function MessageBoxBody({children}){
    return (
        <div css={MessageBoxBodyCSS}>
            {children}
        </div>
    )
}
export {MessageBoxBody}

const MessageBoxFooterCSS = css`
    grid-area: footer;
    align-self: end;
`;
function MessageBoxFooter({children}){
    return (
        <div css={MessageBoxFooterCSS}>
            {children}
        </div>
    )
}
export {MessageBoxFooter}