import Navbar from "@/components/global/layout/navbar";



const Header = () => {
    return (
        <header className="h-25 w-full flex flex-col justify-around">
            <p className="font-bold w-full" >@Dolado</p>

            <Navbar />
        </header>
    );
}

export default Header;