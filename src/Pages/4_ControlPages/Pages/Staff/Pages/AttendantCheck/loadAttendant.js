import request from "../../../../Utility/Connection";

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
                    const now = new Date(Date.now());
                    const nowTitle = (
                        (date)=>{
                            const year = date.getFullYear();
                            const month = date.getMonth() + 1;  // getMonth()는 0부터 시작하기 때문에 +1을 합니다.
                            const day = date.getDate();
                        
                            return `${year}. ${month}. ${day}. 디딤돌`;
                        }
                    )(now);

                    return Object.entries(
                        {
                            [nowTitle]: now,
                            ...didimdolClass?.attendant??{}
                        }
                    )
                    .map(
                        ([title, value])=>{
                            const [students, count] = (didimdolClass?.students??[])
                                .reduce(
                                    ([students, count], student)=>{
                                        const log = (student.attendant?.logs??{})[title];
                                        return [
                                            [
                                                ...students,
                                                {
                                                    ...student,
                                                    authenticatedAt: log?new Date(log.authenticatedAt):null
                                                }
                                            ],
                                            log?count+1:count
                                        ]
                                    },
                                    [[], 0]
                                );
                                
                            return {
                                title,
                                date: new Date(value),
                                students: students.sort(
                                        (A, B)=>{
                                            if(A.name<B.name)
                                                return -1;
                                            else if(A.name>B.name)
                                                return 1;
                                            else
                                                return 0;
                                        }
                                    ),
                                count
                            }
                        }
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