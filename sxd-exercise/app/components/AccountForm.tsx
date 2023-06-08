import multiStepFormMachine from "@/machines/machine";
import { useMachine } from "@xstate/react";
import { FormWrapper } from "./FormWrapper";

type AccountData = {
    email: string
    password: string
}

type AccountFormProps = AccountData & {
    updateFields: (fields: Partial<AccountData>) => void
}

export function AccountForm({email, password, updateFields}: AccountFormProps) {
    const [ current, send] = useMachine(multiStepFormMachine);
    return (
        <FormWrapper title="Account Creation">
        <label>Email</label>
        <input 
        autoFocus 
        required 
        type="email" 
        value={email}
        onChange={e => updateFields({ email: e.target.value} )}
        />
        <label>Password</label>
        <input 
        required
         type = "password"
         onChange={e => updateFields({ password: e.target.value} )} />
        </FormWrapper>
    )
}