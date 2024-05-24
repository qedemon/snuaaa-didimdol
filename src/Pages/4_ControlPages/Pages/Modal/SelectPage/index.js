import React, { useCallback } from "react";
import SelectItem, {SelectPageContainer} from "./Components";
import {useContext as useModalController} from "../../../Context/Modal";

function SelectPage({list, onClose, onSelect}){
    const modalController = useModalController().current;
    const onCloseClick = useCallback(
        ()=>{
            if(typeof(onClose)!=="function"||onClose()){
                modalController.close();
            }
        },
        [modalController, onClose]
    )
    const onItemClick = useCallback(
        (value)=>()=>{
            if(typeof(onSelect)==="function"){
                onSelect(value);
            }
        },
        [onSelect]
    )
    return (
        <SelectPageContainer onClose={onCloseClick}>
            {
                list.map(
                    ({label, value}, index)=>(<SelectItem key={index} onClick={onItemClick(value)}>{label}</SelectItem>)
                )
            }
        </SelectPageContainer>
    )
}

export default SelectPage;