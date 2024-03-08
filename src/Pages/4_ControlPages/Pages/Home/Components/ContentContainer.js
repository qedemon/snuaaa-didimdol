/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const ContentContainerCSS = css`
    display: grid;
    height: 70%;
    grid-template-rows: 177px 44px 42px auto;
    justify-items: center;
    align-items: start;
    & a{
        text-decoration-line: none;
    }
`;
function ContentContainer({children, ...props}){
    return (
        <div css={ContentContainerCSS} {...props}>
            {children}
        </div>
    )
}

export default ContentContainer;