function getAttendantTitle(at){
    const year = at.getFullYear();
    const month = at.getMonth() + 1;  // getMonth()는 0부터 시작하기 때문에 +1을 합니다.
    const date = at.getDate();

    return `${year}. ${month}. ${date}. 디딤돌`;
}

export default getAttendantTitle;