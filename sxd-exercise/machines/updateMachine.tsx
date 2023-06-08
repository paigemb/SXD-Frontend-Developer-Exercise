/*import { createMachine, assign, EventObject, Machine } from "xstate";
import { UserData } from "./UserData.types";
import { UpdateEvents, UpdateMachineContext, UpdateMachineEvents, UpdateMachineStates, UpdateStates } from "./updateMachine.types";

//events = NEXT and ERROR
//we want to have access to all the user information fields as well as errors
//parameter is initial machine configuration, pass to it all the states, initial context, id, transitions, etc
/*
export const updateMachine = createMachine({
    id: "updateMachine",
    initial: "fetch",
    context: {
        userData: null,
        error: false,
        errorMsg: ''
    },
    states: {
      fetch: {
        on: {
            NEXT: "edit",
            ERROR:"edit",
        },
      },
      edit: {
        on: {
            NEXT: "pending",
        },
      },
      pending: {
        on: {
            NEXT: "done",
            ERROR:"edit",
        },
      },
      done: {
        type: "final",
      },
    },
  })()

  export const updateMachine = Machine<
  UpdateMachineContext,
  UpdateMachineStates,
  UpdateMachineEvents
>({
  id: 'updateMachine',
  initial: UpdateStates.fetch,
  context: {
    error: false,
    errorMsg: '',
    userData: null,
  },
  states: {
    [UpdateStates.fetch]: {
      on: {
        [UpdateEvents.NEXT]: { //whenever we send an event of type 'next' to the machine that is currently in fetch state, transition to edit
          target: UpdateStates.edit,
          actions: assign({
            error: _ => false,
            errorMsg: _ => '',
            userData: (_, {userData}) => userData,
          }),
        },
        [UpdateEvents.ERROR]: {
          target: UpdateStates.edit,
          actions: assign({ //assign updates machine's context
            error: _ => true, //in error state
            errorMsg: _ => 'Error',
          }),
        },
      },
    invoke: { //invoke twice, in fetch and in pending 
        src: _ => async cb => { //cb callback handler, call when acion is finished successfully
          try {
            await new Promise(res => setTimeout(res, 2000));
            cb({
              type: UpdateEvents.NEXT,
            });
          } catch (e) {
            cb({type: UpdateEvents.ERROR});
          }
        },
      },
    },
    [UpdateStates.edit]: {
      on: {
        [UpdateEvents.NEXT]: {
          target: UpdateStates.pending,
        },
      },
    },
    [UpdateStates.pending]: {
      on: {
        [UpdateEvents.NEXT]: {
          target: UpdateStates.done,
          actions: assign({
            error: _ => false,
            errorMsg: _ => '',
          }),
        },
        [UpdateEvents.ERROR]: {
          target: UpdateStates.edit,
          actions: assign({
            error: _ => true,
            errorMsg: _ => 'Error',
          }),
        },
      },
      invoke: {
        src: _ => async cb => { 
          try {
            await new Promise(res => setTimeout(res, 2000));
            cb({
              type: UpdateEvents.NEXT,
            });
          } catch (e) {
            cb({type: UpdateEvents.ERROR});
          }
        },
      },
    },
    [UpdateStates.done]: {
      type: 'final',
    },
  },
});*/