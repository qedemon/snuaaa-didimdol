/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ReactComponent as Rocket } from "./Assets/Rocket.svg";

const rocketOff = 95;
const rocketRatio = 250 / 375;

const ContentContainerCSS = css`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-rows: 144px auto;
  & > div.real {
    position: relative;
    margin-top: ${rocketRatio * rocketOff}%;
    background-color: white;
    & > .title {
      position: absolute;
      width: 100%;
      left: 34px;
      top: 16px;
      transform: translateY(calc(-100% - 8px));
      & > div {
        width: max-content;
        & > * {
          margin: 0px;
          font-size: 24px;
          font-weight: 800;
          line-height: 36px;
          letter-spacing: 0em;
          text-align: left;
        }
        padding-bottom: 14px;
      }
    }
    & > .rocket {
      position: absolute;
      left: 0px;
      top: 0px;
      transform: translateY(-${rocketOff}%);
      width: 100%;
      height: auto;
    }
    & > .content {
      position: relative;
      & > div {
        padding: 16px 16px 166px 16px;
      }
    }
  }
`;
function RocketContentContainer({ children, ...props }) {
  const [titleChildren, contentChildren] = (
    Array.isArray(children) ? children : [children]
  ).reduce(
    ([title, content], item) => {
      const className = ((item) => {
        const {
          props: { className },
        } = item;
        return className ?? "";
      })(item);
      const isTitle = className.split(" ").includes("title");
      return [
        isTitle ? [...title, item] : title,
        !isTitle ? [...content, item] : content,
      ];
    },
    [[], []]
  );
  return (
    <div css={ContentContainerCSS} {...props}>
      <div className="spacer" />
      <div className="real">
        <Rocket className="rocket" />
        <div className="title">
          <div>{titleChildren}</div>
        </div>
        <div className="content">
          <div>{contentChildren}</div>
        </div>
      </div>
    </div>
  );
}

export default RocketContentContainer;
