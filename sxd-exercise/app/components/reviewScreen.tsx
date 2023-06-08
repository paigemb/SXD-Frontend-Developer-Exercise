import { ReviewTypestate, ConfirmReviewEvent } from "../../machines/machine";
import { Formik, Form } from "formik";
import { Fragment } from "react";

export interface ReviewScreenProps {
  state: ReviewTypestate;
  onSubmit(event: ConfirmReviewEvent): void;
}

export function ReviewScreen({ state, onSubmit }: ReviewScreenProps) {
  return (
    <div style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial"}}>
      <h3 className="font-bold text-gray-800 p-2" >Review your information below:</h3>
      <Formik
        initialValues={{}}
        onSubmit={() => {
          onSubmit({
            type: "CONFIRM_REVIEW"
          });
        }}
      >
        <Form className="form p-4">
          <h4 className="font-bold text-gray-800 p-2 text-center">Basic Info</h4>
          <dl>
            <dt className="font-bold text-gray-800 p-2">Name</dt>
            <dd>{state.context.basicInfo.firstName}{state.context.basicInfo.lastName}</dd>
            <dt className="font-bold text-gray-800 p-2">Age</dt>
            <dd>{state.context.basicInfo.age}</dd>
            <dt className="font-bold text-gray-800 p-2">Email</dt>
            <dd>{state.context.basicInfo.email}</dd>
          </dl>

          <h4 className="font-bold text-gray-800 p-2 text-center">Shipping Address</h4>
          <dl>
            <dt className="font-bold text-gray-800 p-2">Street</dt>
            <dd>{state.context.userAddress.street1}</dd>
            {state.context.userAddress.street2 && (
              <Fragment>
                <dt className="font-bold text-gray-800 p-2">Street 2</dt>
                <dd>{state.context.userAddress.street2}</dd>
              </Fragment>
            )}
            <dt className="font-bold text-gray-800 p-2">City</dt>
            <dd>{state.context.userAddress.city}</dd>
            <dt className="font-bold text-gray-800 p-2">State</dt>
            <dd>{state.context.userAddress.state}</dd>
            <dt className="font-bold text-gray-800 p-2">Zipcode</dt>
            <dd>{state.context.userAddress.zip}</dd>
          </dl>

          <button type="submit" className="px-4 py-2 w-40 bg-gray-700 text-white font-medium mt-4">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
