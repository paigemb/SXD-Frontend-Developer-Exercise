import { createMachine, assign } from "xstate";


//form is idle --> user starts typing --> submit
//two states: idle state and submitting state

export const stateMachine = createMachine({
    id: 'form',
    initial: 'editing',
    context: {
      retries: 0,
      name: '',
      email: '',
     // budget: '',
     // message: ''
    },
    states: {
      editing: {
        on: {
          SUBMIT: [
            {
              target: 'editing.name.error.empty',
              cond: 'isNameEmpty'
            },
            {
              target: 'editing.email.error.empty',
              cond: 'isEmailEmpty'
            },
            {
              target: 'editing.email.error.badFormat',
              cond: 'isEmailBadFormat'
            },
            {
              target: 'submitting'
            }
          ],
          INPUT: {
            target: 'editing',
            actions: 'cache'
          }
        },
        type: 'parallel',
        states: {
          name: {
            initial: 'valid',
            states: {
              valid: {},
              error: {
                initial: 'empty',
                states: {
                  empty: {}
                }
              }
            }
          },
          
          email: {
            initial: 'valid',
            states: {
              valid: {},
              error: {
                initial: 'empty',
                states: {
                  empty: {},
                  badFormat: {}
                }
              }
            }
          },
        }
      },
      submitting: {
        on: {
          RESOLVE: 'success',
          REJECT: 'failure'
        }
      },
      success: {
        type: 'final'
      },
      failure: {
        on: {
          RETRY: {
            target: 'submitting',
            actions: 'incrementRetry'
          }
        }
      }
    }
  }, {
    actions: {
      cache: assign((context, event) => event),
      incrementRetry: assign((context, event) => context.retries + 1)
    },
    guards: {
      isNameEmpty: context => context.name.length === 0,
      isEmailEmpty: context => context.email.length === 0,
      isEmailBadFormat: context => !context.email.includes('@'),
      //isBudgetEmpty: context => context.budget.length === 0,
      //isBudgetBadFormat: context => !context.budget.match(/^[0-9$]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/),
      //isBudgetTooLow: context => parseFloat(context.budget) < 1000,
      //isMessageEmpty: context => context.message.length === 0,
     // isMessageTooShort: context => context.message.length < 10
    }
  });
  