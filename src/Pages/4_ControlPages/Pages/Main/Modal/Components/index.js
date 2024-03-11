/** @jsxImportSource @emotion/react */
import React, { useCallback, useRef} from "react";
import {css} from "@emotion/react";

const ModalLayerCSS = css`
    /*background-color: rgba(100, 100, 100, 0.8);*/
    background: radial-gradient(170.05% 70.5% at 50% 50%, #000000 0%, rgba(58, 57, 52, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    
    backdrop-filter: blur(20px);
    width: 100%;
    height: 100%;
    display: none;
    position: fixed;
    &.open{
        display: block;
    }
    &>div{
        display: flex;
        justify-content: center;
        align-items: center;
        position relative;
        width: 100%;
        height: 100%;
    }
`;
function ModalLayer({onEdgeClick, children, ...props}){
    const edgeRef = useRef();
    const onClick = useCallback(
        (e)=>{
            if(typeof(onEdgeClick) === "function"){
                if(e.target===edgeRef.current){
                    onEdgeClick();
                }
            }
        }
        ,
        [onEdgeClick]
    )
    return (
        <div css={ModalLayerCSS} {...props}>
            <div ref={edgeRef} onClick={onClick}>
                {children}
            </div>
        </div>
    );
}
export {ModalLayer};