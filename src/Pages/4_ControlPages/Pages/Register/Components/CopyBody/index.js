/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

import {ReactComponent as Copybutton} from "./Assets/CopyButton.svg";

const CopyBodyCSS = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    &>.content{
        &>*{
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            letter-spacing: 0em;
            text-align: left;
            color: rgba(22, 88, 182, 1);
            text-align: center;
        }
    }
    &>.copyButton{
        cursor: pointer;
    }
`
function CopyBody({onCopy, children}){
    return (
        <div css={CopyBodyCSS}>
            <div className="content">
                {children}
            </div>
            <Copybutton className="copyButton" onClick={onCopy}/>
        </div>
    )
}
export default CopyBody