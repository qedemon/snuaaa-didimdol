/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const MenuContainerCSS = css`
    width: 100%;
    height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-rows: repeat(auto-fill, minmax(20%, 72px));
    & a{
        display: block;
    }
`
function MenuContainer({children, ...props}){
    return (
        <div css={MenuContainerCSS}>
            {children}
        </div>
    )
}

export default MenuContainer;