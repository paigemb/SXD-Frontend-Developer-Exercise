import { assign, createMachine } from "xstate";

////////////////////////////////////
// Context
////////////////////////////////////

export interface BasicInfoContext {
  firstName: string; //text input
  lastName: string //text input
  age: string // number input
  email: string; //text input
}

export interface ShippingAddressContext {
  street1: string; //text input
  street2?: string; //optional text input
  city: string; //text input
  state: string; //text input
  zip: string; //text input
}


export interface FactsContext {
    favoriteMovie: string; //text input
    favoriteBook: string; //text input
    personalityType: string; //select input
    zodiac: string; //select input
    extra?: string; //optional text input
}

export interface CheckoutContext {
    basicInfo?: BasicInfoContext; 
    shippingAddress?: ShippingAddressContext;
    facts?: FactsContext;
  }
////////////////////////////////////
// Events
////////////////////////////////////

export interface ConfirmBasicInfoEvent {
  type: "CONFIRM_BASIC_INFO";
  value: BasicInfoContext;
}

export interface ConfirmShippingAddressEvent {
  type: "CONFIRM_SHIPPING_ADDRESS";
  value: ShippingAddressContext;
}

export interface ConfirmFactsEvent {
    type: "CONFIRM_FACTS";
    value: FactsContext
}


export interface ConfirmReviewEvent {
  type: "CONFIRM_REVIEW";
}

export type CheckoutEvent =
  | ConfirmBasicInfoEvent
  | ConfirmShippingAddressEvent
  | ConfirmFactsEvent
  | ConfirmReviewEvent;

////////////////////////////////////
// Typestates
// define current form of machine's global contex in given state
////////////////////////////////////

export interface BasicInfoTypestate {
  value: "basicInfo";
  //nothing has been saved yet, only need checkout
  context: CheckoutContext;
}

export interface ShippingAddressTypestate {
  value: "shippingAddress";
  //requires previous information 
  context: CheckoutContext & Required<Pick<CheckoutContext, "basicInfo">>;
}

export interface FactsTypestate {
    value: "facts";
    context: CheckoutContext & Required<Pick<CheckoutContext, "shippingAddress">> & Required<Pick<CheckoutContext, "basicInfo">>
}

export interface ReviewTypestate {
  value: "review";
  context: Required<CheckoutContext>;
}

export interface SubmittedTypestate {
  value: "submitted";
  context: Required<CheckoutContext>;
}

export interface CheckoutTypestate {
  basicInfo: BasicInfoTypestate;
  shippingAddress: ShippingAddressTypestate;
  facts: FactsTypestate;
  review: ReviewTypestate;
  submitted: SubmittedTypestate;
}

////////////////////////////////////
// Putting It All Together!
////////////////////////////////////

export const checkoutMachine = createMachine<
  CheckoutContext,
  CheckoutEvent,
  CheckoutTypestate[keyof CheckoutTypestate]
>({
  id: "checkout",
  context: {
    basicInfo: undefined,
    shippingAddress: undefined
    // ...
  },
  // Start at the basic info state
  initial: "basicInfo",
  states: {
    basicInfo: {
      on: {
        CONFIRM_BASIC_INFO: {
          actions: assign((ctx, evt) => ({
            ...ctx,
            basicInfo: evt.value
          })),
          // Transition to the `shippingAddress` state next
          target: "shippingAddress"
        }
      }
    },
    shippingAddress: {
      on: {
        CONFIRM_SHIPPING_ADDRESS: {
          actions: assign((ctx, evt) => ({
            ...ctx,
            shippingAddress: evt.value
          })),
          // Transition to the `facts` state next
          target: "facts"
        }
      }
    },
    facts: {
        on: {
          CONFIRM_FACTS: {
            actions: assign((ctx, evt) => ({
              ...ctx,
              facts: evt.value
            })),
            // Transition to the `review` state next
            target: "review"
          }
        }
      },
    review: {
      on: {
        CONFIRM_REVIEW: {
          // Transition to the `submitted` state next
          target: "submitted"
        }
      }
    },
    submitted: {
      type: "final"
    }
  }
});
