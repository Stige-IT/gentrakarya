import Backgound from "../../../assets/images/background.svg";
import Wave1 from "../../../assets/images/wave 1.svg";
import Wave2 from "../../../assets/images/wave 2.svg";
import Icon from "../../../assets/images/icon.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const WelcomeSection = () => {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    const newAccessToken = localStorage.getItem("access_token");
    if (newAccessToken === null || newAccessToken === "") {
      setAccessToken(null);
    } else {
      setAccessToken(`Bearer ${newAccessToken}`);
    }
  }, []);
  return (
    <>
      <div
        id="welcomeSection"
        className="w-full mx-auto h-screen bg-cover text-white md:-mt-16 relative"
        style={{ backgroundImage: `url(${Backgound})` }}
      >
        <div className="h-full bg-gradient-to-b lg:bg-gradient-to-r from-custom-blue/75 to-black lg:from-black/90 lg:to-custom-blue/75 flex flex-col lg:flex-row items-center justify-center relative px-5 lg:px-0">
          <div className="lg:w-[65%] lg:pl-24 text-center lg:text-start order-2 lg:order-1">
            <h1 className="text-4xl lg:text-7xl font-semibold">Gentra Karya</h1>
            <h2 className="text-sm lg:text-xl mt-3 lg:mt-0 tracking-wide">
              Dinas Tenaga Kerja dan Transmigrasi
            </h2>
            <p className="lg:my-10 text-xs lg:text-base  my-5 text-justify ">
              Gentra Karya adalah program pemerintah Kabupaten Garut yang
              bertujuan untuk meningkatkan kesempatan kerja bagi masyarakat
              serta mempertemukan pemberi kerja dan pencari kerja. Program ini
              diluncurkan pada tahun 2023 dan terdiri dari berbagai kegiatan
              mencakup pelatihan vokasi, penempatan kerja dan perluasan
              kesempatan kerja.
            </p>
            {accessToken === null ? (
              <Link
                to="/login"
                className="bg-custom-yellow px-5 py-2 rounded-md font-semibold text-black w-32 text-center"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="bg-custom-yellow px-5 py-2 rounded-md font-semibold text-black w-32 text-center"
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="w-full lg:w-1/2 lg:h-full flex items-center justify-center lg:justify-end  lg:pr-24 order-1 lg:order-2">
            <img
              src={Icon}
              alt="Icon"
              className=" w-[80%] lg:h-[60%] aspect-square object-contain "
            />
          </div>

          <img
            src={Wave2}
            alt="Wave"
            className="lg:hidden w-full object-cover absolute bottom-0"
          />
        </div>
        <img
          src={Wave1}
          alt="Wave"
          className=" lg:block w-full object-cover object-top absolute bottom-0 order lg:order-2"
        />
      </div>
    </>
  );
};

export default WelcomeSection;
