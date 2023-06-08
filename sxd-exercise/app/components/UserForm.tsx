import { StringMappingType } from "typescript";
import { FormWrapper } from "./FormWrapper";
//import { updateMachine } from "@/machines/updateMachine";
import multiStepFormMachine from "@/machines/machine";
import { useMachine } from "@xstate/react"
import { useEffect } from "react";
import { UpdateStates } from "@/machines/updateMachine.types";
import { send } from 'xstate'


type UserData = {
    firstName: string
    lastName: string
    age: string
}

type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

export function UserForm () {
const [ current, send] = useMachine(multiStepFormMachine);
    return (
        <FormWrapper title= "User Details">
        <label>First Name</label>
        <input 
        autoFocus 
        required 
        type="text" 
        value={current?.context?.userInfo?.firstName} 
        onChange={e => send("CONFIRM_USER", { firstName: e.target.value})}/>
        <label>Last Name</label>
        <input 
        required 
        type="text" 
        value={current?.context?.userInfo?.lastName} 
        onChange={e => send("CONFIRM_USER", { lastName: e.target.value})}/>
        <label>Age</label>
        <input required min={1} 
        type="number" 
        value={current?.context?.userInfo?.age} 
        onChange={e => send("CONFIRM_USER", { age: e.target.value})}/>

        </FormWrapper>
    )
}