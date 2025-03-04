import DashBoard from "@/Pages/3_MainPages/DashboardPage/Dashboard";
import { DetailedViewContainer } from "./Components";

function DetailedView({user}){
    console.log(user);
    return (
        <DetailedViewContainer>
            <DashBoard user={user}></DashBoard>
        </DetailedViewContainer>
    )
}

export default DetailedView;