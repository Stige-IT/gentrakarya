import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoV1 from "../assets/images/Logo.svg";
import LogoV2 from "../assets/images/LogoGentra.png";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-30 w-full bg-gradient-to-r from-white to-blue-500 backdrop-blur-sm text-black">
      {/* Top */}
      <div className="w-full h-16 flex items-center justify-between px-10">
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
        <div className="flex items-center space-x-3">
          <Link
            activeClass="font-semibold border-b-2 border-black transition-all cursor-pointer"
            to="welcomeSection"
            spy={true}
            smooth={true}
            className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
          >
            Home
          </Link>
          <Link
            href="/"
            to="profileSection"
            className="font-semibold border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
          >
            Profil Dinas
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
                {/* <a class="dropdown-item text-sm">Profile</a>
                <a tabindex="-1" class="dropdown-item text-sm">
                  Account settings
                </a>
                <a tabindex="-1" class="dropdown-item text-sm">
                  Subscriptions
                </a> */}
                <p>sdsad</p>
              </div>
            </div>
          </div>
        </div>

        {/* End */}
        <div className="flex items-center space-x-3 ">
          <button className="p-2">
            <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
          </button>
          <a
            href="/"
            className="w-24 py-2 bg-yellow-300 font-semibold rounded-md text-center"
          >
            Masuk
          </a>
          <a
            href="/"
            className="w-24 py-2 bg-yellow-300 font-semibold rounded-md text-center"
          >
            Daftar
          </a>
        </div>
      </div>
      <div></div>
    </nav>
  );
};

export default Navbar;
