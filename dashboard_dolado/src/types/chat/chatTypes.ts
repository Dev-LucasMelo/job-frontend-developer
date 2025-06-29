import { Result } from "./botTypes";

// components
export type MessageProps = {
    id: number
    author: "client" | "server" 
    content: string
    status: "sent" | "finished"
    options?: string[]
    results?: Result
};

//redux
export type steps = "welcome" | "qualification" | "marketplace" | "products" | "diagnosis" | "result"
export interface Ichatbot {
    messages: MessageProps[]
    currentStep: steps
    stepHistory: steps[]
    waitingReply: boolean
}

// service

export type botParams = {
    lastMessage: MessageProps
    currentStep: steps
}