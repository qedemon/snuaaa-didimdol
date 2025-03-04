/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";


const DetailedViewContainerCSS = css`
    width: 80%;
    height: 80%;
    background: var(--white);
    border-radius: 8px;
`;
function DetailedViewContainer({children}){
    return (
        <div css={DetailedViewContainerCSS}>
            {children}
        </div>
    )
}

export {DetailedViewContainer};