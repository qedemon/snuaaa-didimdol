import { useState, useEffect } from "react";
import axios from "@connections/NovaConnection";

async function loadEnv(){
    try{
        const response = await axios.get("/frontendEnv/", false);
        return response.data.values;
    }
    catch(e){
        console.log(e);
    }
}

function useEnv(){
    const [loadedEnv, setLoadedEnv] = useState(null);
    useEffect(
        ()=>{
            if(loadedEnv===null){
                (
                    async()=>{
                        const env = await loadEnv();
                        setLoadedEnv(env);
                    }
                )();
            }
        },
        [loadedEnv, setLoadedEnv]
    )
    return loadedEnv;
}

export {useEnv};