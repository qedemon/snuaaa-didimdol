/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";
import { ReactComponent as Lock } from "../Assets/Lock.svg";
import { ReactComponent as UnLock } from "../Assets/UnLock.svg";

const AttendantCheckContainerCSS = css`
    width: 100%;
    height: 100%;
    display: grid;
    gap: 16px;
    grid-template-rows: auto auto 1fr;
    justify-items: center;
    padding: 8px 16px;
    overflow: hidden;
`;
function AttendantCheckContainer({children}){
    return (
        <div css={AttendantCheckContainerCSS}>
            {children}
        </div>
    );
}
export {AttendantCheckContainer};

const AttendantCheckHeaderCSS = css`
    text-align: left;
    position: relative;
    &>*{
        margin: 0px;
    }
    &>h1{
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
        text-align: left;
        padding: 4px 8px;
    }
    &>h2{
        font-size: 12px;
        font-weight: 400;
        line-height: 12px;
        text-align: left;
        padding: 4px 8px;
        color: var(--dark-gray);
    }
    &>div.homeLink{
        position: absolute;
        margin: 0px;
        top: 0px;
        right: 0px;
        &>a{
            font-size: 12px;
            font-weight: 400;
            line-height: 12px;
            text-align: left;
            color: var(--blue-primary);
            text-decoration: none;
        }
    }
`
function AttendantCheckHeader({children}){
    return (
        <div css={AttendantCheckHeaderCSS}>
            {children}
        </div>
    )
}
export {AttendantCheckHeader};

const AttendantCheckCountContainerCSS = css`
    background-color: var(--blue-primary);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    border-radius: 8px;
    padding: 16px;
    display: grid;
    justify-items: center;

    &>div.classInfo{
        padding: 0px 25px 4px 25px;
        &>h1{
            padding: 4px 8px;
            font-size: 20px;
            font-weight: 400;
            line-height: 20px;
        }
        &>h2{
            padding: 4px 8px;
            font-size: 12px;
            font-weight: 400;
            line-height: 12px;
        }
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: var(--white);
    }
    &>div.attendantCount{
        display: grid;
        gap: 4px;
        padding: 8px 0px;
        &>h1{
            font-size: 24px;
            font-weight: 400;
            line-height: 24px;
            &>span.white{
                color: white;
            }
        }
        &>h2{
            font-size: 12px;
            font-weight: 400;
            line-height: 12px;
            color: white;
        }
    }
`;
function AttendantCheckCountContainer({onClick, children}){
    return (
        <div css={AttendantCheckCountContainerCSS} onClick={onClick}>
            {children}
        </div>
    )
}
export {AttendantCheckCountContainer}

const AttendantCheckDetailContainerCSS = css`
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-rows: auto 1fr;
    &>div.head{
        display: flex;
        justify-content: right;
    }
    &>div.body{
        height: 100%;
        overflow-y: auto;
    }
`;
function AttendantCheckDetailContainer({children}){
    return (
        <div css={AttendantCheckDetailContainerCSS}>
            {children}
        </div>
    )
}
export {AttendantCheckDetailContainer}

const AttendantCheckLockEditableContainerCSS = css`
    width: max-content;
    text-align: right;
    padding: 8px;
    display: flex;
    justify-content: right;
    align-items: center;

    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    &.lock{
        color: #EE4F00;
    }
    &.unlock{
        color: #99BF40;
    }

    cursor: pointer;
`;
function AttendantCheckLockEditable({lock: lockRaw, messages: [lockMessage, unLockMessage], onClick}){
    const lock = !(lockRaw===false);
    return (
        <div css={AttendantCheckLockEditableContainerCSS} className={lock?"lock":"unlock"} onClick={onClick}>
            {
                lock?
                (
                    <>
                        {lockMessage}
                        <Lock/>
                    </>
                ):
                (
                    <>
                        {unLockMessage}
                        <UnLock/>
                    </>
                )
            }
        </div>
    )
}
export {AttendantCheckLockEditable}

const AttendantCheckMemberListCSS = css`
    margin: 0px;
    padding: 0px 8px;
    list-style: none;
`;
function AttendantCheckMemberList({children}){
    return (
        <ul css = {AttendantCheckMemberListCSS}>
            {children}
        </ul>
    )
}
export {AttendantCheckMemberList};

const AttendantCheckMemberItemCSS = css`
    &>div{
        background: #EDEDED;
        border: 1px solid #666666;
        text-align: left;
        padding: 9px 16px 7px 16px;

        display: flex;

        &>div.memberInfo{
            flex-grow: 1;
            display: flex;
            justify-content: left;
            align-items: center;
            gap: 8px;

            &>h1{
                font-size: 16px;
                font-weight: 500;
                line-height: 24px;
                text-align: left;
            }
            &>h2{
                font-size: 12px;
                font-weight: 500;
                line-height: 14.52px;
                text-align: left;
            }
        }

        &>div.check{
            display: flex;
            align-items: center;
            gap: 4px;
            --lock-color: #666666;
            &.unlock{
                --lock-color: var(--blue-primary);
            }
            &>label{
                font-size: 14px;
                font-weight: 400;
                line-height: 14px;
                text-align: left;
                color: var(--lock-color);
            }
            &>div.checkbox{
                width: 10px;
                height: 10px;
                border: 1px solid;
                border-color: var(--lock-color);
                background-color: none;
            }
            &>div.checkbox.checked{
                background-color: var(--lock-color);
            }
        }
    }
`;
function AttendantCheckMemberItem({user, lock, onCheckClick}){
    return (
        <li css={AttendantCheckMemberItemCSS}>
            <div>
                <div className="memberInfo">
                    <h1>{user.name}</h1>
                    <h2>{`${user.colNo} - ${user.major}`}</h2>
                </div>
                <div className={`check ${lock===false?"unlock":""}`} onClick={onCheckClick}>
                    <label>출석</label>
                    <div className={`checkbox ${user.checked?"checked":""}`}/>
                </div>
            </div>
        </li>
    )
}
export {AttendantCheckMemberItem};