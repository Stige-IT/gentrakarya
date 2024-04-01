import { faCaretDown, faDashboard, faGear, faHouseLaptop, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import Logo from "../../assets/images/Logo.svg"
import { useHref, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import CustomLinkSidebar from "../custom_link_sidebar"
const SidebarAdmin = () => {
    const path = useHref()
    const navigate = useNavigate()
    const accesstoken = localStorage.getItem('access_token')

    const [openCollapseLoker, setOpenCollapseLoker] = useState(false)
    const [openCollapseMagang, setOpenCollapseMagang] = useState(false)

    const handleCollapseLoker = () => {
        if (openCollapseLoker === true) {
            setOpenCollapseLoker(false)
        } else {
            setOpenCollapseLoker(true)
        }
    }

    const handleCollapseMagang = () => {
        if (openCollapseMagang === true) {
            setOpenCollapseMagang(false)
        } else {
            setOpenCollapseMagang(true)
        }
    }
    return (
        <div className="w-64 h-screen bg-blue-500 space-y-3 text-sm hidden lg:block overflow-auto scrollbar-none">
            <div className="w-full sticky top-0 z-20 bg-blue-500">
                <div className="py-5 start-0">
                    <img src={Logo} alt="Logo Gentra Karya" className="w-[40%] aspect-square mx-auto" />
                </div>
                <div className="w-full h-1 rounded-full bg-white"></div>
            </div>
            <div className="w-full space-y-1 pl-3">
                <CustomLinkSidebar link="/dashboard" name="Dashboard" icon={faDashboard}></CustomLinkSidebar>
                <CustomLinkSidebar link="/dashboard/admin" name="Admin" icon={faDashboard}></CustomLinkSidebar>
                <CustomLinkSidebar link="/dashboard/pengguna" name="Penguna" icon={faDashboard}></CustomLinkSidebar>
                <CustomLinkSidebar link="/dashboard/slide-show" name="Slide Show" icon={faDashboard}></CustomLinkSidebar>
                <CustomLinkSidebar link="/dashboard/galery" name="Galery" icon={faDashboard}></CustomLinkSidebar>
                <CustomLinkSidebar link="/dashboard/layanan" name="Layanan" icon={faDashboard}></CustomLinkSidebar>

                <div className="w-full rounded-l-md">
                    <button type="button" onClick={handleCollapseLoker} className=" flex items-center justify-between pr-3 w-full group relative">
                        <div className="flex items-center space-x-3 font-semibold py-2 px-3 rounded-l-full relative">
                            <FontAwesomeIcon icon={faHouseLaptop} className="z-10"></FontAwesomeIcon>
                            <p className="z-10">Data Loker</p>
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} className={`z-10 transition-all duration-500 ${openCollapseLoker === true || path.startsWith('/dashboard/loker') || path.startsWith('/dashboard/lamaran') ? '-rotate-180' : 'rotate-0'}`}></FontAwesomeIcon>
                        <div className={`absolute h-full bg-white right-0 rounded-md md:rounded-l-full group-hover:w-full transition-all duration-500  ${openCollapseLoker === true || path.startsWith('/dashboard/loker') ? 'w-full' : 'w-0'} `}></div>
                    </button>
                    <div className={`pl-3 h-0 overflow-hidden transition-all duration-500 space-y-1 ${openCollapseLoker === true || path.startsWith('/dashboard/loker') || path.startsWith('/dashboard/lamaran') ? 'h-20 pt-1' : 'h-0'}`}>
                        <CustomLinkSidebar link="/dashboard/loker" name="Loker" icon={faDashboard}></CustomLinkSidebar>
                        <CustomLinkSidebar link="/dashboard/lamaran" name="Lamaran" icon={faDashboard}></CustomLinkSidebar>
                    </div>
                </div>

                <div className="w-full rounded-l-md">
                    <button type="button" onClick={handleCollapseMagang} className=" flex items-center justify-between pr-3 w-full group relative">
                        <div className="flex items-center space-x-3 font-semibold py-2 px-3 rounded-l-full relative">
                            <FontAwesomeIcon icon={faHouseLaptop} className="z-10"></FontAwesomeIcon>
                            <p className="z-10">Data Magang</p>
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} className={`z-10 transition-all duration-500 ${openCollapseMagang === true || path.startsWith('/dashboard/magang') || path.startsWith('/dashboard/magang/lamaran') ? '-rotate-180' : 'rotate-0'}`}></FontAwesomeIcon>
                        <div className={`absolute h-full bg-white right-0 rounded-md md:rounded-l-full group-hover:w-full transition-all duration-500  ${openCollapseMagang === true || path.startsWith('/dashboard/magang') ? 'w-full' : 'w-0'} `}></div>
                    </button>
                    <div className={`pl-3 h-0 overflow-hidden transition-all duration-500 space-y-1 ${openCollapseMagang === true || path.startsWith('/dashboard/magang') || path.startsWith('/dashboard/magang/lamaran') ? 'h-20 pt-1' : 'h-0'}`}>
                        <CustomLinkSidebar link="/dashboard/magang" name="Magang" icon={faDashboard}></CustomLinkSidebar>
                        <CustomLinkSidebar link="/dashboard/magang/lamaran" name="Lamaran" icon={faDashboard}></CustomLinkSidebar>
                    </div>
                </div>

                <CustomLinkSidebar link="/dashboard/sertifikasi" name="Sertifikasi" icon={faDashboard}></CustomLinkSidebar>
                <CustomLinkSidebar link="/dashboard/workshop" name="Workshop" icon={faDashboard}></CustomLinkSidebar>
                <CustomLinkSidebar link="/dashboard/pelatihan" name="Pelatihan" icon={faDashboard}></CustomLinkSidebar>
                <CustomLinkSidebar link="/dashboard/pengaturan" name="Pengaturan" icon={faDashboard}></CustomLinkSidebar>
            </div>
        </div>
    )
}

export default SidebarAdmin