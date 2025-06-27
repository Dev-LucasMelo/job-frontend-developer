export type MessageProps = {
    id: number
    autor: "client" | "server" 
    content: string
    options?: string[]
};

//redux 
export interface Ichatbot {
    messages: MessageProps[]
}