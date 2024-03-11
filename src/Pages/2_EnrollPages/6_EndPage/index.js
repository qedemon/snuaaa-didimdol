import Logo from "@components/Logo";

import style from "./index.module.css";
import Button from "@/Components/Button";
import { Link } from "react-router-dom";

export default function EndPage() {
  return (
    <div className={style.EndPage}>
      <div className={style.logoContainer}>
        <Logo className={style.logo} />
        <p className={style.endHeader}>디딤돌 신청이 완료되었습니다</p>
        <p className={style.endSecondHeader}>See you soon</p>
        <Link to="/"><Button className={style.button}>홈으로</Button></Link>
      </div>
      <p className={style.copyRight}>AAApp2024</p>
      <div />
    </div>
  );
}
