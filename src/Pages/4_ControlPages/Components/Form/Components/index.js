/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const FormItemContainerCSS = css`
    display: grid;
    grid-template-areas:
        "input"
        "message";
    grid-template-columns: 1fr;
    grid-column-gap: 5px;
    &>.input{
        grid-area: input;
    }
    &>.message{
        grid-area: message;

        font-size: 10px;
        font-weight: 500;
        line-height: 15px;
        letter-spacing: 0em;
        text-align: left;
        color: rgba(151, 151, 151, 1);

        text-indent: 10px;

    }
    margin: 9px 0px;
    &:first-of-type{
        margin-top: 0px;
    }
`
function FormItemContainer({children, ...props}){
    return (
        <div css={FormItemContainerCSS} {...props}>
            {children}
        </div>
    )
}
export {FormItemContainer}