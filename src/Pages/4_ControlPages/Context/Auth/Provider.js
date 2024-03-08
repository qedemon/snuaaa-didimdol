import { useState, useEffect, useCallback } from "react";
import authContext from "./Context";
import request from "../../Utility/Connection";
import { setCookie } from "../../Utility/Cookie";

function Provider({children}){
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
    return (
        <authContext.Provider value={{...(auth??{}), setToken}}>
            {
                auth?
                children:
                (<></>)
            }
        </authContext.Provider>
    )
}

export default Provider;