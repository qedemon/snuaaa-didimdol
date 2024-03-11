import { Input } from "../../../Components";

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
            return (value.length>0)?
            {
                result: true
            }:
            {
                result: false,
                message: "적어도 한글자는 입력해 주세요."
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
    }
];

export default FormSchema;