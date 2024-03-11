import { useAuth } from "@/Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function DashboardPage() {
  const auth = useAuth();
  const path = (
    (auth)=>{
      if(!auth?.user?.valid){
        return "/login";
      }
      if(auth?.user?.isAdmin || auth?.user?.isStaff){
        return "/control";
      }
      return "/enroll";
    }
  )(auth)
  return <Navigate to={path} />;
}
