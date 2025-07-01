import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from '@/components/home/card'

describe('Card', () => {
    const props = {
        image: '/teste.jpg',
        content: 'Texto visível no hover'
    }

    it('should render the image correctly', () => {
        render(<Card {...props} />)
        const image = screen.getByAltText('dashboard')
        expect(image).toBeInTheDocument()
    })

    it('should render the text correctly', () => {
        render(<Card {...props} />)

        const text = screen.getByText(props.content)
        expect(text).toBeInTheDocument()
        expect(text.textContent).toBe(props.content)
    })

    it('verifies that the classes that induce visual behavior are active', async () => {
        const props = {
            image: '/teste.jpg',
            content: 'Texto visível no hover'
        }

        const user = userEvent.setup()
        render(<Card {...props} />)

        const textoWrapper = screen.getByText(props.content).parentElement!

        expect(textoWrapper).toHaveClass('group-hover:opacity-100')
        expect(textoWrapper).toHaveClass('group-hover:translate-x-0')

        await user.hover(textoWrapper)

        expect(textoWrapper).toHaveClass('group-hover:opacity-100')
        expect(textoWrapper).toHaveClass('group-hover:translate-x-0')
    })
})