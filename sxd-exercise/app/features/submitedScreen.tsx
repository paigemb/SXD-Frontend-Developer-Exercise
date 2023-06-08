import { SubmittedTypestate } from "./state";

export interface SubmittedScreenProps {
  state: SubmittedTypestate;
}

export function SubmittedScreen({ state }: SubmittedScreenProps) {
  return (
    <div>
      <h3>Order Submitted!</h3>
      <p>Nice work, {state.context.basicInfo.firstName}!</p>
      <p>A confirmation has been sent to {state.context.basicInfo.email}.</p>
    </div>
  );
}
