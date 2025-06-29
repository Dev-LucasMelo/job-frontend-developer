import { render, screen } from "@testing-library/react";
import Navbar from "@/components/global/layout/navbar";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
    usePathname: jest.fn(),
}));

describe('Navbar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Renders all expected links", () => {
        (usePathname as jest.Mock).mockReturnValue("/");

        render(<Navbar />);

        expect(screen.getByText("Inicio")).toBeInTheDocument();
        expect(screen.getByText("dashboard")).toBeInTheDocument();
    });

    it("Apply active class on correct link according to pathname", () => {
        (usePathname as jest.Mock).mockReturnValue("/dashboard");

        render(<Navbar />);

        const dashboardLink = screen.getByText("dashboard");
        const inicioLink = screen.getByText("Inicio");

        expect(dashboardLink.className).toContain("px-3 py-1 text-white font-bold bg-blue-800 rounded-sm duration-200 ease-out");
        expect(inicioLink.className).not.toContain("px-3 py-1 text-white font-bold bg-blue-800 rounded-sm duration-200 ease-out");
    });

    it("renders the correct amount of links", () => {
        (usePathname as jest.Mock).mockReturnValue("/");

        render(<Navbar />);

        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(2);
    });

})