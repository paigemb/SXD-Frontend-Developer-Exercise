"use client";
import { FormEvent, useState } from "react";
import { AccountForm } from "../components/AccountForm";
import { AddressForm } from "../components/AddressForm";
import { UserForm } from "../components/UserForm";
import { useMultistepForm } from "../components/useMultistepForm";
import { UserData } from "@/machines/UserData.types";
//import { userDataMachine } from "@/machines/userDataMachine";
import { useMachine } from "@xstate/react"

export default function ContactForm() {
    //const [current, send] = useMachine(userDataMachine)

    const INITIAL_DATA: UserData = {
        firstName: "",
        lastName: "",
        age: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        password: "" 
    }


    const [data, setData] = useState(INITIAL_DATA)

    function updateFields(fields: Partial<UserData>) {
        setData (prev => {
            return { ...prev, ...fields}
        })

    }

    const { steps, currentStepIndex, step, back, next} = 
    useMultistepForm([
    <UserForm />, 
    <AddressForm />]) 
    //<AccountForm {...data} updateFields={updateFields}/>])


    function onSubmit(e: FormEvent) {
        e.preventDefault() //preven default refreshing
        if (currentStepIndex != steps.length -1) return next()
        alert("Successfull Account Creation") //confirmation page
    }

    return (
        <><div style={{
            position: "relative",
            background: "white",
            border: "1px solid black",
            padding: "2rem",
            margin: "1rem",
            borderRadius: ".5rem",
            fontFamily: "Arial"
        }} ><form onSubmit={onSubmit}>
            <div style={{position: "absolute", top: ".5rem", right: ".5rem"}}>
                {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div style ={{ 
                marginTop: "1rem",
                display: "flex",
                gap: ".5rem",
                justifyContent: "flex-end"}}>
                    {currentStepIndex !== 0 && <button type="button" onClick={back}>Back</button> }
                    <button type="submit" >
                        {currentStepIndex != steps.length -1 ? "Next" : "Finish"}</button>
                </div>
        </form>
        </div></>
    )
}


/*
import { useMachine } from "@xstate/react";
import { useEffect, useState } from "react";
import { stateMachine } from "../../machines/machine";

export default function ContactForm() {
    const  [loading, setLoading] = useState(false);
    const [current, send] = useMachine(stateMachine)
    
    useEffect(() => {
       
      }, [current])

    async function handleSubmit(event:any) {
        event.preventDefault();

        const data = {
            name: String(event.target.name.value),
            email: String(event.target.email.value),
            //sign: String(event.target.zodiac.value)
        }
        /*const response = await fetch("/api/contact", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if(response.ok) {
            console.log("Message sent successfully");
            setLoading(false);
        }
        else {
            console.log("Error sending message")
            setLoading(true);
        }*/

  /*  
    }


    return (
        <form onSubmit={e => {
            e.preventDefault();
            send("SUBMIT");
        }}>
                <div className="w-full flex flex-col">
                    <label className="font-bold text-gray-800" htmlFor="name">Name</label>
                    <input type="text" 
                    className="p-4 bg-gray-50 border border-gray-100" 
                    id="name" 
                    required 
                    //value={current.context.name} 
                    onChange={e => send({
                        type: "INPUT",
                        value: e.target.value
                    })}/>
                </div>
                <div className="w-full flex flex-col">
                    <label className="font-bold text-gray-800" htmlFor="email">Email</label>
                    <input type="email" 
                    className="p-4 bg-gray-50 border border-gray-100" 
                    id="email"
                    required
                   // value={current.context.email}
                    onChange={e => send({
                        type: "INPUT",
                        value: e.target.value
                    })}/>
                </div>
               

                <button type="submit" 
                disabled={loading}
                className="px-4 py-2 w-40 bg-gray-700 disabled:bg-gray-400 disabled:text-gray-100 text-white font-medium mt-4">Submit</button>
            </form>
    )
}*/