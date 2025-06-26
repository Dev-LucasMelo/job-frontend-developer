
import type { StaticImageData  } from "next/image"

export type CardProps = {
    id: number
    content: string
    image: StaticImageData | string
}