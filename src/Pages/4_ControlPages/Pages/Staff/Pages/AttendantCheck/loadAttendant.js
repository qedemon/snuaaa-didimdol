import request from "../../../../Utility/Connection";
import getAttendant from "./Utils/getAttendant";
import getAttendantTitle from "./Utils/getAttendantTitle";

async function loadAttendant(auth){
    const targetDidimdolClass = (auth.userInfo?.didimdolClass?.belongs??[]).filter(({role})=>["lecturer", "assistant"].includes(role))[0]
    if(targetDidimdolClass){
        const targetDidimdolClassId = targetDidimdolClass?.didimdolClass._id;
        const timeout = new Promise(
            (resolve)=>{
                setTimeout(
                    ()=>{
                        resolve();
                    },
                    500
                )
            }
        )
        const {data} = await request.get(`/didimdolClass/getDidimdolClassById/${targetDidimdolClassId}`);
        if(data && data.didimdolClass){
            const {didimdolClass} = data;
            const attendantList = (
                (didimdolClass)=>{
                    const now = new Date();

                    return Object.values(
                        {
                            [getAttendantTitle(now)]: now,
                            ...didimdolClass?.attendant??{}
                        }
                    )
                    .map(
                        (at)=>getAttendant(didimdolClass, new Date(at))
                    )
                    .sort(
                        (A, B)=>B.date.getTime()-A.date.getTime()
                    )
                    .map(
                        (attendant, index, array)=>({...attendant, no: array.length-index})
                    )
                }
            )(didimdolClass);
            await timeout;
            return attendantList
        }
    }
}

export default loadAttendant;