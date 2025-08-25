
import Navbar from "./NavBar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="p-6">{children}</main>

        </>
    );
}
