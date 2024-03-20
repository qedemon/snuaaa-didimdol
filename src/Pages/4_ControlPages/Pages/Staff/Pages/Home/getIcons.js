import { QRPage } from "../../../Modal";
import QRImg from "./Assets/QR.png"
import LoginImg from "./Assets/login.png";
import LogOutImg from "./Assets/logout.png"

function getIcons(auth, {navigate, modalController}){
    console.log(auth);
    return [
        ...auth?.authorized?
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
        ]
    ]
}

export default getIcons;