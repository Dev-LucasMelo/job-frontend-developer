import React from "react";

export type MessageProps = {
    id: number
    autor: "client" | "server" 
    content: string
    options?: string[]
    setMensagem?: React.Dispatch<React.SetStateAction<string>>;
};

//redux 

export interface Ichatbot {
    messages: MessageProps[]
}