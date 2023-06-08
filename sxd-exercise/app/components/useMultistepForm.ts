//Pass React components in array
//import { userDataMachine } from "@/machines/userDataMachine";
import { ReactElement, useEffect, useState } from "react";
import { useMachine } from "@xstate/react"
import { UserDataStates } from "@/machines/userDataMachine.types";

export function useMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    //const [current, send] = useMachine(userDataMachine)
   
    function next() {
    setCurrentStepIndex(i => {
        if (i >= steps.length -1) return i
        return i + 1
   })
}

    function back() {
        setCurrentStepIndex(i => {
            if (i <= 0 ) return i
            return i - 1
           })
    }

    function goTo(index: number) {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        goTo,
        next,
        back,
        steps
    }

}