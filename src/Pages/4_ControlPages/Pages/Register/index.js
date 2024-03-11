import React, { useCallback, useRef, useState } from "react";
import { Background } from "./Components";
import { LaunchButton, RocketContentContainer } from "../../Components"
import {Form} from "../../Components";
import FormSchema from "./FormSchema";
import {useContext as useAuth} from "../../Context/Auth";
import {useContext as useModalController} from "../../Context/Modal";
import DepositPage from "./DepositPage";
import { useNavigate } from "react-router-dom";
import request from "../../Utility/Connection";
import { WelcomePage } from "../Modal";

function Register(props){
    const navigate = useNavigate();
    const formController = useRef();
    const modalController = useModalController().current;
    const auth = useAuth();
    const [submitPending, setSubmitPending] = useState(false);
    const register = useCallback(
        async (userInfo)=>{
            try{
                const {data} = await request.post("/user/register", userInfo);
                const {error} = data;
                if(error){
                    throw error
                }
                modalController.setChildren(
                    {
                        component: WelcomePage
                    }
                );
                modalController.open();
                await new Promise(
                    (resolve)=>{
                        setTimeout(
                            ()=>{
                                resolve(true);
                            },
                            2500
                        )
                    }
                );
                modalController.close();
                auth.login({id: userInfo.id, password: userInfo.password})
                navigate("../UserInfo");
            }
            catch(error){
                console.log(error);
                alert("가입 실패");
            }
        },
        [auth, modalController, navigate]
    )
    const openDepositWindow = useCallback(
        async ()=>{
            const userInfo = {
                name: formController.current.getValue("name"),
                colNo: formController.current.getValue("colNo")
            };
            
            modalController.setChildren(
                {
                    component: DepositPage,
                    props: {
                        userInfo: (
                            (userInfo)=>{
                                const {name, colNo} = userInfo;
                                return {name, colNo};
                            }
                        )(userInfo),
                        onSubmit: ()=>{
                            modalController.close();
                        }
                    }
                }
            );
            modalController.open();
        },
        [modalController, formController]
    )
    const onSubmit = useCallback(
        ()=>{
            if(submitPending){
                return;
            }
            setSubmitPending(true);
            setTimeout(
                ()=>{
                    setSubmitPending(false);
                }, 
                2500)
            ;
            (
                async ()=>{
                    try{
                        const formResult = await formController.current.getValues({requireSetMessage: true, requireSetValidation: true});
                        const [values, validation] = Object.entries(formResult)
                        .reduce(
                            ([data, validationResult], [key, {value, validation, asyncValidation}])=>{
                                return [
                                    {
                                        ...data,
                                        [key]: value
                                    },
                                    validationResult && validation.result && asyncValidation.result
                                ]
                            },
                            [{}, true]
                        );
                        if(validation){
                            await register(values);
                        }
                    }
                    catch(error){
                        console.log(error);
                    }
                    finally{
                        setSubmitPending(false);
                    }
                }
            )();
        },
        [register, submitPending, setSubmitPending]
    );
    return (
        <Background>
            <RocketContentContainer>
                <p className="title">AAA 2024</p>
                <p className="title">신입생 가입폼</p>
                <Form ref={formController} formSchema={FormSchema({openDepositWindow})} className="content"/>
                <LaunchButton onClick={onSubmit} className="content" disabled={submitPending}>{submitPending?"가입하는 중":"Sign Up"}</LaunchButton>
            </RocketContentContainer>
        </Background>
    )
}

export default Register;