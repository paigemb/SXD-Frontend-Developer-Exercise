import { createMachine, assign, EventObject } from "xstate";
import { UserData } from "./UserData.types";

//events = NEXT and ERROR
//we want to have access to all the user information fields as well as errors

interface UpdateMachineContext {
    userData: UserData | null;
    error: boolean,
    errorMsg: string;
}
export enum UpdateStates {
    fetch = 'fetch',
    edit = 'edit',
    pending = 'pending',
    done = 'done',
  }
  export interface UpdateMachineStates {
    states: {
      [UpdateStates.fetch]: {},
      [UpdateStates.edit]: {},
      [UpdateStates.pending]: {},
      [UpdateStates.done]: {},
    };
  }  
  export enum UpdateEvents {
    NEXT = 'NEXT',
    ERROR = 'ERROR'
  }
  type EventTypesSchema = UpdateEvents.NEXT | UpdateEvents.ERROR

  export interface UpdateMachineEvents extends EventObject {
    type: EventTypesSchema;
  }
  
const updateMachine = createMachine({
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
  })