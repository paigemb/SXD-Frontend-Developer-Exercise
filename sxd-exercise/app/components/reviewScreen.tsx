/*Imports */
import {
  ReviewTypestate,
  ConfirmReviewEvent,
  BackEvent,
} from "../../machines/machine";
import { Formik, Form } from "formik";
import { Fragment } from "react";
import React, { MouseEvent } from "react";

export interface ReviewScreenProps {
  state: ReviewTypestate;
  onSubmit(event: ConfirmReviewEvent): void;
  onClick(event: BackEvent): void;
}

export function ReviewScreen({ state, onSubmit, onClick }: ReviewScreenProps) {
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
      <h3 className="font-bold text-gray-800 p-2">
        Please review your information below:
      </h3>
      <Formik
        initialValues={{}}
        onSubmit={() => {
          onSubmit({
            type: "CONFIRM_REVIEW",
          });
        }}
      >
        <Form className="form p-4">
          <div
            style={{
              //position: "relative",
              background: "white",
              border: "1px solid black",
              padding: "2rem",
              margin: "1rem",
              borderRadius: ".5rem",
              fontFamily: "Arial",
            }}
          >
            <h4 className="font-bold text-gray-800 p-2 text-left">
              Name: {state.context.basicInfo.firstName}{" "}
              {state.context.basicInfo.lastName}
            </h4>
            <h4 className="font-bold text-gray-800 p-2 text-left">
              Age: {state.context.basicInfo.age}
            </h4>
            <h4 className="font-bold text-gray-800 p-2 text-left">
              Email: {state.context.basicInfo.email}
            </h4>
            <h4 className="font-bold text-gray-800 p-2 text-left">
              Street 1: {state.context.userAddress.street1}
            </h4>
            {state.context.userAddress.street2 && (
              <Fragment>
                <h4 className="font-bold text-gray-800 p-2 text-left">
                  Street 2: {state.context.userAddress.street2}{" "}
                </h4>
              </Fragment>
            )}
            <h4 className="font-bold text-gray-800 p-2 text-left">
              City: {state.context.userAddress.city}
            </h4>
            <h4 className="font-bold text-gray-800 p-2 text-left">
              State: {state.context.userAddress.state}
            </h4>
            <h4 className="font-bold text-gray-800 p-2 text-left">
              Zipcode: {state.context.userAddress.zip}
            </h4>

            <h4 className="font-bold text-gray-800 p-2 text-left">
              Favorite Movie: {state.context.facts.favoriteMovie}
            </h4>
            <h4 className="font-bold text-gray-800 p-2 text-left">
              Favorite Book: {state.context.facts.favoriteBook}
            </h4>
            <h4 className="font-bold text-gray-800 p-2 text-left">
              Personality Type: {state.context.facts.personalityType}
            </h4>
            <h4 className="font-bold text-gray-800 p-2 text-left">
              Zodiac: {state.context.facts.zodiac}
            </h4>
            <h4 className="font-bold text-gray-800 p-2 text-left">
              Felonies: {state.context.facts.felonies}
            </h4>

            <h4 className="font-bold text-gray-800 p-2 text-left">
              Talent Description: {state.context.talent.talent}
            </h4>
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
          </div>
        </Form>
      </Formik>
    </div>
  );
}
