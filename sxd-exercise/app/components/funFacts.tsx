/*Component for collecting user's info */

import {
    FactsContext,
    FactsTypestate,
    ConfirmFactsEvent
  } from "../../machines/machine";

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
      felonies: state.context.facts?.felonies ?? "",
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
                felonies: values.felonies
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
            <Field as="select" id="personalityType" name="personalityType" className="p-2 bg-gray-50 border border-gray-100" required >
                <option value="ISTJ">ISTJ</option>
                <option value="ISFJ">ISFJ</option>
                <option value="INFJ">INFJ</option>
                <option value="INTJ">INTJ</option>
                <option value="ISTP">ISTP</option>
                <option value="ISFP">ISFP</option>
                <option value="INFP">INFP</option>
                <option value="INTP">INTP</option>
                <option value="ESTP">ESTP</option>
                <option value="ESFP">ESFP</option>
                <option value="ENFP">ENFP</option>
                <option value="ENTP">ENTP</option>
                <option value="ESTJ">ESTJ</option>
                <option value="ESFJ">ESFJ</option>
                <option value="ENFJ">ENFJ</option>
                <option value="ENTJ">ENTJ</option>
                <option value="unknown">I don't know</option>
            </Field>
            </div>

            <div className="w-full flex flex col p-4">
            <label className="font-bold text-gray-800 p-2" htmlFor="zodiac">Zodiac Sign </label>
            <Field as="select" id="zodiac" name="zodiac" className="p-2 bg-gray-50 border border-gray-100" required >
            <option value="aries">Aries</option>
                <option value="taurus">Taurus</option>
                <option value="gemini">Gemini</option>
                <option value="cancer">Cancer</option>
                <option value="leo">Leo</option>
                <option value="virgo">Virgo</option>
                <option value="libra">Libra</option>
                <option value="scorpio">Scorpio</option>
                <option value="sagittarius">Sagittarius</option>
                <option value="capricorn">Capricorn</option>
                <option value="aquarius">Aquarius</option>
                <option value="pisces">Pisces</option>
                <option value="unknown">I don't know</option>
            </Field>
            </div>
            <div className="w-full flex flex col p-4">
            <label className="font-bold text-gray-800 p-2" htmlFor="personalityType">Felonies </label>
            <Field as="select" id="felonies" name="felonies" className="p-2 bg-gray-50 border border-gray-100" required >
                <option value="none">None</option>
                <option value="one">Just one</option>
                <option value="several">I lost count</option>
                </Field>
                
            </div>
            <button type="button" className="px-4 py-2 w-40 bg-gray-700 text-white font-medium mt-4">Back</button>
            <button type="submit" className="px-4 py-2 w-40 bg-gray-700 text-white font-medium mt-4">Next</button>
          </Form>
         
        </Formik>
      </div>
    );
  }
  