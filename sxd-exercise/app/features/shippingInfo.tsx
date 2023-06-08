/*Component for collecting shipping information*/

import {
    ShippingAddressContext,
    ShippingAddressTypestate,
    ConfirmShippingAddressEvent
  } from "./state";

  import { Formik, Form, Field } from "formik";
  
  export interface ShippingAddressScreenProps {
    state: ShippingAddressTypestate;
    onSubmit(event: ConfirmShippingAddressEvent): void;
  }
  
  export function ShippingAddressScreen({
    state,
    onSubmit
  }: ShippingAddressScreenProps) {
    const initialValues: ShippingAddressContext = {
      street1: state.context.shippingAddress?.street1 ?? "",
      street2: state.context.shippingAddress?.street2,
      city: state.context.shippingAddress?.city ?? "",
      state: state.context.shippingAddress?.state ?? "",
      zip: state.context.shippingAddress?.zip ?? ""
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

        <h1>Please enter your shipping Address</h1>

        <Formik<ShippingAddressContext>
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmit({
              type: "CONFIRM_SHIPPING_ADDRESS",
              value: {
                street1: values.street1,
                street2: values.street2,
                city: values.city,
                state: values.state,
                zip: values.zip
              }
            });
          }}
        >
          <Form className="form p-4">
            <div className="w-full flex flex col p-4">
                <label  className="font-bold text-gray-800 p-2" htmlFor="street1">Street</label>
                <Field id="street1" name="street1" className="p-2 bg-gray-50 border border-gray-100" required />
            </div>
            <div className="w-full flex flex col p-4">
            <label  className="font-bold text-gray-800 p-2" htmlFor="street2">Street 2</label>
            <Field id="street2" name="street2" className="p-2 bg-gray-50 border border-gray-100" />
</div>
<div className="w-full flex flex col p-4">
            <label  className="font-bold text-gray-800 p-2" htmlFor="city">City</label>
            <Field id="city" name="city" className="p-2 bg-gray-50 border border-gray-100" required />
</div>
<div className="w-full flex flex col p-4">
            <label  className="font-bold text-gray-800 p-2" htmlFor="state">State</label>
            <Field id="state" name="state" className="p-2 bg-gray-50 border border-gray-100" required />
</div>
<div className="w-full flex flex col p-4">
            <label  className="font-bold text-gray-800 p-2" htmlFor="zipcode">Zipcode</label>
            <Field id="zip" name="zip" className="p-2 bg-gray-50 border border-gray-100" required />
            </div>
            <button type="submit" className="px-4 py-2 w-40 bg-gray-700 text-white font-medium mt-4">Next</button>
          </Form>
        </Formik>
      </div>
    );
  }
  