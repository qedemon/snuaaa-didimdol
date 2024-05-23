import CharacterRed from "@images/CharacterRed.svg";
import CharacterOrange from "@images/CharacterOrange.svg";
import CharacterBlue from "@images/CharacterBlue.svg";
import style from "./StatusContainer.module.css";
import StatusContentContainer from "./StatusContentContainer";

const statusColor = {
  red: {backgroundColor: "#F17233"},
  orange: {backgroundColor: "#F5B538"},
  blue: {backgroundColor: "#34D0D5"},
  gray: {backgroundColor: "var(--dark-gray)"},
  인준: {background: "linear-gradient(135deg, red 0%, orange 16.6%, yellow 33.3%, green 50%, blue 66.6%, indigo 83.3%, violet 100%)"},
};

export default function StatusContainer({ status }) {
  return (
    <div className={style.statusContainer}>
      <div className={style.statusHeaderWrapper}>
        <p className={style.statusHeader}>나의 인준 현황</p>
        <div className={style.statusImageWrapper}>
          <img src={CharacterRed} alt="red" />
          <img src={CharacterOrange} alt="orange" />
          <img src={CharacterBlue} alt="blue" />
        </div>
      </div>
      <div
        className={style.statusBox}
        style={statusColor[status.status]}
      >
        <StatusContentContainer status={status}/>
        <div className={style.horizontalLine}></div>
        <div className={style.statusText}>{status?.statusText}</div>
      </div>
    </div>
  );
}
