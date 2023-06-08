"use client";

/*Imports */
import { useMachine } from "@xstate/react";
import { RegisterMachine } from "@/machines/machine";

import { InfoForm } from "../components/userInfo";
import { UserAddressScreen } from "../components/addressInfo";
import { TalentForm } from "../components/talent";
import { ReviewScreen } from "../components/reviewScreen";
import { SubmittedScreen } from "../components/submitedScreen";
import { FactForm } from "../components/funFacts";

/*If-else function that checks for state and returns the corresponding component
 *TODO: simplify this logic, maybe switch statements
 *onClick for back button functionality*/
export function Register() {
  const [state, send] = useMachine(RegisterMachine); //hook from xstate

  if (state.matches("basicInfo")) {
    return <InfoForm state={state} onSubmit={(event) => send(event)} />;
  } else if (state.matches("userAddress")) {
    return (
      <UserAddressScreen
        state={state}
        onSubmit={(event) => send(event)}
        onClick={(event) => send(event)}
      />
    );
  } else if (state.matches("facts")) {
    return (
      <FactForm
        state={state}
        onSubmit={(event) => send(event)}
        onClick={(event) => send(event)}
      />
    );
  } else if (state.matches("talent")) {
    return (
      <TalentForm
        state={state}
        onSubmit={(event) => send(event)}
        onClick={(event) => send(event)}
      />
    );
  } else if (state.matches("review")) {
    return (
      <ReviewScreen
        state={state}
        onSubmit={(event) => send(event)}
        onClick={(event) => send(event)}
      />
    );
  } else if (state.matches("submitted")) {
    return <SubmittedScreen state={state} />;
  } else {
    throw new Error("Form has entered unknown state.");
  }
}
