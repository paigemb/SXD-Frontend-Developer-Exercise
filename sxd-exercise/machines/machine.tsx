import { createMachine, assign } from "xstate";

interface UserInfo {
  firstName: string
  lastName: string
  age: string
}

interface AddressInfo {
  street: string
  city: string
  state: string
  zip: string;
}

export interface MultiStepFormMachineContext {
  userInfo?: UserInfo; 
  addressInfo?: AddressInfo;
  errorMessage?: string;
}


export type MultiStepFormMachineEvent =
  | {
      type: 'BACK';
    }
  | {
      type: 'CONFIRM_USER';
      info: UserInfo;
    }
  | {
      type: 'CONFIRM_ADDRESS';
      info: AddressInfo;
    }
  | {
      type: 'CONFIRM';
    };

const multiStepFormMachine = createMachine<
  MultiStepFormMachineContext,
  MultiStepFormMachineEvent
>(
  {id: 'multiStepForm',
  initial: 'enteringUser',
  states: {
    enteringUser: {
      on: {
        CONFIRM_USER: {
          target: 'enteringAddress',
          actions: ['assignUserInfoToContext'],
        },
      },
    },
    enteringAddress: {
      id: 'enteringAddress',
      on: {
        BACK: {
          target: 'enteringUser',
        },
        CONFIRM_ADDRESS: {
          target: 'confirming',
          actions: ['assignAddressToContext'],
        },
      },
    },
    confirming: {
      onDone: {
        target: 'success',
      },
      initial: 'idle',
      states: {
        idle: {
          exit: ['clearErrorMessage'],
          on: {
            CONFIRM: 'submitting',
            BACK: {
              target: '#enteringAddress',
            },
          },
        },
        submitting: {
          invoke: {
            src: 'submitPayment',
            onDone: {
              target: 'complete',
            },
            onError: {
              target: 'idle',
              actions: 'assignErrorMessageToContext',
            },
          },
        },
        complete: { type: 'final' },
      },
    },
    success: {
      type: 'final',
    },
  },
    /*id: 'multiStepFormWithValidation',
    initial: 'enteringUser',
    states: {
      enteringUser: {
        initial: 'idle',
        id: 'enteringUser',
        onDone: {
          target: 'enteringAddress',
        },
        states: {
          idle: {
            exit: ['clearErrorMessage'],
            on: {
              CONFIRM_USER: {
                target: 'submitting',
                actions: ['assignUserInfoToContext'],
              },
            },
          },
          submitting: {
            invoke: {
              src: 'validateUser',
              onDone: {
                target: 'complete',
              },
              onError: {
                target: 'idle',
                actions: 'assignErrorMessageToContext',
              },
            },
          },
          complete: { type: 'final' },
        },
      },
      enteringAddress: {
        id: 'enteringAddress',
        onDone: {
          target: 'confirming',
        },
        initial: 'idle',
        states: {
          idle: {
            exit: ['clearErrorMessage'],
            on: {
              CONFIRM_ADDRESS: {
                target: 'submitting',
                actions: ['assignAddressToContext'],
              },
              BACK: {
                target: '#enteringUser',
              },
            },
          },
          submitting: {
            invoke: {
              src: 'validateAddress',
              onDone: {
                target: 'complete',
              },
              onError: {
                target: 'idle',
                actions: 'assignErrorMessageToContext',
              },
            },
          },
          complete: { type: 'final' },
        },
      },
      confirming: {
        onDone: {
          target: 'success',
        },
        initial: 'idle',
        states: {
          idle: {
            exit: ['clearErrorMessage'],
            on: {
              CONFIRM: 'submitting',
              BACK: {
                target: '#enteringAddress',
              },
            },
          },
          submitting: {
            invoke: {
              src: 'submitPayment',
              onDone: {
                target: 'complete',
              },
              onError: {
                target: 'idle',
                actions: 'assignErrorMessageToContext',
              },
            },
          },
          complete: { type: 'final' },
        },
      },
      success: {
        type: 'final',
      },
    },*/
  },
  {
    //services: { 
   //   submitPayment: () => () => {}, 
      //validateUser: assign((_context, event) => {})},
    actions: {
      assignAddressToContext: assign((_context, event) => {
        if (event.type !== 'CONFIRM_ADDRESS') return {};
        return {
          addressInfo: event.info,
        };
      }),
      clearErrorMessage: assign({
        errorMessage: undefined,
      }),
      assignUserInfoToContext: assign((_context, event) => {
        console.log('hello')
        if (event.type !== 'CONFIRM_USER') return {};
        return {
          userInfo: event.info,
        };
      }),
      assignErrorMessageToContext: assign((_context, event: any) => {
        return {
          errorMessage: event.data?.message || 'An unknown error occurred',
        };
      }),
    },
  },
);

export default multiStepFormMachine;
