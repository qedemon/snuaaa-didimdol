import React, { useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Background, ChangePasswordContainer, ChangePasswordFormContainer } from "./Components";
import request from "../../Utility/Connection";
import { Form, LaunchButton } from "../../Components";
import FormSchema from "./FormSchema";

function ChangePassword(props){
    const navigate = useNavigate();
    const formController = useRef();
    const params = useParams();
    const passwordResetId = params?.passwordResetId;

    const [pending, setPending] = useState(false);

    const onSubmit = useCallback(
        (log, errorLog)=>async ()=>{
            const values = await formController.current.getValues(
                {
                    requireSetMessage: true, 
                    requireSetValidation: true
                }
            );
            if(
                !Object.values(values).every(
                    ({validation, asyncValidation})=>(validation.result && asyncValidation.result)
                )
            ){
                return;
            }
            setPending(true);
            try{
                const response = await request.post("/user/changePassword", 
                    {
                        id: values.id.value,
                        newPassword: values.password.value,
                        uuid: passwordResetId
                    }
                );
                const {result, user, error} = response.data;
                if(result===0){
                    log(`${user.name}에 대한 비밀번호를 성공적으로 변경하였습니다.`);
                    navigate("/");
                }
                else{
                    log(`비밀번호 변경 실패: ${error}`);
                }
            }
            catch(error){
                errorLog(error);
            }
            finally{
                setPending(false);
            }
        }
        ,
        [setPending, passwordResetId, navigate]
    )

    return (
        <Background>
            <ChangePasswordContainer>
                <h1>비밀번호 변경하기</h1>
                <ChangePasswordFormContainer>
                    <Form ref={formController} formSchema={FormSchema}/>
                </ChangePasswordFormContainer>
                <LaunchButton onClick={onSubmit(alert, console.log)} disabled={pending}>{pending?"변경 중":"비밀번호 변경"}</LaunchButton>
            </ChangePasswordContainer>
        </Background>
    )
}

export default ChangePassword;