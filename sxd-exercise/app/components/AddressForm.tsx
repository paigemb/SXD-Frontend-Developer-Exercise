import multiStepFormMachine from "@/machines/machine";
import { useMachine } from "@xstate/react";
import { FormWrapper } from "./FormWrapper";

type AddressData = {
    street: string
    city: string
    state: string
    zip: string
}

type AddressFormProps = AddressData & {
    updateFields: (fields: Partial<AddressData>) => void
}

export function AddressForm() {
    const [ current, send] = useMachine(multiStepFormMachine);
    return (
    <FormWrapper title="Address">
    <label>Street</label>
    <input autoFocus
     required
      type="text"
      //value={street}
      onChange={e => send("CONFIRM_ADDRESS", { street: e.target.value})}
      />
    <label>City</label>
    <input required
     type="text"
     //value= {city}
     onChange={e => send("CONFIRM_ADDRESS", { city: e.target.value})}
     />
    <label>State</label>
    <input
     required 
     type="text"
     //value= {state}
     onChange={e => send("CONFIRM_ADDRESS", { state: e.target.value})}
     />
    <label>Zip</label>
    <input
     required 
     type="text"
     //value={zip}
     onChange={e => send("CONFIRM_ADDRESS", { zip: e.target.value})}
     />

    </FormWrapper>)
}