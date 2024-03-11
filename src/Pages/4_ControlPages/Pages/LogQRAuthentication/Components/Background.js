/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import { Background } from "../../../Components";
import { ReactComponent as UpperLeft } from "../Assets/UpperLeft.svg";
import { ReactComponent as UpperRight } from "../Assets/UpperRight.svg";

const BackgroundCSS = css`
    background: rgba(245, 245, 245, 1);
`

export default Background(
    [
        {
            components: UpperLeft,
            position: Background.Positions.Upper.Left
        },
        {
            components: UpperRight,
            position: Background.Positions.Upper.Right
        }
    ],
    BackgroundCSS
);