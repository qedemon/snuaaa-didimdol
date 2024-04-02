import { QRPage } from "../../../Modal";
import AdminImg from "./Assets/admin.png";
/*import QRImg from "./Assets/QR.png"
import LoginImg from "./Assets/login.png";
import LogOutImg from "./Assets/logout.png";
import RegisterImg from "./Assets/register.png";
import AttendantImg from "./Assets/attendant.png";*/

import {ReactComponent as D} from "./Assets/D.svg";
import {ReactComponent as O} from "./Assets/O.svg"
import {ReactComponent as I} from "./Assets/I.svg";
import {ReactComponent as SD} from "./Assets/SD.svg";

function getIcons({auth, navigate, modalController}){
    return [
        ...auth?.authorized?
        [
            ...auth?.userInfo?.isAdmin?
            [
                {
                    label: "가입자 정보",
                    img: AdminImg,
                    callback: ()=>{
                        navigate(`../../Admin`)
                    }
                }
            ]:
            [],
            ...auth?.userInfo?.isStaff?
            [
                {
                    label: "QR 생성",
                    svg: D,
                    callback: ()=>{
                        modalController.setChildren(
                            {
                                component: QRPage,
                                props: {
                                    userInfo: auth.userInfo
                                }
                            }
                        );
                        modalController.open();
                    }
                },
                {
                    svg: I,
                    label: "출석 체크",
                    callback: ()=>{
                        navigate("Attendant");
                    }
                },
                {
                    svg: O,
                    label: "현황 확인",
                    callback: ()=>{
                        navigate("StatusCheck");
                    }
                }
            ]:
            [],
            /*{
                label: "로그아웃",
                img: LogOutImg,
                callback: ()=>{
                    auth.logout();
                    navigate("/login");
                }
            }*/
        ]
        :
        [],
        {
            svg: SD,
            label: "가입하기",
            callback: ()=>{
                navigate(`../../Register`)
            }
        },
    ]
}

export default getIcons;