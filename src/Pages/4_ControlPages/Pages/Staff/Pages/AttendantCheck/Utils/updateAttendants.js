function updateAttendants(selectedKey, userIndex, updateUser){
    return (attendants)=>{
        return {
            ...attendants,
            [selectedKey]: (
                (selectedAttendant)=>{
                    const students = selectedAttendant?.students??[];
                    return {
                        ...selectedAttendant,
                        students: [
                            ...students.slice(0, userIndex),
                            typeof(updateUser)==="function"?updateUser(students[userIndex], [selectedKey, userIndex]):updateUser,
                            ...students.slice(userIndex+1)
                        ]
                    }
                }
            )(attendants[selectedKey]),
        }
    }
}

export default updateAttendants;