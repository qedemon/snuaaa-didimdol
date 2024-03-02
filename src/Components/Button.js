import Spinner from "./Spinner";

import style from "./Button.module.css";

export default function Button({
  className = "",
  children,
  onClick = () => {},
  pending = false,
  disabled = false,
}) {
  return (
    <button
      className={`${className} ${style.button}`}
      onClick={onClick}
      disabled={pending || disabled}
    >
      {pending ? <Spinner /> : children}
    </button>
  );
}
