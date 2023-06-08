/*Component for collecing user's name and email */

import {
  BasicInfoContext,
  BasicInfoTypestate,
  ConfirmBasicInfoEvent,
} from "../../machines/machine";

import { Formik, Form, Field } from "formik";

export interface InfoFormProps {
  state: BasicInfoTypestate;
  onSubmit(event: ConfirmBasicInfoEvent): void;
}

export function InfoForm({ state, onSubmit }: InfoFormProps) {
  // Define the initial values of the form using machine context
  const initialValues: BasicInfoContext = {
    firstName: state.context.basicInfo?.firstName ?? "",
    lastName: state.context.basicInfo?.lastName ?? "",
    age: state.context.basicInfo?.age ?? "",
    email: state.context.basicInfo?.email ?? "",
  };

  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
      }}
    >
      <h1>First, please enter your name, age, and email address:</h1>

      <Formik<BasicInfoContext>
        initialValues={initialValues}
        onSubmit={(values) => {
          // Submit the `CONFIRM_BASIC_INFO` event on form submission
          onSubmit({
            type: "CONFIRM_BASIC_INFO",
            value: {
              firstName: values.firstName,
              lastName: values.lastName,
              age: values.age,
              email: values.email,
            },
          });
        }}
      >
        <Form>
          <div className="form w-full flex flex col p-4">
            <div className="p-4">
              <label
                className="font-bold text-gray-800 p-2"
                htmlFor="firstName"
              >
                First Name{" "}
              </label>
              <Field
                id="firstName"
                name="firstName"
                className="p-2 bg-gray-50 border border-gray-100"
                required
              />
              <label className="font-bold text-gray-800 p-2" htmlFor="age">
                Age{" "}
              </label>
              <Field
                id="age"
                name="age"
                type="number"
                min={10}
                className="p-2 bg-gray-50 border border-gray-100"
                required
              />
            </div>

            <div className="p-4">
              <label className="font-bold text-gray-800 p-2" htmlFor="lastName">
                Last Name{" "}
              </label>
              <Field
                id="lastName"
                name="lastName"
                className="p-2 bg-gray-50 border border-gray-100"
                required
              />
              <label className="font-bold text-gray-800 p-2" htmlFor="email">
                Email{" "}
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="p-2 bg-gray-50 border border-gray-100"
                required
              />
            </div>
          </div>
          <div className="w-full col p-6">
            <button
              type="submit"
              className="px-4 py-2 w-40 bg-gray-700 text-white font-medium mt-4"
            >
              Next
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
