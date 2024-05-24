import CharacterRed from "@images/CharacterRed.svg";
import CharacterOrange from "@images/CharacterOrange.svg";
import CharacterBlue from "@images/CharacterBlue.svg";
import Congratulation from "@images/Congratulation.svg";
import style from "./StatusContainer.module.css";
import StatusContentContainer from "./StatusContentContainer";

const statusColor = {
  red: {backgroundColor: "#F17233", color: "var(--white)"},
  orange: {backgroundColor: "#F5B538", color: "var(--white)"},
  blue: {backgroundColor: "#34D0D5", color: "var(--white)"},
  gray: {backgroundColor: "var(--dark-gray)", color: "var(--white)"},
  인준: {background: "#E5EFF0", color: "var(--black)"},
};

export default function StatusContainer({ status }) {
  const 인준 = status.status==="인준";
  return (
    <div className={style.statusContainer}>
      <div className={style.statusHeaderWrapper}>
        <p className={style.statusHeader}>나의 인준 현황</p>
        {
          !인준?
          (
            <div className={style.statusImageWrapper}>
              <img src={CharacterRed} alt="red" />
              <img src={CharacterOrange} alt="orange" />
              <img src={CharacterBlue} alt="blue" />
            </div>
          ):null
        }
      </div>
      <div
        className={style.statusBox}
        style={statusColor[status.status]}
      >
        <div className={인준?style.statusContentWrapperShrink:style.statusContentWrapper}>
          <StatusContentContainer status={status}/>
          <div className={style.horizontalLine}></div>
          <div className={style.statusText}>{status?.statusText}</div>
        </div>
        {
          인준?
          (
            <div className={style.statusBackgroundImageWrapper}>
              <img src={Congratulation} alt="congratulation" />
            </div>
          ):null
        }
      </div>
    </div>
  );
}
