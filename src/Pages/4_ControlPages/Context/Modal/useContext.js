import { useContext } from "react";
import modalContext from "./Context"; 

function _useContext(){
    return useContext(modalContext);
}

export default _useContext;