'use client';

import { useAppSelector } from '@/store/hooks';
const Debug = () => {
    const mensagens = useAppSelector((state) => state.chatbot.messages)

    return (
        <>
            <h1>estado atual da aplicação</h1>
            <br />
            {mensagens.map((msg) => (
                <p>
                    {msg.autor} 
                    <br />
                    {msg.content}
                    <br />
                </p>
            ))}
        </>
    );
}

export default Debug;