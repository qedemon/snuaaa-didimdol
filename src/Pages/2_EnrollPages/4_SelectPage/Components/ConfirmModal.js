import Modal from "@components/Modal";
import Button from "@components/Button";

import CharacterConfirm from "@images/CharacterConfirm.svg";
import style from "./ConfirmModal.module.css";

export default function ConfirmModal({
  onClose,
  onSubmit,
  classList,
  pending,
  error,
}) {
  return (
    <Modal className={style.confirmModal} onClose={onClose}>
      <h1 className={style.confirmModalHeader}>디딤돌 신청 현황</h1>
      <ul className={style.classList}>
        {classList.map((el, idx) => (
          <li key={idx} className={style.classListItem}>
            <p>
              {idx + 1}지망: {el.title}조 ({el.daytime.day}요일 오후{" "}
              {el.daytime.start})
            </p>
          </li>
        ))}
      </ul>
      <img className={style.image} src={CharacterConfirm} alt="character" />
      <Button
        className={style.submitButton}
        onClick={onSubmit}
        pending={pending}
      >
        제출하기
      </Button>
      {error && <p className={style.error}>{error.message}</p>}
    </Modal>
  );
}
