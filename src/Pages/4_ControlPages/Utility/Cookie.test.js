import { getCookie } from "./Cookie";

it("cookie", ()=>{
    const token = getCookie("token");
    console.log(token);
})