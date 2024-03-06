import BackButtonImage from "@images/LeftArrow.svg";
import style from "./BackButton.module.css";

export default function BackButton({ onClick }) {
  return (
    <div className={style.backButton} onClick={onClick}>
      <img src={BackButtonImage} alt="back" />
    </div>
  );
}
