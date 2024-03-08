/** @jsxImportSource @emotion/react */
import React, {useCallback} from "react";
import {css} from "@emotion/react";
//import {Background} from "../../../../../Components";
//import {ReactComponent as LowerCenter} from "../Assets/LowerCenter.svg";
import {ReactComponent as CloseButton} from "../Assets/CloseButton.svg";

const ModalContainerCSS = css`
    width: 80%;
    height: 80%;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
`

/*const AllowancePageBackground = Background([
    {
        components: LowerCenter,
        position: Background.Positions.Lower.Left
    }
]);*/
const AllowancePageContainerCSS = css`
    width: 100%;
    height: 100%;
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
    &>.title{
        margin-left: 32px;
        margin-top: 32px;
        &>*{
            font-size: 16px;
            font-weight: 400;
            line-height: 19px;
            letter-spacing: 0em;
            text-align: left;
            margin: 0px;
        }
    }
    &>.content{
        width: 100%;
        height: 100%;
        padding: 24px 23px 8px 23px;
        overflow: hidden;
        &>div{
            overflow-y: auto;
            height: calc(100% - 16px);
            &>*{
                white-space: pre-wrap;
                color: rgba(58, 57, 52, 1);
                font-size: 12px;
                font-weight: 400;
                line-height: 15px;
                letter-spacing: 0em;
                text-align: left;
            }
        }
    }
    &>.close{
        position: absolute;
        right: 16px;
        top: 32px;
        transform: translateX(-100%);
    }
`;

function AllowancePageContainer({onClose, children, ...props}){
    const onCloseButtonClick = useCallback(
        ()=>{
            (typeof(onClose)==="function") && onClose();
        },
        [onClose]
    )
    const [title, content] = (
        (children)=>{
            return Array.isArray(children)?
                children:
                [children]
        }
    )(children??[])
    .reduce(
        ([title, content], item)=>{
            const {props: {className}} = item;
            return [
                (className??"").split(" ").includes("title")?[...title, item]:title,
                (className??"").split(" ").includes("content")?[...content, item]:content
            ];
        },
        [[], []]
    )
    return (
        <div css={ModalContainerCSS}>
                <div css={AllowancePageContainerCSS}>
                    <div className="title">
                        {title}
                    </div>
                    <div className="content">
                        <div>
                            {content}
                        </div>
                    </div>
                    <CloseButton className="close" onClick={onCloseButtonClick}/>
                </div>     
        </div>
    )
}
export {AllowancePageContainer}