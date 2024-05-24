import request from "../../../../Utility/Connection";

async function loadDidimdol(targetDidimdolClassId){
    if(targetDidimdolClassId){
        const {data} = await request.get(`/didimdolClass/getDidimdolClassById/${targetDidimdolClassId}`);
        if(data && data.didimdolClass){
            const {didimdolClass} = data;
            return didimdolClass;
        }
    }
}

export default loadDidimdol;