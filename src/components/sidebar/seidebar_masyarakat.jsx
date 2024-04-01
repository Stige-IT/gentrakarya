import { faDashboard, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import Logo from "../../assets/images/Logo.svg"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CustomLinkSidebar from "../custom_link_sidebar"
import { logoutService } from "../../services/auth_service"
const SidebarMasyarakat = () => {
    const navigate = useNavigate()
    const accesstoken = localStorage.getItem('access_token')

    const handleLogout = () => {
        logoutService(`Bearer ${accesstoken}`)
        localStorage.clear()
        navigate('/')
    }
    return (
        <div className="w-64 h-screen bg-blue-500 space-y-3 text-sm">
            <div className="py-5">
                <img src={Logo} alt="Logo Gentra Karya" className="w-[40%] aspect-square mx-auto" />
            </div>
            <div className="w-full h-1 rounded-full bg-white"></div>
            <div className="w-full space-y-1 pl-3">
                <CustomLinkSidebar link="/dashboard" name="Dashboard" icon={faDashboard}></CustomLinkSidebar>
                <CustomLinkSidebar link="/dashboard/lamaran" name="Lamaran" icon={faDashboard}></CustomLinkSidebar>
                <CustomLinkSidebar link="/dashboard/pengaturan" name="Pengaturan" icon={faDashboard}></CustomLinkSidebar>
            </div>
            <button type="button" onClick={handleLogout}
                className="w-full bg-red-500 text-white font-semibold flex items-center justify-center space-x-3 hover:bg-red-600 transition-colors py-2">
                <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
                <p>Logout</p>
            </button>
        </div>
    )
}

export default SidebarMasyarakat