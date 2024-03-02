import LogoImage from "../Assets/Images/Characters.svg";

import style from "./Logo.module.css";

export default function Logo({ className = "" }) {
  return (
    <div className={`${className} ${style.logoContainer}`}>
      <img className={style.logoImage} src={LogoImage} alt="Logo" />
      <h1 className={style.logoTitle}>DIDIMDOL</h1>
      <h2 className={style.logoSecondTitle}>snu.aaa</h2>
    </div>
  );
}
