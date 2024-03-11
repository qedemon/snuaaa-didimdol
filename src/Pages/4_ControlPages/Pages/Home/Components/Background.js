/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

import { Background } from "../../../Components";

import { ReactComponent as UpperLeft } from "../Assets/UpperLeft.svg";
import { ReactComponent as UpperRight } from "../Assets/UpperRight.svg";
import { ReactComponent as LowerLeft } from "../Assets/LowerLeft.svg";
import { ReactComponent as LowerRight } from "../Assets/LowerRight.svg"
import { ReactComponent as LowerCenter } from "../Assets/LowerCenter.svg";

const LogoMessageCSS = css`
    &>p{
        font-size: 10px;
        font-weight: 300;
        line-height: 15px;
        letter-spacing: 0em;
        text-align: center;
    
        color: rgba(255, 255, 255, 1);
    
        margin-bottom: 71px;
    }
`
function LogoMessage(props){
    return (
        <div css={LogoMessageCSS} {...props}>
            <p>
                AAApp2024
            </p>
        </div>
    )
}

export default Background(
    [
        {
            components: LowerCenter,
            position: Background.Positions.Lower.Center
        },
        {
            components: UpperLeft,
            position: Background.Positions.Upper.Left
        },
        {
            components: UpperRight,
            position: Background.Positions.Upper.Right
        },
        {
            components: LowerLeft,
            position: Background.Positions.Lower.Left
        },
        {
            components: LowerRight,
            position: Background.Positions.Lower.Right
        },
        {
            components: LogoMessage,
            position: Background.Positions.Lower.Center
        }
    ]
);