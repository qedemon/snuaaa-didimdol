/** @jsxImportSource @emotion/react */
import React from "react";
//import {css} from "@emotion/react";
import { ReactComponent as FilterButtonSVG } from "../Assets/filterButton.svg";

function FilterButton({onClick}){
    return (
        <FilterButtonSVG onClick={onClick}/>
    )
}
export default FilterButton;