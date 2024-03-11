import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { CheckBox } from "../../../Components";
import { MoreButton, UserAllowanceContainer } from "./Component";
import { useContext as useModalController } from "../../../Context/Modal";
import AllowancePage from "./AllowancePage";

const UserAllowance = forwardRef(
    ({valid, onClick, onChange, className, ...props}, ref)=>{
        const modalController = useModalController().current;
        const CheckBoxRef = useRef();
        const delegate = useRef(
            {
                ref: CheckBoxRef,
                get value(){
                    return this.ref?.current?.checked;
                },
            }
        );
        useEffect(
            ()=>{
                (
                    typeof(ref) === "function"?ref:(targetRef)=>{
                        ref.current=targetRef;
                    }
                )(delegate.current);
            }
        )
        const onCheckBoxClick = useCallback(
            (e)=>{
                if(typeof(onClick) === "function"){
                    onClick(e);
                }
            },
            [onClick]
        )
        const onCheckBoxChanged = useCallback(
            ()=>{
                if(typeof(onChange) === "function"){
                    onChange();
                }
            },
            [onChange]
        )
        const onButtonClicked = useCallback(
            (e)=>{
                modalController.setChildren({component: AllowancePage});
                modalController.open();
            },
            [modalController]
        )
        return (
            <UserAllowanceContainer className={className}>
                <CheckBox ref={CheckBoxRef} onClick={onCheckBoxClick} onChange={onCheckBoxChanged} className="left" valid={valid} label="개인정보 수집 및 이용동의(필수)"></CheckBox>
                <MoreButton className="right" onClick={onButtonClicked}>{">>"}</MoreButton>
            </UserAllowanceContainer>
        )
    }
)

export default UserAllowance;