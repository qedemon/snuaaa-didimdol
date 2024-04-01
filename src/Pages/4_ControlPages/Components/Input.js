/** @jsxImportSource @emotion/react */
import React, { forwardRef } from "react";
import { css } from "@emotion/react";

const InputCSS = css`
  position: relative;
  & > input {
    width: 100%;
    min-height: 50px;

    text-indent: 16px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;

    border: 1px solid rgba(232, 232, 232, 1);
    border-radius: 5px;
    background: linear-gradient(0deg, #f6f6f6, #f6f6f6),
      linear-gradient(0deg, #e8e8e8, #e8e8e8);
    &[type="password"] {
      font-family: Poppins;
    }
    &.valid {
      border: 1px solid rgba(153, 191, 64, 1);
      outline-color: rgba(153, 191, 64, 1);
    }
    &.invalid {
      border: 1px solid rgba(255, 0, 0, 1);
      outline-color: rgba(255, 0, 0, 1);
    }
  }
  & > .sideButton {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translate(-16px, -50%);
    & > label {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: right;
      color: rgba(243, 145, 134, 1);
    }
  }
`;

const Input = forwardRef(
  (
    {
      valid,
      className,
      children,
      sideButtonLabel,
      sideButtonElement,
      onSideButtonClick,
      ...props
    },
    ref
  ) => {
    const validClassName =
      valid === true ? "valid" : valid === false ? "invalid" : "";
    return (
      <div css={InputCSS}>
        <input
          ref={ref}
          className={[className, validClassName].join(" ")}
          {...props}
        >
          {children}
        </input>
        <div className="sideButton" onClick={onSideButtonClick}>
          {
            sideButtonLabel?
              (<label>{sideButtonLabel}</label>):
              null
          }
          {
            sideButtonElement??null
          }
        </div>
      </div>
    );
  }
);

export default Input;
