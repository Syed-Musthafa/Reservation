import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

export default function Layout() {
    return (
        <>
            <Navbar />
            <main className="p-6">
                <Outlet />
            </main>
        </>
    );
}
