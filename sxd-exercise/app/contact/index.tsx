"use client";
import { useMachine } from "@xstate/react";
import { checkoutMachine } from "../features/state";
import { InfoForm } from "../features/userInfo";
import { ShippingAddressScreen } from "../features/shippingInfo";
import { ReviewScreen } from "../features/reviewScreen";
import { SubmittedScreen } from "../features/submitedScreen";
import { FactForm } from "../features/funFacts";

export function Checkout() {
  const [state, send] = useMachine(checkoutMachine);

  if (state.matches("basicInfo")) {
    return <InfoForm state={state} onSubmit={(event) => send(event)} />;
  } else if (state.matches("shippingAddress")) {
    return (
      <ShippingAddressScreen state={state} onSubmit={(event) => send(event)} />
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
