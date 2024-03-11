/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const WelcomePageCSS = css`
    diplay: grid;
    gap: 16px;
    &>h1{
        color: rgba(255, 255, 255, 1);
        font-size: 32px;
        font-weight: 700;
        line-height: 48px;
        letter-spacing: 0em;
        text-align: center;
    }
    &>h2{
        color: rgba(255, 255, 255, 1);
        font-size: 20px;
        font-weight: 700;
        line-height: 30px;
        letter-spacing: 0em;
        text-align: center;
    }
    
    opacity: 0;
    animation: dissolve 1s ease-in 0.5s forwards;

    @keyframes dissolve {
        from {
            opacity: 0;
        }

        to {
            opacity: 100%;
        }
    }
`;

function WelcomePage({...props}){
    return (
        <div css={WelcomePageCSS}>
            <h1>Welcome aboard!</h1>
            <h2>가입을 축하합니다</h2>
        </div>
    )
}

export default WelcomePage;