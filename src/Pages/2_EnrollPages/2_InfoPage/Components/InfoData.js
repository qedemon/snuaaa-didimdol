import InfoCardFirst from "@images/InfoCardFirst.svg";
import InfoCardSecond from "@images/InfoCardSecond.svg";
import InfoCardThird from "@images/InfoCardThird.svg";
import InfoCardFourth from "@images/InfoCardFourth.svg";

import NoramlActivity1 from "@images/InfoCardPictures/NormalActivity 1.png";
import NoramlActivity2 from "@images/InfoCardPictures/NormalActivity 2.png";
import NoramlActivity3 from "@images/InfoCardPictures/NormalActivity 3.png";
import SpecialActivity1 from "@images/InfoCardPictures/SpecialActivity 1.png";
import SpecialActivity2 from "@images/InfoCardPictures/SpecialActivity 2.png";
import SpecialActivity3 from "@images/InfoCardPictures/SpecialActivity 3.png";

import style from "./InfoData.module.css";

const InfoData = [
  {
    title: (
      <h1 className={style.infoTitle}>
        디딤돌 참여를 위해 <br /> 필요한 것은 무엇인가요?
      </h1>
    ),
    pictures: [
      <div className={style.infoImageWrapper}>
        <img
          className={style.infoImage}
          src={InfoCardFirst}
          alt="Info character"
        />
      </div>,
    ],
    description: (
      <p className={style.infoDescription}>
        <span className={style.bold}>주 1회</span>, 동아리와 함께하는{" "}
        <span className={style.bold}>2시간</span>의 여유
      </p>
    ),
  },
  {
    title: <h1 className={style.infoTitle}>어떤 활동을 하나요?</h1>,
    pictures: [
      <div className={style.infoImageWrapper}>
        <img
          className={style.infoImage}
          src={InfoCardSecond}
          alt="Info character"
        />
        <img
          className={style.infoImage}
          src={InfoCardThird}
          alt="Info character"
        />
      </div>,
    ],
    description: (
      <p className={style.infoDescription}>
        디딤돌은 <span className={style.bold}>일반활동, 특수활동</span>
        <br />
        으로 구분하여 진행합니다.
      </p>
    ),
  },
  {
    title: <h1 className={style.infoTitle}>일반 활동</h1>,
    pictures: [
      <div key={0} className={style.infoImageWrapper}>
        <img
          className={style.infoImage}
          src={InfoCardSecond}
          alt="Info character"
        />
      </div>,
      <div key={1} className={style.infoImageWrapper}>
        <img
          className={style.infoImage}
          src={NoramlActivity1}
          alt="normal activity"
        />
      </div>,
      <div key={2} className={style.infoImageWrapper}>
        <img
          className={style.infoImage}
          src={NoramlActivity2}
          alt="normal activity"
        />
      </div>,
      <div key={3} className={style.infoImageWrapper}>
        <img
          className={style.infoImage}
          src={NoramlActivity3}
          alt="normal activity"
        />
      </div>,
    ],
    description: (
      <p className={style.infoDescription}>
        일반활동은 2시간 동안{" "}
        <span className={`${style.bold} ${style.pink}`}>강의 + 실습</span>으로
        구성된 활동을 합니다.
      </p>
    ),
  },
  {
    title: <h1 className={style.infoTitle}>특수 활동</h1>,
    pictures: [
      <div className={style.infoImageWrapper}>
        <img
          className={style.infoImage}
          src={InfoCardThird}
          alt="Info character"
        />
      </div>,
      <div key={1} className={style.infoImageWrapper}>
        <img
          className={style.infoImage}
          src={SpecialActivity1}
          alt="special activity"
        />
      </div>,
      <div key={2} className={style.infoImageWrapper}>
        <img
          className={style.infoImage}
          src={SpecialActivity2}
          alt="special activity"
        />
      </div>,
      <div key={3} className={style.infoImageWrapper}>
        <img
          className={style.infoImage}
          src={SpecialActivity3}
          alt="special activity"
        />
      </div>,
    ],
    description: (
      <p className={style.infoDescription}>
        특수활동은{" "}
        <span className={`${style.bold} ${style.pink}`}>
          2시간 동안 색다른 활동
        </span>
        을 합니다.
      </p>
    ),
  },
  {
    title: <h1 className={style.infoTitle}>확인하세요!</h1>,
    pictures: [
      <div className={style.infoImageWrapper}>
        <img
          className={style.infoImage}
          src={InfoCardFourth}
          alt="Info character"
        />
      </div>,
    ],
    description: (
      <p className={style.infoDescription}>
        각 조별로 일반활동, 특수활동 컨셉이 다르니 신청페이지에서 잘
        확인해주세요!
      </p>
    ),
  },
];

export default InfoData;
