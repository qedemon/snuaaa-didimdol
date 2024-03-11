import { Input} from "../../Components";

const FormSchema =  [
    {
        key: "id",
        label: "아이디",
        component: Input,
        property: {
            type: "text",
            placeholder: "아이디",
        },
        validate: ({value})=>{
            return (value.length>0)?
            {
                result: true
            }:
            {
                result: false,
                message: "적어도 한 글자 이상 입력해주세요."
            }
        }
    },
    {
        key: "password",
        label: "비밀번호",
        component: Input,
        property: {
            type: "password",
            placeholder: "비밀번호",
            sideButtonLabel: "Show"
        },
        validate: ({value})=>{
            return (/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value) && value.length>=8)?
            {
                result: true
            }:
            {
                result: false,
                message: "비밀번호는 알파벳 숫자 포함하여 8자 이상입니다."
            }
        },
        handlers: {
            onSideButtonClick: ({key, value}, controller)=>{
                controller.setField(key, "property", (property)=>{
                    return (property.type==="password")?
                        {
                            ...property,
                            type: "text",
                            sideButtonLabel: "Hide"
                        }:
                        {
                            ...property,
                            type: "password",
                            sideButtonLabel: "Show"
                        }
                });
            }
        }
    },
    {
        key: "passwordRetype",
        label: "비밀번호",
        component: Input,
        property: {
            type: "password",
            placeholder: "비밀번호 확인",
            sideButtonLabel: "Show"
        },
        validate: ({value}, controller)=>{
            return (value === controller.getValue("password"))?
            {
                result: true
            }:
            {
                result: false,
                message: "비밀번호가 일치하지 않습니다."
            }
        },
        watch: ["password"],
        handlers: {
            onSideButtonClick: ({key, value}, controller)=>{
                controller.setField(key, "property", (property)=>{
                    return (property.type==="password")?
                        {
                            ...property,
                            type: "text",
                            sideButtonLabel: "Hide"
                        }:
                        {
                            ...property,
                            type: "password",
                            sideButtonLabel: "Show"
                        }
                });
            }
        }
    },
]

export default FormSchema;