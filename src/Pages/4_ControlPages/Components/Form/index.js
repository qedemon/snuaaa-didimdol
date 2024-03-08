import React, {forwardRef, useRef} from "react";

import FormController from "./FormController";
const Form = forwardRef(
    ({formSchema, ...props}, ref)=>{
        const controllerRef = useRef(new FormController(formSchema));

        (
            (typeof(ref) === "function")?ref:(targetRef)=>{
                if(ref)
                    ref.current=targetRef.current;
            }
        )(controllerRef);

        return (
            <>
                {
                    controllerRef.current.render()
                }
            </>
        )
    }
)

export default Form;