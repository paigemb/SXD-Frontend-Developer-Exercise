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

export interface UserAddressContext {
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
    felonies: string; //select input
}

export interface TalentContext {
    talent: string; //text area input
}

export interface RegisterContext {
    basicInfo?: BasicInfoContext; 
    userAddress?: UserAddressContext;
    facts?: FactsContext;
    talent?: TalentContext
  }
////////////////////////////////////
// Events
////////////////////////////////////

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

export type RegisterEvent =
  | ConfirmBasicInfoEvent
  | ConfirmUserAddressEvent
  | ConfirmFactsEvent
  | ConfirmTalentEvent
  | ConfirmReviewEvent;

////////////////////////////////////
// Typestates
// define current form of machine's global contex in given state
////////////////////////////////////

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
    context: RegisterContext & Required<Pick<RegisterContext, "userAddress">> & Required<Pick<RegisterContext, "basicInfo">>
}

export interface TalentTypestate {
    value: "talent";
    context: RegisterContext & Required<Pick<RegisterContext, "facts">> & Required<Pick<RegisterContext, "userAddress">> & Required<Pick<RegisterContext, "basicInfo">>
}

export interface ReviewTypestate {
  value: "review";
  context: Required<RegisterContext>;
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
}

////////////////////////////////////
// Putting It All Together!
////////////////////////////////////

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
    talent: undefined
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
          // Transition to the `userAddress` state next
          target: "userAddress"
        }
      }
    },
    userAddress: {
      on: {
        CONFIRM_USER_ADDRESS: {
          actions: assign((ctx, evt) => ({
            ...ctx,
            userAddress: evt.value
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
            // Transition to the `talent` state next
            target: "talent"
          }
        }
      },
      talent: {
        on: {
          CONFIRM_TALENT: {
            actions: assign((ctx, evt) => ({
              ...ctx,
              talent: evt.value
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
