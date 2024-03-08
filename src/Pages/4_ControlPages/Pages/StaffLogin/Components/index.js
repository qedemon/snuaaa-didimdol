/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const ContainerCSS = css`
    width: 100%;
    height: 100vh;
    padding: 10px 0px;

    display: flex;
    flex-direction: column;
    align-items: center;
    & div.innerContainer{
        padding: 10px;
        border-radius: 5px;
        border: 1px black solid;
        
        display: grid;
        row-gap: 5px;
        column-gap: 5px;
        grid-template-columns: auto max-content;

        grid-template-areas:
            "id button"
            "password button"
            "message message";
        & *{
            display: block;
        }
        
        & *.id{
            grid-area: id;
        }
        & *.password{
            grid-area: password;
        }
        & *.button{
            grid-area: button;
        }
        & *.message{
            grid-area: message;
        }
    }
`;

function Container({children, ...props}){
    return (
        <div css={ContainerCSS} {...props}>
            <div className="innerContainer">
                {children}
            </div>
        </div>
    )
}

const InputCSS = css`
    min-height: 30px;
    font-size: 20px;
    text-indent: 15px;
`;
const Input = forwardRef(
    ({children, ...props}, ref)=>{
        return (
            <input ref={ref} css={InputCSS} {...props}>
                {children}
            </input>
        )
    }
);

const ButtonCSS = css`
    cursor: pointer;
    font-size: 20px;
`;
function Button({className, children, ...props}){
    return (
        <button className={`button ${className}`} css={ButtonCSS} {...props}>
            {children}
        </button>
    )
}

const MessageCSS = css`
    text-align: center;
    width: 100%;
    & p{
        margin: 0px;
        font-size: 15px;
    }
`;
function Message({children, ...props}){
    return (
        <div css={MessageCSS} className="message">
            <p>{children}</p>
        </div>
    )
}

export {Container, Input, Button, Message}