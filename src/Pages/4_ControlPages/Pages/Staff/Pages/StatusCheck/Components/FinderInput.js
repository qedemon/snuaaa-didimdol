/** @jsxImportSource @emotion/react */
//import React from "react";
//import {css} from "@emotion/react";
import {Input} from "../../../../../Components";
import { ReactComponent as Finder } from "../Assets/finder.svg";

function FinderInput({placeholder, onSideButtonClick}){
    return (
        <Input placeholder={placeholder} sideButtonElement={<Finder/>} onSideButtonClick={onSideButtonClick} />
    )
}

export default FinderInput;