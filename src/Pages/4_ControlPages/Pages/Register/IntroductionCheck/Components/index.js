/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const IntroductionCheckContainerCSS = css`
    margin: 0px 20px;
`;

function IntroductionCheckContainer({className, children}){
    return (
        <div className={className??""} css={IntroductionCheckContainerCSS}>
            {children}
        </div>
    )
}

export {IntroductionCheckContainer};