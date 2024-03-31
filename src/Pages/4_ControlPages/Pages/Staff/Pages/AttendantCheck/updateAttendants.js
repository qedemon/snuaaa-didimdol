function updateAttendants(selectedIndex, userIndex, updateUser){
    return (attendants)=>{
        return [
            ...attendants.slice(0, selectedIndex),
            (
                (selectedAttendant)=>{
                    const students = selectedAttendant?.students??[];
                    return {
                        ...selectedAttendant,
                        students: [
                            ...students.slice(0, userIndex),
                            typeof(updateUser)==="function"?updateUser(students[userIndex], [selectedIndex, userIndex]):updateUser,
                            ...students.slice(userIndex+1)
                        ]
                    }
                }
            )(attendants[selectedIndex]),
            ...attendants.slice(selectedIndex+1)
        ]
    }
}

export default updateAttendants;