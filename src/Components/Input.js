import { useEffect, useState } from "react";
import style from "./Input.module.css";

export default function Input({
  className = "",
  name,
  value,
  placeholder = "",
  onChange = () => {},
  password = false,
  disabled = false,
  accepted = false,
  error = false,
}) {
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ name, value });
  };

  const handleShowPassword = (e) => {
    e.stopPropagation();
    setIsShowingPassword(true);
  };

  useEffect(() => {
    if (isShowingPassword) {
      const timerId = setTimeout(() => {
        setIsShowingPassword(false);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [isShowingPassword]);

  return (
    <div className={`${className} ${style.inputContainer}`}>
      <input
        className={`${style.input} ${error ? style.error : ""} ${
          accepted ? style.accepted : ""
        }`}
        name={name}
        type={!password || isShowingPassword ? "text" : "password"}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {password && (
        <p className={style.showPasswordButton} onClick={handleShowPassword}>
          Show
        </p>
      )}
    </div>
  );
}
