import { useState, useEffect } from "react";
import axios from "@connections/NovaConnection";

async function loadEnv(){
    try{
        const response = await axios.get("/frontendEnv/");
        return response.data.values;
    }
    catch(e){

    }
}

function useEnv(){
    const [loadedEnv, setLoadedEnv] = useState(null);
    useEffect(
        ()=>{
            if(loadedEnv===null){
                (
                    async()=>{
                        setLoadedEnv(await loadEnv());
                    }
                )();
            }
        },
        [loadedEnv, setLoadedEnv]
    )
    return loadedEnv;
}

export {useEnv};