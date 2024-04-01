import React from "react";
import Shield from "@images/Shield.svg";
import style from "./StatusContainer.module.css";

function StatusContentContainer({status}){
    return (
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
    )
}

export default StatusContentContainer;