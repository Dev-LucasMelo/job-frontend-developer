'use-client';
import { CardProps } from "@/types/home/cardType";
import Image from 'next/image';

const Card = (props: Omit<CardProps, 'id'>) => {

    return (
        <div className="group relative border overflow-hidden mb-10 mx-auto h-90 w-75 bg-white text-white flex items-center justify-center text-2xl font-semibold rounded-lg shadow-xl/30 inset-shadow-2xsc">

            <Image
                src={props.image}
                width={100}
                height={100}
                color="blue"
                alt="dashboard"
                className="transition-opacity duration-300 group-hover:opacity-0 z-10"
            />

            <div className="absolute inset-0 flex items-center justify-center p-4
                  transform translate-x-full opacity-0
                  transition-all duration-400
                  group-hover:translate-x-0 group-hover:opacity-100
                  bg-blue-600 z-20">
                <p className="text-justify text-white-800 text-lg hyphens-auto font-semibold">{props.content}</p>
            </div>
        </div>
    );
}

export default Card;