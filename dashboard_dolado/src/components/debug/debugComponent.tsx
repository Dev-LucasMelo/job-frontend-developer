'use client';

import { useAppSelector } from '@/store/hooks';
const Debug = () => {
    const mensagens = useAppSelector((state) => state.chatbot.messages)
    const aguardandoResposta = useAppSelector((state) => state.chatbot.aguardandoResposta)
    const historicoPassos = useAppSelector((state) => state.chatbot.historicoPassos)
    const passoAtual = useAppSelector((state) => state.chatbot.passoAtual)

    return (
        <>
            <h1>estado atual da aplicação</h1>
            <br />
            <h1>hora de fala: {aguardandoResposta ? "vez do client" : "vez do bot"}</h1>
            <br />
            <h1>passo atual: {passoAtual}</h1>
            <br />
            <h1>passos percorridos: {JSON.stringify(historicoPassos)}</h1>
            <br />
            <h1>mensagens:</h1>
            <br />
            {mensagens.map((msg,index) =>(
                <p key={index}>
                    {msg.autor}
                    <br />
                    {msg.status}
                </p>
            ))}
        </>
    );
}

export default Debug;