const { default: getAttendantTitle } = require("./getAttendantTitle")

test("getAttendantTitle", ()=>{
    expect(getAttendantTitle(new Date("2024-04-04T01:00:00+09:00"))).toBe("2024. 4. 3. 디딤돌");
})