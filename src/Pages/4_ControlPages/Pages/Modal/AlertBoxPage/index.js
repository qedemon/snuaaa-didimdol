import React, { useCallback } from "react";
import { useContext as useModalController } from "../../../Context/Modal";
import { LaunchButton } from "../../../Components";
import { MessageBoxContainer } from "./Components";

function AlertMessageBox({message}){
    const controller = useModalController().current;
    const close = useCallback(
        ()=>{
            controller.close();
        },
        [controller]
    )
    
    return (
        <MessageBoxContainer>
            <div>
                <p>{message}</p>
            </div>
            <LaunchButton className="blue" onClick={close}>OK</LaunchButton>
        </MessageBoxContainer>
    )
}

export default AlertMessageBox;