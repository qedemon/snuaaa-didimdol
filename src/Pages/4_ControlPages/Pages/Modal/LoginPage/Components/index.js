/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

import Background from "./Background";
import { RocketContentContainer } from "../../../../Components";

const LoginPageContainerCSS = css`
    position: relative;
    width: 100%;
    height: 100%;
`;

function LoginPageContainer({children, ...props}){
    return (
        <div css={LoginPageContainerCSS}>
            <Background>
                <RocketContentContainer>
                    {children}
                </RocketContentContainer>
            </Background>
        </div>
    )
}

export {LoginPageContainer}


const LoginPageContentContainerCSS = css`
    width: 100%;
    height: 100%;
    &>*{
        margin: 0px;
    }
    &>h1{
        margin: 8px 0px;
        color: rgba(58, 57, 52, 1);
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;
    }
    &>p{
        margin: 8px 0px;
        color: rgba(189, 189, 189, 1);
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: left;
        &>span{
            color: rgba(243, 145, 134, 1);
        }
    }
`;
function LoginPageContentContainer({children, ...props}){
    return (
        <div css={LoginPageContentContainerCSS}>
            {children}
        </div>
    )
}
export {LoginPageContentContainer}