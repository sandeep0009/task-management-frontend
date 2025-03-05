import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout=()=>{
    const location=useLocation();
    const hideNavbar=location.pathname==="/signin" || location.pathname==="/signup";

    return(
        <div>
            {
                !hideNavbar && <Navbar/>
            }

            <main>
                <Outlet/>

            </main>
        </div>
    )
}