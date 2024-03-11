/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

import {Horizontal, Vertical} from "./positions";

const BackgroundCSS = css`
    width: 100%;
    height: 100%;
    padding: 0px;
    background: rgba(245, 224, 213, 1);
    &>.background{
        position: absolute;
        width: 100%;
        height: 100%;
        &>*{
            position: absolute;
        }
        &>.Upper{
            top: 0px;
        }
        &>.Lower{
            bottom: 0px;
        }
        &>.Left{
            left: 0px;
        }
        &>.Right{
            right: 0px;
        }
        &>.Center{
            left: 50%;
            transform: translateX(-50%);
        }
    }
    &>div.content{
        position: absolute;
        width: 100%;
        height: 100%;

        padding: 1px;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        overflow-y: auto;
        overflow-x: hidden;
    }
    &>.Upper{
        top: 0px;
    }
    &>.Lower{
        bottom: 0px;
    }
    &>.Left{
        left: 0px;
    }
    &>.Right{
        right: 0px;
    }
    &>.Center{
        left: 50%;
        transform: translateX(-50%);
    }
`;

const DefaultCSS = css`
    background-color: rgb(245, 224, 213);
`

const Positions = (
    ()=>{
        const Positions = {};
        const vKeys = ["Upper", "Lower"];
        const hKeys = ["Left", "Center", "Right"];
        vKeys.forEach(
            (vKey)=>{
                Positions[vKey]={};
                hKeys.forEach(
                    (hKey)=>{
                        Positions[vKey][hKey] = {
                            v: Vertical[vKey],
                            h: Horizontal[hKey],
                            className: `${vKey} ${hKey}`
                        }
                    }
                )
            }
        )
        return Positions;
    }
)();

function Background(Decorations, css){
    /*const [upperDecorations, lowerDecorations] = [Vertical.Upper, Vertical.Lower].map(
        (vPos)=>(Decorations??[])
        .filter(
            ({position})=>position.v===vPos
        )
    );*/
    return ({children})=>{
        return (
            <div css={BackgroundCSS}>
                <div css={css||DefaultCSS} className="background">
                {
                    Decorations.map(
                        ({position:{className}, components: C}, index)=>{
                            return (
                                <C key={index} className={className}/>
                            )
                        }
                    )
                }
                </div>
                
                <div className="content">
                    {children}
                </div>
            </div>
        )
    }
}
Background.Positions = Positions;

export default Background;