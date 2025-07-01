import { MessageProps } from "@/types/chat/chatTypes";

const TypingIndicator = (props: Pick<MessageProps, "author">) => {
    const styles = {
        client: "flex space-x-2 items-center h-6 mb-3 p-2 bg-gray-200 w-11 rounded-tr-xl rounded-bl-xl rounded-br-xl",
        server: "d-none"
    }

    return (
        <div className={styles[props.author]}>
            <span
                className="w-1 h-1 bg-gray-600 rounded-full"
                style={{
                    animation: 'typingBlink 1.4s infinite',
                    animationDelay: '0s',
                }}
            />
            <span
                className="w-1 h-1 bg-gray-600 rounded-full"
                style={{
                    animation: 'typingBlink 1.4s infinite',
                    animationDelay: '0.2s',
                }}
            />
            <span
                className="w-1 h-1 bg-gray-600 rounded-full"
                style={{
                    animation: 'typingBlink 1.4s infinite',
                    animationDelay: '0.4s',
                }}
            />

            <style jsx>{`
        @keyframes typingBlink {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.2;
          }
          40% {
            transform: translateY(-3px);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
}

export default TypingIndicator;