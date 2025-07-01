import { MessageProps } from "@/types/chat/chatTypes";

const TypingIndicator = (props: Pick<MessageProps, "author">) => {
    const styles = {
        client: "flex space-x-2 items-center h-6 mb-3 p-2 bg-gray-200 w-11 rounded-tr-xl rounded-bl-xl rounded-br-xl",
        server: "d-none"
    }

    return (
        <div className={styles[props.author]}>
            <span className="typing-dot typing-delay-0" />
            <span className="typing-dot typing-delay-1" />
            <span className="typing-dot typing-delay-2" />
        </div>
    );
}

export default TypingIndicator;