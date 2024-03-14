import React, { useCallback, useEffect } from "react";
import MembersInfo from "./MembersInfo";
import { useContext as useAuth } from "../../Context/Auth";
import { useNavigate } from "react-router-dom";

const menu = [
  {
    label: "가입현황",
    Component: MembersInfo,
  },
];

function Admin(props) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.userInfo?.isStaff) navigate("/StaffLogin");
  });

  const onChageMenu = useCallback((e) => {
    console.log(e.target.value);
  }, []);

  return auth?.userInfo?.isStaff ? (
    <>
      <select onChange={onChageMenu}>
        {menu.map((item, index) => {
          const { label } = item;
          return (
            <option key={index} value={item}>
              {label}
            </option>
          );
        })}
      </select>
      <MembersInfo />
    </>
  ) : (
    <></>
  );
}

export default Admin;
