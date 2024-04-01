import React, { useCallback, useState } from "react";
import { FilterSelectContainer, StatusFilterItem, StatusFilterList } from "./Components";
import { LaunchButton } from "@/Pages/4_ControlPages/Components";

function SelectFilter({filter, onSelect}){
    const [status, setStatus] = useState(filter.status);
    const toggleStatus = useCallback(
        (index)=>()=>{
            setStatus(
                (status)=>{
                    return [
                        ...status.slice(0, index),
                        (
                            (status)=>({...status, selected: !status.selected})
                        )(status[index]),
                        ...status.slice(index+1)
                    ]
                }
            )
        },
        [setStatus]
    )
    const onSelectButtonClicked = useCallback(
        ()=>{
            if(typeof(onSelect)==="function"){
                onSelect({status})
            }
        },
        [onSelect, status]
    )
    return (
        <FilterSelectContainer>
            <h1>인준 현황 필터</h1>
            <StatusFilterList>
                {
                    status.map(
                        (item, index)=>(
                            <StatusFilterItem key={index} status={item} onClick={toggleStatus(index)}/>
                        )
                    )
                }
            </StatusFilterList>
            <LaunchButton onClick={onSelectButtonClicked} className="green">적용하기</LaunchButton>
        </FilterSelectContainer>
    )
}

export default SelectFilter;