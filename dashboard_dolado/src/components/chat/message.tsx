import chatBotService from "@/services/chat";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { MessageProps } from "@/types/chat/chatTypes";
import { useRef } from "react";

const Message = (props: MessageProps) => {
    const { content, author, options, status, results } = props

    const messageStyle = {
        client: "bg-blue-600 text-white w-[90%] mb-3 p-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl self-end ",
        server: "bg-gray-200 w-[90%] mb-3 p-2 rounded-tr-xl rounded-bl-xl rounded-br-xl",
    }

    const dispatch = useAppDispatch()
    const service = useRef(new chatBotService(dispatch))
    const currentState = useAppSelector((state) => state.chatbot)

    async function chooseOption(message: string) {
        let updatedState = await service.current.sendMessageBySuggestion(message, currentState)

        setTimeout(() => {
            service.current.processResponse(updatedState)
        }, 3000);

    }

    return (
        <>
            <p className={messageStyle[author]}>
                {
                    content
                }
            </p>

            {
                results && (
                    <div className={messageStyle[author]}>

                        <span className="font-bold">
                            Diagnóstico:
                        </span>
                        <span> {results.diagnosis.stage}</span>
                        <br />
                        <br />
                        <span className="font-bold">Potencial:</span>
                        <br />
                        <br />
                        <span>{results.diagnosis.potential}</span>
                        <br />
                        <br />
                        <span className="font-bold">Insights:</span>
                        <br />
                        <br />
                        <span>{results.diagnosis.specificInsights}</span>
                        <br />
                        <br />
                        <span className="font-bold">Recomendações:</span>
                        <br />
                        <br />
                        <ul className="list-disc pl-5">
                            {
                                results.diagnosis.recommendations.map((recomendacao) => (
                                    <li key={recomendacao} >{recomendacao}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }

            {
                results?.nextSteps.options?.map((option, index) => (
                    <button
                        value={option}
                        onClick={(e) => chooseOption(option)}
                        key={index}
                        className="
                            text-left duration-300 border border-blue-600 mb-2 rounded-md p-1 cursor-pointer font-semibold bg-white-500 
                            hover:text-white hover:bg-blue-600
                            disabled:opacity-50 disabled:hover:bg-white disabled:text-black disabled:border-gray-600 disabled:cursor-not-allowed
                        "
                        disabled={status == "finished" ? true : false}
                    >
                        {option}
                    </button>
                ))
            }

            {
                options?.map((option, index) => (
                    <button
                        value={option}
                        onClick={(e) => chooseOption(option)}
                        key={index}
                        className="
                            text-left duration-300 border border-blue-600 mb-2 rounded-md p-1 cursor-pointer font-semibold bg-white-500 
                            hover:text-white hover:bg-blue-600
                            disabled:opacity-50 disabled:hover:bg-white disabled:text-black disabled:border-gray-600 disabled:cursor-not-allowed
                        "
                        disabled={status == "finished" ? true : false}
                    >
                        {option}
                    </button>
                ))
            }

        </>

    );
}

export default Message;