"use client";
import { useMachine } from "@xstate/react";
import { BackEvent, RegisterMachine } from "@/machines/machine";
import { InfoForm } from "../components/userInfo";
import { UserAddressScreen } from "../components/addressInfo";
import { TalentForm } from "../components/talent";
import { ReviewScreen } from "../components/reviewScreen";
import { SubmittedScreen } from "../components/submitedScreen";
import { FactForm } from "../components/funFacts";

export function Register() {
  const [state, send] = useMachine(RegisterMachine);

  if (state.matches("basicInfo")) {
    return <InfoForm state={state} onSubmit={(event) => send(event)} />;
  } else if (state.matches("userAddress")) {
    return (
      <UserAddressScreen state={state} onSubmit={(event) => send(event)} onClick={(event) => send(event)} />
    );
  } else if (state.matches("facts")) {
    return (
      <FactForm state={state} onSubmit={(event) => send(event)} onClick={(event) => send(event)} />
    )
  }
  else if (state.matches("talent")) {
    return (
      <TalentForm state={state} onSubmit={(event) => send(event)}  onClick={(event) => send(event)}/>
    )
  }
    else if (state.matches("review")) {
    return <ReviewScreen state={state} onSubmit={(event) => send(event)} onClick={(event) => send(event)} />;
  } 
 
  else if (state.matches("submitted")) {
    return <SubmittedScreen state={state} />;
  } else {
    throw new Error("Form has entered unknown state.");
  }
}
