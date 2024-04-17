import CharacterRed from "@images/CharacterRed.svg";
import CharacterOrange from "@images/CharacterOrange.svg";
import CharacterBlue from "@images/CharacterBlue.svg";
import style from "./StatusContainer.module.css";
import StatusContentContainer from "./StatusContentContainer";

const statusColor = {
  red: "#F17233",
  orange: "#F5B538",
  blue: "#34D0D5",
  gray: "var(--dark-gray)"
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
        style={{ backgroundColor: statusColor[status.status] }}
      >
        <StatusContentContainer status={status}/>
        <div className={style.horizontalLine}></div>
        <div className={style.statusText}>{status?.statusText}</div>
      </div>
    </div>
  );
}
