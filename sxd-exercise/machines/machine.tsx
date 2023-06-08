//xstate machine

import { assign, createMachine } from "xstate";

// Context

/*Context for User's info */
export interface BasicInfoContext {
  firstName: string; //text input
  lastName: string; //text input
  age: string; // number input
  email: string; //text input
}

/*Context for User's address */
export interface UserAddressContext {
  street1: string; //text input
  street2?: string; //optional text input
  city: string; //text input
  state: string; //text input
  zip: string; //text input
}

/*Context for User's fun facts */
export interface FactsContext {
  favoriteMovie: string; //text input
  favoriteBook: string; //text input
  personalityType: string; //select input
  zodiac: string; //select input
  felonies: string; //select input
}

/*Context for User's talent */
export interface TalentContext {
  talent: string; //text area input
}

/*Context for registering user */
export interface RegisterContext {
  basicInfo?: BasicInfoContext;
  userAddress?: UserAddressContext;
  facts?: FactsContext;
  talent?: TalentContext;
}

// Events --> transitions from one state to next

export interface ConfirmBasicInfoEvent {
  type: "CONFIRM_BASIC_INFO";
  value: BasicInfoContext;
}

export interface ConfirmUserAddressEvent {
  type: "CONFIRM_USER_ADDRESS";
  value: UserAddressContext;
}

export interface ConfirmFactsEvent {
  type: "CONFIRM_FACTS";
  value: FactsContext;
}

export interface ConfirmTalentEvent {
  type: "CONFIRM_TALENT";
  value: TalentContext;
}

export interface ConfirmReviewEvent {
  type: "CONFIRM_REVIEW";
}

/*Event to move backwards through the form */
export interface BackEvent {
  type: "BACK";
}

export type RegisterEvent =
  | ConfirmBasicInfoEvent
  | ConfirmUserAddressEvent
  | ConfirmFactsEvent
  | ConfirmTalentEvent
  | BackEvent
  | ConfirmReviewEvent;

// Typestates
// define current form of machine's global contex in given state

export interface BasicInfoTypestate {
  value: "basicInfo";
  //nothing has been saved yet, only need Register
  context: RegisterContext;
}

export interface UserAddressTypestate {
  value: "userAddress";
  //requires previous information
  context: RegisterContext & Required<Pick<RegisterContext, "basicInfo">>;
}

export interface FactsTypestate {
  value: "facts";
  context: RegisterContext &
    Required<Pick<RegisterContext, "userAddress">> &
    Required<Pick<RegisterContext, "basicInfo">>;
}

export interface TalentTypestate {
  value: "talent";
  context: RegisterContext &
    Required<Pick<RegisterContext, "facts">> &
    Required<Pick<RegisterContext, "userAddress">> &
    Required<Pick<RegisterContext, "basicInfo">>;
}

export interface ReviewTypestate {
  value: "review";
  context: Required<RegisterContext>;
}

/*Type needs everything before it saved so we can move backwards */
export interface BackTypestate {
  value: "back";
  context: RegisterContext &
    Required<Pick<RegisterContext, "talent">> &
    Required<Pick<RegisterContext, "facts">> &
    Required<Pick<RegisterContext, "userAddress">> &
    Required<Pick<RegisterContext, "basicInfo">>;
}

export interface SubmittedTypestate {
  value: "submitted";
  context: Required<RegisterContext>;
}

export interface RegisterTypestate {
  basicInfo: BasicInfoTypestate;
  userAddress: UserAddressTypestate;
  facts: FactsTypestate;
  review: ReviewTypestate;
  talent: TalentTypestate;
  submitted: SubmittedTypestate;
  back: BackTypestate;
}

// State Machine

export const RegisterMachine = createMachine<
  RegisterContext,
  RegisterEvent,
  RegisterTypestate[keyof RegisterTypestate]
>({
  id: "Register",
  context: {
    basicInfo: undefined,
    userAddress: undefined,
    facts: undefined,
    talent: undefined,
  },
  // Start at the basic info state
  initial: "basicInfo",
  states: {
    basicInfo: {
      on: {
        CONFIRM_BASIC_INFO: {
          actions: assign((ctx, evt) => ({
            ...ctx,
            basicInfo: evt.value,
          })),
          // Transition to the `userAddress` state next
          target: "userAddress",
        }, //no back button because it's the first step
      },
    },
    userAddress: {
      on: {
        CONFIRM_USER_ADDRESS: {
          actions: assign((ctx, evt) => ({
            ...ctx,
            userAddress: evt.value,
          })),
          // Transition to the `facts` state next
          target: "facts",
        },
        BACK: {
          target: "basicInfo",
        },
      },
    },
    facts: {
      on: {
        CONFIRM_FACTS: {
          actions: assign((ctx, evt) => ({
            ...ctx,
            facts: evt.value,
          })),
          // Transition to the `talent` state next
          target: "talent",
        },
        BACK: {
          target: "userAddress",
        },
      },
    },
    talent: {
      on: {
        CONFIRM_TALENT: {
          actions: assign((ctx, evt) => ({
            ...ctx,
            talent: evt.value,
          })),
          // Transition to the `review` state next
          target: "review",
        },
        BACK: {
          target: "facts",
        },
      },
    },
    review: {
      on: {
        CONFIRM_REVIEW: {
          // Transition to the `submitted` state next
          target: "submitted",
        },
        BACK: {
          target: "talent",
        },
      },
    },
    submitted: {
      type: "final", //no forward steps
    },
  },
});
