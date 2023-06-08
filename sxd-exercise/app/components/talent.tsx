/*Component for collecing user's name and email */

import {
  TalentContext,
  TalentTypestate,
  ConfirmTalentEvent,
  BackEvent,
} from "../../machines/machine";

import { Formik, Form, Field } from "formik";
import React, { MouseEvent } from "react";

export interface InfoFormProps {
  state: TalentTypestate;
  onSubmit(event: ConfirmTalentEvent): void;
  onClick(event: BackEvent): void;
}

export function TalentForm({ state, onSubmit, onClick }: InfoFormProps) {
  // Define the initial values of the form using machine context
  const initialValues: TalentContext = {
    talent: state.context.talent?.talent ?? "",
  };

  const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick({
      type: "BACK",
    });
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
      <h1>Tell us a bit about your talent:</h1>

      <Formik<TalentContext>
        initialValues={initialValues}
        onSubmit={(values) => {
          // Submit the `CONFIRM_TALENT` event on form submission
          onSubmit({
            type: "CONFIRM_TALENT",
            value: {
              talent: values.talent,
            },
          });
        }}
      >
        <Form className="form p-4">
          <div className="w-full flex flex col p-4">
            <label className="font-bold text-gray-800 p-2" htmlFor="talent">
              {" "}
            </label>
            <Field
              as="textarea"
              id="talent"
              name="talent"
              className="p-2 bg-gray-50 border border-gray-100"
              required
            />
          </div>
          <div className="p-8">
            <div className="float-left  ">
              <button
                type="button"
                onClick={handleMouseEvent}
                className=" px-4 py-2 w-40 bg-gray-700 text-white font-medium mt-4 p-6"
              >
                Back
              </button>
            </div>
            <div className="float-right  ">
              <button
                type="submit"
                className=" px-4 py-2 w-40 bg-gray-700 text-white font-medium mt-4 p-6"
              >
                Next
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
