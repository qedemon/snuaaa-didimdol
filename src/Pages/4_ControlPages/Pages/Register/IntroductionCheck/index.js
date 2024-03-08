import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { CheckBox } from "../../../Components";
import { IntroductionCheckContainer } from "./Components";

const IntroductionCheck = forwardRef(
    ({label, valid, onChange, className}, ref)=>{
        const delegateRef = useRef({value: false});
        const checkBoxRef = useRef();

        useEffect(
            ()=>{
                if(typeof(ref) === "function"){
                    ref(delegateRef.current);
                }
                else{
                    ref.current = delegateRef.current;
                }
            }
            ,[ref, delegateRef]
        )

        const onCheckChange = useCallback(
            (checked)=>{
                delegateRef.current.value = checked;
                if(typeof(onChange)==="function"){
                    onChange();
                }
            },
            [delegateRef, onChange]
        )

        return (
            <IntroductionCheckContainer className={className}>
                <CheckBox ref={checkBoxRef} onChange={onCheckChange} valid={valid} label={label}/>
            </IntroductionCheckContainer>
        )
    }
);

export default IntroductionCheck;