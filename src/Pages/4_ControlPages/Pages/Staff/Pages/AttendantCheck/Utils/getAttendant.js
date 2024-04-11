import getAttendantTitle from "./getAttendantTitle";

function getAttendant(didimdolClass, at){
    const title = getAttendantTitle(at);
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
        date: at,
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

export default getAttendant;