import { QRPage } from "../../../Modal";
import AdminImg from "./Assets/admin.png";
import QRImg from "./Assets/QR.png"
import RegisterImg from "./Assets/register.png";
import AttendantImg from "./Assets/attendant.png";
import InspectImg from "./Assets/inspect.png"

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
                    img: QRImg,
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
                    img: AttendantImg,
                    label: "출석 체크",
                    callback: ()=>{
                        navigate("Attendant");
                    }
                },
                {
                    img: InspectImg,
                    label: "현황 확인",
                    callback: ()=>{
                        navigate("StatusCheck");
                    }
                }
            ]:
            [],
        ]
        :
        [],
        {
            img: RegisterImg,
            label: "가입하기",
            callback: ()=>{
                navigate(`../../Register`)
            }
        },
    ]
}

export default getIcons;