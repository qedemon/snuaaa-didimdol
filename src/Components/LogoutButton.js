import { useAuth } from "@contexts/AuthContext";

import style from "./LogoutButton.module.css";

export default function LogoutButton() {
  const { logout } = useAuth(true);

  const handleClick = (e) => {
    e.stopPropagation();
    logout();
  };

  return (
    <div className={style.logoutButton} onClick={handleClick}>
      <p>Log out</p>
    </div>
  );
}
