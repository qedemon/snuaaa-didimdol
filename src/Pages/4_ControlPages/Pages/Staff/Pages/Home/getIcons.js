import { QRPage } from "../../../Modal";
import AdminImg from "./Assets/admin.png";
import QRImg from "./Assets/QR.png"
import LoginImg from "./Assets/login.png";
import LogOutImg from "./Assets/logout.png";
import RegisterImg from "./Assets/register.png";
import AttendantImg from "./Assets/attendant.png";

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
                    label: "출석 확인",
                    img: AttendantImg,
                    callback: ()=>{
                        navigate("Attendant");
                    }
                },
                {
                    label: "현황 확인",
                    callback: ()=>{
                        navigate("StatusCheck");
                    }
                }
            ]:
            [],
            {
                label: "로그아웃",
                img: LogOutImg,
                callback: ()=>{
                    auth.logout();
                    navigate("/login");
                }
            }
        ]
        :
        [
            {
                label: "로그인",
                img: LoginImg,
                callback: ()=>{
                    navigate("/login");
                }
            }
        ],
        {
            label: "가입하기",
            img: RegisterImg,
            callback: ()=>{
                navigate(`../../Register`)
            }
        },
    ]
}

export default getIcons;