/** @jsxImportSource @emotion/react */
import React, {forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {css} from "@emotion/react";
import {ReactComponent as UnChecked} from "./Assets/CheckBox.svg";
import {ReactComponent as Checked} from "./Assets/CheckBoxChecked.svg";

const CheckBoxCSS = css`
    display: flex;
    align-items: center;
    &>label{
        margin-left: 8px;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: left;
    }
    text-decoration: underline;
    &.valid{
        text-decoration: none;
    }
`;

const CheckBox = forwardRef(
    ({children, className, onChange, valid, label, ...props}, ref)=>{
        const delegateRef = useRef({});
        const [checked, setChecked] = useState({prev: false, current: false});
        delegateRef.current.checked=checked.current;
        
        const onClick = useCallback(
            ()=>{
                setChecked(
                    (checked)=>(
                        {
                            ...checked,
                            current: !checked.current
                        }
                    )
                );
            },
            [setChecked]
        )
        
        useEffect(
            ()=>{
                (
                    (typeof(ref)==="function")?ref:(target)=>{
                        ref.current=target;
                    }
                )(delegateRef.current);
            },
            [ref]
        )

        const onCheckedChange = useCallback(
            (value)=>{
                if(typeof(onChange)==="function"){
                    onChange(value);
                }
            },
            [onChange]
        )
        useEffect(
            ()=>{
                if(checked.prev !== checked.current){
                    onCheckedChange(checked.current);
                    setChecked(
                        (checked)=>(
                            {...checked, prev: checked.current}
                        )
                    )
                }
            },
            [onCheckedChange, checked]
        )
        return (
            <div css={CheckBoxCSS} className={`${className??""} ${valid===true?"valid":valid===false?"invalid":""}`} onClick={onClick}>
                {checked.current?(<Checked/>):(<UnChecked/>)}
                <label>{label}</label>
            </div>
        )
    }
)
export default CheckBox;