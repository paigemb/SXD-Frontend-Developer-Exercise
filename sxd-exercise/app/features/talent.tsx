/*Component for collecing user's name and email */

import {
    TalentContext,
    TalentTypestate,
    ConfirmTalentEvent
  } from "./state";

  import { Formik, Form, Field } from "formik";
  

  export interface InfoFormProps {
    state: TalentTypestate;
    onSubmit(event: ConfirmTalentEvent): void;
  }
  
  export function TalentForm({ state, onSubmit }: InfoFormProps) {
    // Define the initial values of the form using machine context
    const initialValues: TalentContext = {
      talent: state.context.talent?.talent ?? "",
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

        <h1>Tell us a bit about your talent:</h1>

        <Formik<TalentContext>
          initialValues={initialValues}
          onSubmit={(values) => {
            // Submit the `CONFIRM_TALENT` event on form submission
            onSubmit({
              type: "CONFIRM_TALENT",
              value: {
               talent: values.talent
              }
            });
          }}
        >
            
           
          <Form className="form p-4">
          <div className="w-full flex flex col p-4">

            <label className="font-bold text-gray-800 p-2" htmlFor="firstName"> </label>
            <Field as="textarea" id="firstName" name="firstName" className="p-2 bg-gray-50 border border-gray-100" required />
            </div>
            <button type="submit" className="px-4 py-2 w-40 bg-gray-700 text-white font-medium mt-4">Next</button>
          </Form>
         
        </Formik>
      </div>
    );
  }
  