//parent machine, represens every form screen, so states are named after the screens
/*
import {Machine, assign } from "xstate";
import { UserData } from "./UserData.types";
import { UserDataMachineStates, UserDataMachineEvents, UserDataStates, UserDataEvents, UserDataMachineContext } from "./userDataMachine.types";
import { getUser } from "@/app/data/api";
import {updateMachine} from './updateMachine';
//init -> first state in which we will iniially check the user daa and conditionally redirect
//the user to a specfic screen
//basic is state representing the form part for updating first/last name, email, and phone data
//address is updating address data
//payment is updating payment data
//complete is state that we redirect to when all the user data is present and filled

export const userDataMachine = Machine<
  UserDataMachineContext,
  UserDataMachineStates,
  UserDataMachineEvents
>({
  id: 'userDataMachine',
  initial: UserDataStates.init,
  context: {
    error: false,
    errorMsg: '',
    userData: null,
  },
  states: {
    [UserDataStates.init]: {
      on: {
        [UserDataEvents.BASIC]: {
          target: UserDataStates.basic,
          actions: assign({
            userData: (_, {userData}) => userData,
          }),
        },
        [UserDataEvents.ADDRESS]: {
          target: UserDataStates.address,
          actions: assign({
            userData: (_, {userData}) => userData,
          }),
        },
        [UserDataEvents.PAYMENT]: {
          target: UserDataStates.payment,
          actions: assign({
            userData: (_, {userData}) => userData,
          }),
        },
      },
      invoke: {
        src: _ => async cb => {
          try {
            const userData = await getUser();

            const {
              firstName,
              lastName,
              age,
              street,
              city,
              state,
              zip,
              email,
              password
            } = userData;

            switch (null) {
              case firstName && lastName && email && age:
                cb({type: UserDataEvents.BASIC, userData});
                break;
              case street && city && code && country:
                cb({type: UserDataEvents.ADDRESS, userData});
                break;
              case account && creaditCardNo && creditCardExp && creditCardCvv:
                cb({type: UserDataEvents.PAYMENT, userData});
                break;
              default:
                cb({type: UserDataEvents.BASIC, userData});
                break;
            }
          } catch (e) {
            console.log(e.message);
          }
        },
      },
    },
    [UserDataStates.basic]: {
      on: {
        [UserDataEvents.NEXT]: {
          target: UserDataStates.address,
        },
      },
      invoke: {
        id: 'FormName',
        src: updateMachine,
        data: (ctx: UserDataMachineContext) => ctx,
        onDone: {
          target: UserDataStates.address,
          actions: assign({
            userData: (_, {data}) => data?.userData ?? null,
          }),
        },
      },
    },
    [UserDataStates.address]: {
      on: {
        [UserDataEvents.NEXT]: {
          target: UserDataStates.payment,
        },
        [UserDataEvents.BACK]: {
          target: UserDataStates.basic,
        },
      },
      invoke: {
        id: 'FormAddress',
        src: updateMachine,
        data: (ctx: UserDataMachineContext) => ctx,
        onDone: {
          target: UserDataStates.payment,
          actions: assign({
            userData: (_, {data}) => data?.userData ?? null,
          }),
        },
      },
    },
    [UserDataStates.payment]: {
      on: {
        [UserDataEvents.NEXT]: {
          target: UserDataStates.complete,
        },
        [UserDataEvents.BACK]: {
          target: UserDataStates.address,
        },
      },
      invoke: {
        id: 'FormPayment',
        src: updateMachine,
        data: (ctx: UserDataMachineContext) => ctx,
        onDone: {
          target: UserDataStates.complete,
          actions: assign({
            userData: (_, {data}) => data?.userData ?? null,
          }),
        },
      },
    },
    [UserDataStates.complete]: {
      on: {
        [UserDataEvents.BACK]: {
          target: UserDataStates.payment,
        },
      },
    },
  },
});
const userDataMachine = createMachine({
    id: "userDataMachine",
    initial: "init",
    context: {
        userData: null,
        error: false,
        errorMsg: ''
    },
    states: {
        init: {
          on: {
            BASIC: "basic",
            ADDRESS: "address",
            PAYMENT: "payment",
          },
        },
        basic: {
          on: {
            NEXT: "address",
          },
        },
        address: {
          on: {
            NEXT: "payment",
            BACK: "basic",
          },
        },
        payment: {
          on: {
            NEXT: "complete",
            BACK: "address",
          },
        },
        complete: {
          on: {
            BACK: "payment",
          },
        },
      },
    })
    */