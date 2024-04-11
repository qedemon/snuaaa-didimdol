/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const DateSelectPageContainerCSS = css`
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 8px;
`;
function DateSelectPageContainer({children}){
    return (
        <div css={DateSelectPageContainerCSS}>
            {children}
        </div>
    )
}
export {DateSelectPageContainer};

const InputDateCSS = css`
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;

    background: white;
    border: 1px solid #666666;

    padding: 8px;

    position: relative;
`;
const InputDate = forwardRef(
    ({...props}, ref)=>{
        return (
            <input ref={ref} type="date" css={InputDateCSS} {...props}/>
        )
    }
);
export {InputDate};

const SelectButtonCSS = css`
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;

    background: white;
    border: 1px solid #666666;

    padding: 8px;
`;
function SelectButton({children, onClick}){
    return (
        <button css={SelectButtonCSS} onClick={onClick}>{children}</button>
    )
}
export {SelectButton};