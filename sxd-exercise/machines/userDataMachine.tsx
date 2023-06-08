//parent machine

import { EventObject, createMachine } from "xstate";
import { UserData } from "./UserData.types";

//init -> first state in which we will iniially check the user daa and conditionally redirect
//the user to a specfic screen
//basic is state representing the form part for updating first/last name, email, and phone data
//address is updating address data
//payment is updating payment data
//complete is state that we redirect to when all the user data is present and filled

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
    