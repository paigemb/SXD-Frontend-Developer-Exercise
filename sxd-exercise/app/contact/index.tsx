"use client";
import { useMachine } from "@xstate/react";
import { RegisterMachine } from "../features/state";
import { InfoForm } from "../features/userInfo";
import { UserAddressScreen } from "../features/shippingInfo";
import { ReviewScreen } from "../features/reviewScreen";
import { SubmittedScreen } from "../features/submitedScreen";
import { FactForm } from "../features/funFacts";

export function Register() {
  const [state, send] = useMachine(RegisterMachine);

  if (state.matches("basicInfo")) {
    return <InfoForm state={state} onSubmit={(event) => send(event)} />;
  } else if (state.matches("userAddress")) {
    return (
      <UserAddressScreen state={state} onSubmit={(event) => send(event)} />
    );
  } else if (state.matches("facts")) {
    return (
      <FactForm state={state} onSubmit={(event) => send(event)} />
    )
  }
    else if (state.matches("review")) {
    return <ReviewScreen state={state} onSubmit={(event) => send(event)} />;
  } else if (state.matches("submitted")) {
    return <SubmittedScreen state={state} />;
  } else {
    throw new Error("Form has entered unknown state.");
  }
}
