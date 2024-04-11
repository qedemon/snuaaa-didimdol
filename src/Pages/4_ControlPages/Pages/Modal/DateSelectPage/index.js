import React, { useCallback, useRef } from "react";
import {SelectButton, DateSelectPageContainer, InputDate} from "./Components";

function DateSelectPage({initialDate, onSelect}){
    const defaultDate = ((date)=>date??new Date())(initialDate);
    const inputDateRef = useRef();
    const onClick = useCallback(
        ()=>{
            if(typeof(onSelect)==="function"){
                onSelect(inputDateRef.current?.value);
            }
        },
        [onSelect, inputDateRef]
    )
    return (
        <DateSelectPageContainer>
            <InputDate ref={inputDateRef} defaultValue={`${defaultDate.getFullYear()}-${(defaultDate.getMonth()+1).toString().padStart(2, "0")}-${defaultDate.getDate().toString().padStart(2, "0")}`}/>
            <SelectButton onClick={onClick}>확인</SelectButton>
        </DateSelectPageContainer>
    )
}

export default DateSelectPage;