import CharacterRed from "@images/CharacterRed.svg";
import CharacterOrange from "@images/CharacterOrange.svg";
import CharacterBlue from "@images/CharacterBlue.svg";
import Shield from "@images/Shield.svg";
import style from "./StatusContainer.module.css";

const statusColor = {
  red: "#F17233",
  orange: "#F5B538",
  blue: "#34D0D5",
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
        <div className={style.statusWrapper}>
          <div className={style.statusItemWrapper}>
            {status?.numSaveCount > 0 && (
              <div className={style.shieldWrapper}>
                <img src={Shield} alt="shield" />
                <p>
                  구제 (+
                  {status?.numSaveCount})
                </p>
              </div>
            )}
            <p className={style.statusValue} style={{ color: "var(--red)" }}>
              {status?.numClasses}
            </p>
            <p className={style.statusLabel}>디딤돌 불참</p>
          </div>
          <div className={style.statusItemWrapper}>
            <p className={style.statusValue}>{status?.numAssoc}</p>
            <p className={style.statusLabel}>별모임</p>
          </div>
          <div className={style.statusItemWrapper}>
            <p className={style.statusValue} style={{ color: "var(--red)" }}>
              {status?.isPracAccepted ? "이수" : "미이수"}
            </p>
            <p className={style.statusLabel}>장비실습</p>
          </div>
        </div>
        <div className={style.horizontalLine}></div>
        <div className={style.statusText}>{status?.statusText}</div>
      </div>
    </div>
  );
}
