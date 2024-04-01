import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/images/Logo.svg";
import Wave from "../assets/images/wave footer.svg";
import { faEnvira, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <img
        src={Wave}
        alt="Wave Footer"
        className="w-full object-cover "
      />
      <div id="footer" className="w-full bg-custom-dark">
        <div className="w-full grid grid-cols-1 md:grid-cols-5 px-5 lg:px-10 gap-5 lg:gap-0">
          <div className="lg:aspect-square px-3">
            <img
              src={Logo}
              alt="Logo Gentra Karya"
              className="w-[30%] mx-auto lg:w-[70%] aspect-square object-contain"
            />
          </div>

          <div className="px-2">
            <div>
              <h1 className="text-xl font-semibold text-white">Sosial Media</h1>
              <div className="w-full h-1 bg-white mt-2"></div>
            </div>
            <div className="mt-3">
              <a
                href="https://www.instagram.com/disnakertransgarut?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="flex items-center space-x-3 text-custom-yellow"
              >
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                <span>Instagram</span>
              </a>
              {/* <p>
                <FontAwesomeIcon icon="fa-brands fa-facebook" />
                <span className="text-custom-yellow">Facebook</span>
              </p> */}
                <a
                href="https://www.instagram.com/disnakertransgarut?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="flex items-center space-x-3 text-custom-yellow"
              >
                <FontAwesomeIcon icon={faTiktok}></FontAwesomeIcon>
                <span>Tiktok</span>
              </a>
            </div>
          </div>

          <div className="px-2">
            <div>
              <h1 className="text-xl font-semibold text-white">Kontak</h1>
              <div className="w-full h-1 bg-white mt-2"></div>
            </div>
            <div className="mt-3">
              <p>
                {/* <i></i> */}
                {/* <span className="text-custom-yellow">Whatsapp</span> */}
              </p>
              <a
                href="https://www.instagram.com/disnakertransgarut?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="flex items-center space-x-3 text-custom-yellow"
              >
                <FontAwesomeIcon icon={faEnvira}></FontAwesomeIcon>
                <span>Email</span>
              </a>
            </div>
          </div>

          <div className="px-2">
            <div>
              <h1 className="text-xl font-semibold text-white">Alamat</h1>
              <div className="w-full h-1 bg-white mt-2"></div>
            </div>
            <div className="mt-3 text-white">
              <p className="text-xs">
                Jl. Guntur Cendana No.1, Haurpanggung, Kec. Tarogong Kidul,
                Kabupaten Garut, Jawa Barat 44151
              </p>
            </div>
          </div>

          <div className="aspect-square px-2">
            <div>
              <h1 className="text-xl font-semibold text-white">Map</h1>
              <div className="w-full h-1 bg-white mt-2"></div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.3774085318814!2d107.901300773892!3d-7.197708370651493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68b121458a4983%3A0x6ef08838659bbc95!2sDinas%20ketenagakerjaan%20kabupaten%20Garut!5e0!3m2!1sid!2sid!4v1696173263046!5m2!1sid!2sid"
              allowfullscreen=""
              loading="lazy"
              title="Lokasi Dinas"
              referrerpolicy="no-referrer-when-downgrade"
              className="w-full mt-3 rounded-md object-cover"
            ></iframe>
          </div>
        </div>
        <div className="px-5 lg:px-10 -mt-28 md:-mt-0">
          <div className="w-full h-1 bg-white rounded-full"></div>
          <p className="text- text-white text-center mt-3 pb-10">
            Copyright © 2024 Dinas Tenaga kerja dan Transmigrasi Kabupaten
            Garut-All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
