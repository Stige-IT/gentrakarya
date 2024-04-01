import {
  faBars,
  faCaretDown,
  faClose,
  faDashboard,
  faGear,
  faHouseLaptop,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/Logo.svg";
import { useHref, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CustomLinkSidebar from "../custom_link_sidebar";
import { logoutService } from "../../services/auth_service";
const SidebarLembaga = () => {
  const path = useHref();
  const navigate = useNavigate();
  const accesstoken = localStorage.getItem("access_token");
  const [subCategory, setSubCategory] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [openCollapseLoker, setOpenCollapseLoker] = useState(false);
  const [openCollapseMagang, setOpenCollapseMagang] = useState(false);

  const handleCollapseLoker = () => {
    if (openCollapseLoker === true) {
      setOpenCollapseLoker(false);
    } else {
      setOpenCollapseLoker(true);
    }
  };

  const handleCollapseMagang = () => {
    if (openCollapseMagang === true) {
      setOpenCollapseMagang(false);
    } else {
      setOpenCollapseMagang(true);
    }
  };

  const handleLogout = () => {
    logoutService(`Bearer ${accesstoken}`);
    localStorage.clear();
    navigate("/");
  };

  const HandleOpenMenu = () => {
    if (openMenu === true) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  };

  useEffect(() => {
    const subCategory = localStorage.getItem("registration_sub_category");
    setSubCategory(subCategory);
  }, []);
  return (
    <>
      <div className="w-64 h-screen bg-blue-500 space-y-3 text-sm hidden lg:block overflow-auto scrollbar-none">
        <div className="w-full sticky top-0 z-20 bg-blue-500">
          <div className="py-5 start-0">
            <img
              src={Logo}
              alt="Logo Gentra Karya"
              className="w-[40%] aspect-square mx-auto"
            />
          </div>
          <div className="w-full h-1 rounded-full bg-white"></div>
        </div>
        <div className="w-full space-y-1 pl-3">
          <CustomLinkSidebar
            link="/dashboard"
            name="Dashboard"
            icon={faDashboard}
          />

          {subCategory !== "LKP" || subCategory !== "lpk" ? (
            <div className="w-full rounded-l-md">
              <button
                type="button"
                onClick={handleCollapseLoker}
                className=" flex items-center justify-between pr-3 w-full group relative"
              >
                <div className="flex items-center space-x-3 font-semibold py-2 px-3 rounded-l-full relative">
                  <FontAwesomeIcon
                    icon={faHouseLaptop}
                    className="z-10"
                  ></FontAwesomeIcon>
                  <p className="z-10">Data Loker</p>
                </div>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className={`z-10 transition-all duration-500 ${
                    openCollapseLoker === true ||
                    path.startsWith("/dashboard/loker") ||
                    path.startsWith("/dashboard/lamaran")
                      ? "-rotate-180"
                      : "rotate-0"
                  }`}
                ></FontAwesomeIcon>
                <div
                  className={`absolute h-full bg-white right-0 rounded-md md:rounded-l-full group-hover:w-full transition-all duration-500  ${
                    openCollapseLoker === true ||
                    path.startsWith("/dashboard/loker")
                      ? "w-full"
                      : "w-0"
                  } `}
                ></div>
              </button>
              <div
                className={`pl-3 h-0 overflow-hidden transition-all duration-500 space-y-1 ${
                  openCollapseLoker === true ||
                  path.startsWith("/dashboard/loker") ||
                  path.startsWith("/dashboard/lamaran")
                    ? "h-20 pt-1"
                    : "h-0"
                }`}
              >
                <CustomLinkSidebar
                  link="/dashboard/loker"
                  name="Loker"
                  icon={faDashboard}
                />
                <CustomLinkSidebar
                  link="/dashboard/lamaran"
                  name="Lamaran"
                  icon={faDashboard}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <CustomLinkSidebar
            link="/dashboard/magang"
            name="Data Magang"
            icon={faDashboard}
          />

          {/* <div className="w-full rounded-l-md">
            <button
              type="button"
              onClick={handleCollapseMagang}
              className=" flex items-center justify-between pr-3 w-full group relative"
            >
              <div className="flex items-center space-x-3 font-semibold py-2 px-3 rounded-l-full relative">
                <FontAwesomeIcon
                  icon={faHouseLaptop}
                  className="z-10"
                ></FontAwesomeIcon>
                <p className="z-10">Data Magang</p>
              </div>
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`z-10 transition-all duration-500 ${
                  openCollapseMagang === true ||
                  path.startsWith("/dashboard/magang") ||
                  path.startsWith("/dashboard/magang/lamaran")
                    ? "-rotate-180"
                    : "rotate-0"
                }`}
              ></FontAwesomeIcon>
              <div
                className={`absolute h-full bg-white right-0 rounded-md md:rounded-l-full group-hover:w-full transition-all duration-500  ${
                  openCollapseMagang === true ||
                  path.startsWith("/dashboard/magang")
                    ? "w-full"
                    : "w-0"
                } `}
              ></div>
            </button>
            <div
              className={`pl-3 h-0 overflow-hidden transition-all duration-500 space-y-1 ${
                openCollapseMagang === true ||
                path.startsWith("/dashboard/magang") ||
                path.startsWith("/dashboard/magang/lamaran")
                  ? "h-20 pt-1"
                  : "h-0"
              }`}
            >
              <CustomLinkSidebar
                link="/dashboard/magang"
                name="Magang"
                icon={faDashboard}
              />
              <CustomLinkSidebar
                link="/dashboard/magang/lamaran"
                name="Lamaran"
                icon={faDashboard}
              />
            </div>
          </div> */}

          {subCategory === "LKP" ||
          subCategory === "LPK" ||
          subCategory === " PEMERINTAH" ||
          subCategory === "PERGURUAN TINGGI" ||
          subCategory === "SMK" ? (
            <CustomLinkSidebar
              link="/dashboard/sertifikasi"
              name="Sertifikasi"
              icon={faDashboard}
            />
          ) : (
            ""
          )}

          {subCategory === "KOMUNITAS" || subCategory === "PEMERINTAH" ? (
            <CustomLinkSidebar
              link="/dashboard/workshop"
              name="Workshop"
              icon={faDashboard}
            />
          ) : (
            ""
          )}

          {subCategory === "KOMUNITAS" ||
          subCategory === "LKP" ||
          subCategory === "LPK" ||
          subCategory === "MEDIA" ||
          subCategory === "PEMERINTAH" ||
          subCategory === "SMK" ? (
            <CustomLinkSidebar
              link="/dashboard/pelatihan"
              name="Pelatihan"
              icon={faDashboard}
            />
          ) : (
            ""
          )}

          <CustomLinkSidebar
            link="/dashboard/pengaturan"
            name="Pengaturan"
            icon={faGear}
          />

          {/* <Link to={`${link}`} className="flex items-center space-x-3 font-semibold py-2 px-3 rounded-l-full relative">
            <FontAwesomeIcon icon={icon} className="z-10"></FontAwesomeIcon>
            <p className="z-10">{name}</p>
            <div className={`absolute ${name === 'Dashboard' ? path === '/dashboard' ? 'w-full' : 'w-0' : path.startsWith(link) ? 'w-full' : 'w-0'} h-full bg-white right-0 rounded-md md:rounded-l-full`}></div>
        </Link> */}
        </div>
        {/* <button
          type="button"
          onClick={handleLogout}
          className="w-full bg-red-500 text-white font-semibold flex items-center justify-center space-x-3 hover:bg-red-600 transition-colors py-2"
        >
          <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
          <p>Logout</p>
        </button> */}
      </div>

      {/* Mobile Menu */}
      <button
        type="button"
        onClick={HandleOpenMenu}
        className="md:hidden w-16 z-40  aspect-square bg-custom-yellow flex items-center justify-center rounded-full fixed bottom-5 right-5 shadow-md shadow-gray-300 drop-shadow-md"
      >
        <FontAwesomeIcon
          icon={faBars}
          className={`text-3xl transition-all duration-500 ${
            openMenu === false ? "scale-10 rotate-0" : "scale-0 rotate-180"
          }`}
        />
        <FontAwesomeIcon
          icon={faClose}
          className={`absolute text-3xl text-red-600 transition-all duration-500 ${
            openMenu === false ? "scale-0 -rotate-180" : "scale-100 rotate-0"
          }`}
        />
      </button>
      <div
        className={` fixed bottom-8 z-30 right-8 bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-500 ${
          openMenu === false ? "h-0 w-0" : "h-[350px] w-[200px] p-5 pb-16"
        }`}
      >
        <CustomLinkSidebar
          link="/dashboard"
          name="Dashboard"
          icon={faDashboard}
        />
        {subCategory !== "LKP" || subCategory !== "lpk" ? (
          <CustomLinkSidebar
            link="/dashboard/loker"
            name="Loker"
            icon={faDashboard}
          />
        ) : (
          ""
        )}

        <CustomLinkSidebar
          link="/dashboard/lamaran"
          name="Lamaran"
          icon={faDashboard}
        />
        <CustomLinkSidebar
          link="/dashboard/magang"
          name="Magang"
          icon={faDashboard}
        />

        {subCategory === "LKP" ||
        subCategory === "LPK" ||
        subCategory === " PEMERINTAH" ||
        subCategory === "PERGURUAN TINGGI" ||
        subCategory === "SMK" ? (
          <CustomLinkSidebar
            link="/dashboard/sertifikasi"
            name="Sertifikasi"
            icon={faDashboard}
          />
        ) : (
          ""
        )}

        {subCategory === "KOMUNITAS" || subCategory === "PEMERINTAH" ? (
          <CustomLinkSidebar
            link="/dashboard/workshop"
            name="Workshop"
            icon={faDashboard}
          />
        ) : (
          ""
        )}

        {subCategory === "KOMUNITAS" ||
        subCategory === "LKP" ||
        subCategory === "LPK" ||
        subCategory === "MEDIA" ||
        subCategory === "PEMERINTAH" ||
        subCategory === "SMK" ? (
          <CustomLinkSidebar
            link="/dashboard/pelatihan"
            name="Pelatihan"
            icon={faDashboard}
          />
        ) : (
          ""
        )}

        <CustomLinkSidebar
          link="/dashboard/pengaturan"
          name="Pengaturan"
          icon={faDashboard}
        />
      </div>
    </>
  );
};

export default SidebarLembaga;
