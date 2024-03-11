/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const MainContainerCSS = css`
    position: relative;
    margin: 0px;
    width: 100vw;
    height: 100vh;
    @supports (-webkit-touch-callout: none) {
        height: -webkit-fill-available;
    }
    &>.topLayer{
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 100;
    }
`
function MainContainer({children, ...props}){
    return (
        <div css={MainContainerCSS} {...props}>
            {children}
        </div>
    )
}

export {MainContainer};