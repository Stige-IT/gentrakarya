import { useEffect, useState } from "react"
import SidebarLembaga from "./sidebar/sidebar_lembaga";
import SidebarAdmin from "./sidebar/sidebar_admin";
import SidebarMasyarakat from "./sidebar/seidebar_masyarakat";

const Layout = ({ children }) => {
    const [sidebar, setSidebar] = useState(null);

    useEffect(()=>{
        const registrationCategory = localStorage.getItem('registration_category')
     if (registrationCategory === 'ADMIN' || registrationCategory === 'SUPER ADMIN') {
            setSidebar(<SidebarAdmin />);
        } else if (registrationCategory === 'LEMBAGA') {
            setSidebar(<SidebarLembaga />);
        } else {
            setSidebar(<SidebarMasyarakat />);
        }
    },[])

    return (
        <>
            <div className="h-screen w-full flex">
                {sidebar}
                <main className="w-full h-screen overflow-auto scrollbar-thin scrollbar-track-rounded-full scrollbar-track-blue-500 scrollbar-thumb-rounded-full scrollbar-thumb-yellow-400 text-sm">
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout