/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";

const SpinnerCSS = css`
  display: inline-block;

  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;

  width: calc(1em - 3px);
  height: calc(1em - 3px);

  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default function Spinner({color}) {
  const coloredCSS = css`
    border-color: ${color};
    border-bottom-color: transparent;
  `
  return <span css={color?[SpinnerCSS, coloredCSS]:SpinnerCSS} />;
}
