import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoV1 from "../assets/images/Logo.svg";
import LogoV2 from "../assets/images/LogoGentra.png";
// import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCaretDown,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHref } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const currentLink = useHref();
  const [accessToken, setAccessToken] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    if (openMenu === true) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  };

  const scrollToID = (event) => {
    event.preventDefault();

    const targetId = event.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const newAccessToken = localStorage.getItem("access_token");
    if (newAccessToken === null || newAccessToken === "") {
      setAccessToken(null);
    } else {
      setAccessToken(`Bearer ${newAccessToken}`);
    }
  }, []);
  return (
    <nav
      className={`fixed md:sticky top-0 z-30 w-full bg-gradient-to-r from-white to-blue-500 backdrop-blur-sm text-black ${
        openMenu === true ? "rounded-b-xl" : ""
      }`}
    >
      {/* Top */}
      <div className="w-full h-16 flex items-center justify-between px-5 md:px-10">
        {/* Start */}
        <div className="flex items-center space-x-3">
          <img
            src={LogoV1}
            alt="Logo Gentra Karya"
            className="h-10 aspect-square object-contain"
          />
          <img
            src={LogoV2}
            alt="Logo Gentra Karya"
            className="w-36 aspect-video object-contain"
          />
        </div>

        {/* Center */}
        <div className="hidden lg:flex items-center space-x-3">
          {currentLink !== "/" ? (
            <Link
              to="/"
              className="font-semibold hover:bg-gray-200 transition-all cursor-pointer text-center py-2"
            >
              Home
            </Link>
          ) : (
            <a
              href="#welcomeSection"
              onClick={scrollToID}
              activeClass="font-semibold border-b-2 border-black transition-all cursor-pointer"
              className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
            >
              Home
            </a>
          )}

          {currentLink !== "/" ? (
            <Link
              to="/"
              className="font-semibold hover:bg-gray-200 transition-all cursor-pointer text-center py-2"
            >
              Profil Dinas
            </Link>
          ) : (
            <a
              href="#profileSection"
              onClick={scrollToID}
              className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
            >
              Profil Dinas
            </a>
          )}

          {currentLink !== "/" ? (
            <Link
              to="/"
              className="font-semibold hover:bg-gray-200 transition-all cursor-pointer text-center py-2"
            >
              Visi & Misi
            </Link>
          ) : (
            <a
              href="#visiMisiSection"
              onClick={scrollToID}
              className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
            >
              Visi & Misi
            </a>
          )}

          <Link
            to="/loker"
            className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
          >
            Loker
          </Link>

          <div class="dropdown-container justify-center">
            <div class="dropdown">
              <label
                class="font-semibold flex items-center space-x-3 border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
                tabindex="0"
              >
                <p>Aktifitas</p>
                <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
              </label>
              <div class="dropdown-menu dropdown-menu-bottom-center">
                <Link
                  to="/magang"
                  className="font-semibold hover:bg-gray-200 transition-all cursor-pointer text-center py-2"
                >
                  Magang
                </Link>
                <Link
                  to="/pelatihan"
                  className="font-semibold hover:bg-gray-200 transition-all cursor-pointer text-center py-2"
                >
                  Pelatihan
                </Link>
                <Link
                  to="/sertifikasi"
                  className="font-semibold hover:bg-gray-200 transition-all cursor-pointer text-center py-2"
                >
                  Sertifikasi
                </Link>
                <Link
                  to="/workshop"
                  className="font-semibold hover:bg-gray-200 transition-all cursor-pointer text-center py-2"
                >
                  Workshop
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/layanan"
            className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
          >
            Layanan
          </Link>

          {currentLink !== "/" ? (
            <Link
              to="/"
              className="font-semibold hover:bg-gray-200 transition-all cursor-pointer text-center py-2"
            >
              Kontak
            </Link>
          ) : (
            <a
              href="#footer"
              onClick={scrollToID}
              className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
            >
              Kontak
            </a>
          )}
        </div>

        {/* End */}
        <div>
          <div className="hidden lg:flex items-center space-x-3 ">
            {/* <button className="p-2">
              <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
            </button> */}
            {accessToken === null ? (
              <>
                <Link
                  to="/login"
                  className="w-24 py-2 bg-yellow-300 font-semibold rounded-md text-center"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="w-24 py-2 bg-yellow-300 font-semibold rounded-md text-center"
                >
                  Daftar
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="w-32 py-2 bg-yellow-300 font-semibold rounded-md text-center"
              >
                Dashboard
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={handleOpenMenu}
            className="flex items-center justify-center relative p-2 h-8 aspect-square lg:hidden"
          >
            <FontAwesomeIcon
              className={`${
                openMenu === false
                  ? "scale-100 rotate-0"
                  : "scale-0 -rotate-180"
              } h-8 transition-all duration-300`}
              icon={faBars}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              className={`${
                openMenu === false ? "scale-0 rotate-180" : "scale-100 rotate-0"
              } h-8 transition-all duration-300 absolute text-red-500`}
              icon={faClose}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div
        className={`${
          openMenu === false ? "h-0" : "h-[500px] border-t-2"
        } w-full overflow-hidden transition-all duration-500 flex flex-col items-center justify-center space-y-2 border-black`}
      >
        {currentLink !== "/" ? (
          <Link
            to="/"
            className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
          >
            Home
          </Link>
        ) : (
          <a
            href="#welcomeSection"
            onClick={scrollToID}
            activeClass="font-semibold border-b-2 border-black transition-all cursor-pointer"
            className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
          >
            Home
          </a>
        )}

        {currentLink !== "/" ? (
          <Link
            to="/"
            className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
          >
            Profil Dinas
          </Link>
        ) : (
          <a
            href="#profileSection"
            onClick={scrollToID}
            className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
          >
            Profil Dinas
          </a>
        )}

        {currentLink !== "/" ? (
          <Link
            to="/"
            className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
          >
            Vii & Misi
          </Link>
        ) : (
          <a
            href="#visiMisiSection"
            onClick={scrollToID}
            className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
          >
            Visi & Misi
          </a>
        )}

        <Link
          to="/loker"
          className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
        >
          Loker
        </Link>

        <Link
          to="/magang"
          className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
        >
          Magang
        </Link>

        <Link
          to="/pelatihan"
          className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
        >
          Pelatihan
        </Link>

        <Link
          to="/sertifikasi"
          className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
        >
          Sertifikasi
        </Link>

        <Link
          to="/workshop"
          className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
        >
          Workshop
        </Link>

        <Link
          to="/layanan"
          className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
        >
          Layanan
        </Link>

        {currentLink !== "/" ? (
          <Link
            to="/"
            className="font-semibold hover:bg-gray-200 transition-all cursor-pointer text-center py-2"
          >
            Kontak
          </Link>
        ) : (
          <a
            href="#footer"
            onClick={scrollToID}
            className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
          >
            Kontak
          </a>
        )}

        <div className="flex items-center space-x-3 ">
          <Link
            to="/login"
            className="w-32 py-2 bg-yellow-300 font-semibold rounded-md text-center"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="w-32 py-2 bg-yellow-300 font-semibold rounded-md text-center"
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
