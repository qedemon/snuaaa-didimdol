/** @jsxImportSource @emotion/react */
//import React from "react";
//import {css} from "@emotion/react";
import { forwardRef } from "react";
import {Input} from "../../../../../Components";
import { ReactComponent as Finder } from "../Assets/finder.svg";

const FinderInput = forwardRef(
    (props, ref)=>{
        return (
            <Input ref={ref} sideButtonElement={<Finder/>} {...props} />
        )
    }
)

export default FinderInput;