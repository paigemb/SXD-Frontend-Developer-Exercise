//render the screen's title, its children and buttons that will trigger different actions
//actions will b passed as props

import {ReactNode } from "react"

type FormWrapperProps = {
    //backBtnAction: () => void
    //nextBtnAction: () => void
    title: string
    children: ReactNode
}

export function FormWrapper({title, children}: FormWrapperProps) {
    return <>
    <h2 style={{textAlign:"center", margin: 0, marginBottom: "2rem"}}>{title}</h2>
    <div style={{display: "grid", gap: "1rem .5rem", justifyContent: "flex-start", gridTemplateColumns: "auto minmax(auto, 400px"}}>{children}</div> 
    </>
}