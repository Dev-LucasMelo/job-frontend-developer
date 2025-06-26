'use-client';

type CardProps = {
    content: string
}

const Card = ({ content }: CardProps) => {
    return (
        <div className="border mx-auto h-90 w-85 bg-blue-600 text-white flex items-center justify-center text-2xl font-semibold rounded-lg shadow-lg">
            Card component {content}
        </div>
    );
}

export default Card;