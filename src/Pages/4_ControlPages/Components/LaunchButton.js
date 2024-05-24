/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const LaunchButtonCSS = css`
  padding: 16px 32px;
  border-radius: 100px;
  border: 0px;
  gap: 12px;

  width: max-content;

  background: rgba(243, 145, 134, 1);

  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: rgba(255, 255, 255, 1);

  cursor: pointer;

  &.blue {
    background: rgba(118, 128, 226, 1);
  }
  &.green {
    background: var(--green);
  }
  &.white {
    background: white;
    color: black;
  }
  &.border {
    border: 2px solid black;
  }
`;
function LaunchButton({ children, ...props }) {
  return (
    <button type="button" css={LaunchButtonCSS} {...props}>
      {children}
    </button>
  );
}

export default LaunchButton;
