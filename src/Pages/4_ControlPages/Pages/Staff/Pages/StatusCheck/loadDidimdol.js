import request from "../../../../Utility/Connection";

async function loadDidimdol(auth){
    const targetDidimdolClass = (auth.userInfo?.didimdolClass?.belongs??[]).filter(({role})=>["lecturer", "assistant"].includes(role))[0]
    if(targetDidimdolClass){
        const targetDidimdolClassId = targetDidimdolClass?.didimdolClass._id;
        const {data} = await request.get(`/didimdolClass/getDidimdolClassById/${targetDidimdolClassId}`);
        if(data && data.didimdolClass){
            const {didimdolClass} = data;
            return didimdolClass;
        }
    }
}

export default loadDidimdol;