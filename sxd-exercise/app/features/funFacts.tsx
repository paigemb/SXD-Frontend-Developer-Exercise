/*Component for collecting user's info */

import {
    FactsContext,
    FactsTypestate,
    ConfirmFactsEvent
  } from "./state";

  import { Formik, Form, Field } from "formik";
  

  export interface FactsFormProps {
    state: FactsTypestate;
    onSubmit(event: ConfirmFactsEvent): void;
  }
  
  export function FactForm({ state, onSubmit }: FactsFormProps) {
    // Define the initial values of the form using machine context
    const initialValues: FactsContext = {
      favoriteMovie: state.context.facts?.favoriteMovie ?? "",
      favoriteBook: state.context.facts?.favoriteBook ?? "",
      personalityType: state.context.facts?.personalityType ?? "",
      zodiac: state.context.facts?.zodiac ?? "",
      extra: state.context.facts?.extra ?? "",
    };
  
    return (
      <div style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial"}}>

        <h1>Tell us more about you!</h1>

        <Formik<FactsContext>
          initialValues={initialValues}
          onSubmit={(values) => {
            // Submit the `CONFIRM_FACTS` event on form submission
            onSubmit({
              type: "CONFIRM_FACTS",
              value: {
                favoriteMovie: values.favoriteMovie,
                favoriteBook: values.favoriteBook,
                personalityType: values.personalityType,
                zodiac: values.zodiac,
                extra: values.extra
              }
            });
          }}
        >
            
           
          <Form className="form p-4">
          <div className="w-full flex flex col p-4">
            <label className="font-bold text-gray-800 p-2" htmlFor="favoriteMovie">Favorite Movie </label>
            <Field id="favoriteMovie" name="favoriteMovie" className="p-2 bg-gray-50 border border-gray-100" required />
            </div>
            <div className="w-full flex flex col p-4">
            <label className="font-bold text-gray-800 p-2" htmlFor="favoriteBook">Favorite Book </label>
            <Field id="favoriteBook" name="favoriteBook" className="p-2 bg-gray-50 border border-gray-100" required />
            </div>
            <div className="w-full flex flex col p-4">
            <label className="font-bold text-gray-800 p-2" htmlFor="personalityType">Personality Type </label>
            <Field id="personalityType" name="personalityType" className="p-2 bg-gray-50 border border-gray-100" required />
            </div>
            <div className="w-full flex flex col p-4">
            <label className="font-bold text-gray-800 p-2" htmlFor="zodiac">Zodiac Sign </label>
            <Field id="zodiac" name="zodiac" className="p-2 bg-gray-50 border border-gray-100" required />
            </div>
            <div className="w-full flex flex col p-4">
            <label className="font-bold text-gray-800 p-2" htmlFor="personalityType">Anyhing else to share: </label>
            <Field id="extra" name="extra" className="p-2 bg-gray-50 border border-gray-100" required />
            </div>
            <button type="submit" className="px-4 py-2 w-40 bg-gray-700 text-white font-medium mt-4">Next</button>
          </Form>
         
        </Formik>
      </div>
    );
  }
  