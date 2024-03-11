/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const SelectCSS = css`
    position: relative;
    &>select{
        width: 100%;
        min-height: 50px;

        color: black;
        text-indent: 16px;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;
    
        border: 1px solid rgba(232, 232, 232, 1);
        border-radius: 5px;
        background: linear-gradient(0deg, #F6F6F6, #F6F6F6),
        linear-gradient(0deg, #E8E8E8, #E8E8E8);
        &[type="password"]{
            font-family: Poppins;
        }
        &.valid{
            border: 1px solid rgba(153, 191, 64, 1);
            outline-color: rgba(153, 191, 64, 1);
        }
        &.invalid{
            border: 1px solid rgba(255, 0, 0, 1);
            outline-color: rgba(255, 0, 0, 1);;
        }
    }
`;

const Select = forwardRef(
    ({valid, className, options=[], ...props}, ref)=>{
        const validClassName = valid===true?"valid":valid===false?"invalid":"";
        return (
            <div css={SelectCSS}>
                <select ref={ref} className={[className, validClassName].join(' ')} {...props}>
                    {
                        options.map(
                            ({value, label, property}, index)=>{
                                return (<option value={value} key={index} {...property}>{label}</option>);
                            }
                        )
                    }
                </select>
            </div>
        )
    }
)

export default Select;