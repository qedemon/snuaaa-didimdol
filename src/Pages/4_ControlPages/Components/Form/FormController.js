import React, { useState } from "react";
import { FormItemContainer } from "./Components";

class FormController{
    constructor(formSchema){
        this.schema = formSchema;
    }
    getWatchers(key){
        return this.schema
        .filter(
            ({watch})=>{
                return watch && watch.some((watchKey)=>watchKey===key);
            }
        );
    }
    getValue(key){
        const item = this.schema.find(
            (item)=>{
                return item.key===key;
            }
        );
        return item?.ref?.value;
    }
    async getValues(options={}){
        return this.schema.reduce(
            async (last, {key, validate, asyncValidate})=>{
                const result = await last;
                const value = this.getValue(key);
                const validation = validate({key, value}, this);
                const asyncValidation = await ((typeof(asyncValidate)==="function")?asyncValidate({key, value}, this):Promise.resolve({result: true}));
                if(options?.requireSetMessage){
                    this.setMessage(key, validation.message || asyncValidation.message);
                }
                if(options?.requireSetValidation){
                    this.setValidation(key, validation.result && asyncValidation.result);
                }
                return {
                    ...result, 
                    [key]: {
                        value,
                        validation,
                        asyncValidation
                    }
                }
            }
            , Promise.resolve({})
        );
    }
    setMessage(key, message){
        this.setField(key, "message", message);
        this.update();
    }
    setValidation(key, validation){
        this.setField(key, "validation", validation);
        this.update();
    }
    getField(key, field){
        const item = this.schema.find(
            (item)=>{
                return item.key===key;
            }
        );
        return item?item[field]:undefined;
    }
    setField(key, field, value){
        const item = this.schema.find(
            (item)=>{
                return item.key===key;
            }
        );
        if(item){
            if(typeof value === "function"){
                item[field] = value(item[field]);
            }
            else
                item[field]=value;
            if(field!=="ref"){
                this.update();
            }
        }
    }
    _setSetSchema(setSchema){
        this._setSchema=setSchema;
    }
    update(){
        this._setSchema([...this.schema]);
    }
    updateRef(key){
        return (ref)=>{
            this.setField(key, "ref", ref);
        }
    }
    refreshValidation(key){
        const value = this.getValue(key);
        const {result, message} = this.getField(key, "validate")({key, value}, this);
        this.setMessage(key, message);
        this.setValidation(key, result);
        this.getWatchers(key).forEach(
            ({key, validate})=>{
                const value = this.getValue(key);
                const {result, message} = validate({key, value}, this);
                this.setMessage(key, message);
                this.setValidation(key, result);
            }
        );
    }
    render = ()=>{
        const [schema, setSchema] = useState(this.schema);
        this._setSetSchema(setSchema);
        return schema.map(
            ({key, validation, message, component: Component, handlers, property, add})=>{
                const onChange = (e)=>{
                    this.refreshValidation(key);
                }
                
                const formHandlers = Object.entries(handlers??{}).reduce(
                    (result, [handlerKey, handler])=>{
                        return {
                            ...result,
                            [handlerKey]: ()=>{
                                const value = this.getValue(key);
                                handler({key, value}, this);
                            }
                        }
                    },
                    {}
                );

                return (
                    <FormItemContainer key={key} className={!add?"without-add":""}>
                        <Component className="input" valid={validation} ref={this.updateRef(key)} onChange={onChange} {...formHandlers} {...property}/>
                        <div className="message">{message??'\u00A0'}</div>
                    </FormItemContainer>
                )
            }
        )
    }
}

export default FormController;