/*2nd Form Component for collecting address information*/

/*Imports */
import React, { MouseEvent } from "react";
import {
  UserAddressContext,
  UserAddressTypestate,
  ConfirmUserAddressEvent,
  ConfirmBasicInfoEvent,
  BackEvent,
} from "../../machines/machine";

import { Formik, Form, Field } from "formik";

export interface UserAddressScreenProps {
  state: UserAddressTypestate;
  onSubmit(event: ConfirmUserAddressEvent): void;
  onClick(event: BackEvent): void;
}

export function UserAddressScreen({
  state,
  onSubmit,
  onClick,
}: UserAddressScreenProps) {
  const initialValues: UserAddressContext = {
    street1: state.context.userAddress?.street1 ?? "",
    street2: state.context.userAddress?.street2, //this is an optional field
    city: state.context.userAddress?.city ?? "",
    state: state.context.userAddress?.state ?? "",
    zip: state.context.userAddress?.zip ?? "",
  };
  /*Helper function for back button
   *TODO: make this a util to reduce redundancy */
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
      <h1>Please enter your address</h1>

      <Formik<UserAddressContext>
        initialValues={initialValues}
        onSubmit={(values) => {
          onSubmit({
            type: "CONFIRM_USER_ADDRESS",
            value: {
              street1: values.street1,
              street2: values.street2,
              city: values.city,
              state: values.state,
              zip: values.zip,
            },
          });
        }}
      >
        <Form>
          <div className="form w-full flex p-4">
            <div className="p-4">
              <label className="font-bold text-gray-800 p-2" htmlFor="street1">
                Street 1
              </label>
              <Field
                id="street1"
                name="street1"
                className="p-2 bg-gray-50 border border-gray-100"
                required
              />
            </div>

            <div className="p-4">
              <label className="font-bold text-gray-800 p-2" htmlFor="street2">
                Street 2
              </label>
              <Field
                id="street2"
                name="street2"
                className="p-2 bg-gray-50 border border-gray-100"
              />
            </div>
          </div>
          <div className="w-full flex p-4">
            <div className="p-4">
              <label className="font-bold text-gray-800 p-2" htmlFor="city">
                City
              </label>
              <Field
                id="city"
                name="city"
                className="p-2 bg-gray-50 border border-gray-100"
                required
              />
            </div>

            <div className="p-4">
              <label className="font-bold text-gray-800 p-2" htmlFor="state">
                State
              </label>
              <Field
                id="state"
                name="state"
                className="p-2 bg-gray-50 border border-gray-100"
                required
              />
            </div>
          </div>
          <div className="text-center p-4">
            <label className="font-bold text-gray-800 p-2" htmlFor="zipcode">
              Zipcode
            </label>
            <Field
              id="zip"
              name="zip"
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
