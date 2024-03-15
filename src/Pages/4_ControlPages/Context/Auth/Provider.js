//import { useState, useEffect, useCallback } from "react";
import authContext from "./Context";
//import request from "../../Utility/Connection";
//import { setCookie } from "../../Utility/Cookie";
import { useAuth as useRootAuth } from "@/Contexts/AuthContext";

function Provider({ children }) {
  const rootAuth = useRootAuth();
  /*
    const [auth, setAuth] = useState(null);
    const loadAuth = useCallback(
        ()=>{
            (
                async ()=>{
                    try{
                        const {data: auth} = await request.get("/user/whoAmI");
                        setAuth(auth);
                    }
                    catch{
                        setAuth({authorized: false});
                    }
                }
            )()
        },
        [setAuth]
    );
    const setToken = useCallback(
        (token)=>{
            setCookie("token", token);
            loadAuth()
        },
        [loadAuth]
    )
    useEffect(
        ()=>{
            if(auth === null){
                loadAuth();
            }
        },
        [auth, loadAuth]
    )
    */

  const auth = {
    authorized: rootAuth?.user?.valid ? true : false,
    userInfo: rootAuth?.user?.valid ? rootAuth.user : null,
    login: rootAuth.login,
    logout: rootAuth.logout,
  };

  return (
    <authContext.Provider value={auth}>
      {auth ? children : <></>}
    </authContext.Provider>
  );
}

export default Provider;
