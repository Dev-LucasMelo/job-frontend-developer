// components
export type MessageProps = {
    id: number
    autor: "client" | "server" 
    content: string
    status: "sent" | "finished"
    options?: string[]
};

//redux
export type passos = "welcome" | "qualification" | "marketplace" | "products" | "diagnosis" | "result"
export interface Ichatbot {
    messages: MessageProps[]
    passoAtual: passos
    historicoPassos: passos[]
    aguardandoResposta: boolean
}

// service

export type botParams = {
    ultimaMensagem: MessageProps
    passoAtual: passos
}