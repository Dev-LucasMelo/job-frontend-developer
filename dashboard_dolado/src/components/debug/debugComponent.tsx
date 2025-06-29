'use client';

import { useAppSelector } from '@/store/hooks';
const Debug = () => {
    const mensagens = useAppSelector((state) => state.chatbot.messages)
    const aguardandoResposta = useAppSelector((state) => state.chatbot.waitingReply)
    const historicoPassos = useAppSelector((state) => state.chatbot.stepHistory)
    const passoAtual = useAppSelector((state) => state.chatbot.currentStep)

    return (
        <>
            <h1>estado atual da aplicação</h1>

            {mensagens.map((msg,index) =>(
                <p key={msg.id}>
                    {msg.results?.message}
                    <br />
                    {msg.results?.diagnosis.potential}
                </p>
            ))}
        </>
    );
}

export default Debug;