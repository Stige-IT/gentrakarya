import { Helmet } from "react-helmet";
import Navbar from "../../../../components/Navbar";
import TemplateTextMagang from "../../../../components/template_text_magang";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { showPelatihanGeneral } from "../../../../services/pelatihan_service";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormatDate from "../../../../components/format_date";
import FormatDateTime from "../../../../components/format_datetime";
import { BaseURL } from "../../../../services/base_url";

const DetailPelatihan = () => {
  const { pelatihan_id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState([]);
  const [imageGalery, setImageGalery] = useState([]);

  const addListClass = (htmlContent) => {
    // Menambahkan class list-decimal pada elemen <ol>
    return htmlContent.replace(/<ol>/g, '<ol class="list-decimal pl-16">');
  };

  useEffect(() => {
    showPelatihanGeneral(pelatihan_id).then((response) => {
      if (response && response.status === 200) {
        setData(response.data.data);
      } else {
        setData([]);
      }
    });
  }, [pelatihan_id]);
  return (
    <>
      <Helmet>
        <title>Detail Pelatihan - Gentra Karya</title>
      </Helmet>
      <div className="h-screen w-full bg-white overflow-auto scrollbar-thin scrollbar-track-rounded-full  scrollbar-thumb-rounded-full scrollbar-thumb-yellow-400 pb-10">
        <Navbar></Navbar>
        <div className="sticky top-16 h-14 flex items-center px-10 text-sm border-b-2 bg-blue-300 space-x-3">
          <FontAwesomeIcon
            icon={faBell}
            className="h-8 aspect-square text-custom-dark"
          ></FontAwesomeIcon>
          <p className="text-base md:text-2xl font-semibold">
            Detail Informasi Magang Gantra Karya
          </p>
        </div>
        <div className="w-full px-3 md:px-5 lg:px-10 py-5">
          <p className="text-2xl font-semibold text-center uppercase bg-blue-300 py-2">
            {data?.judul_pelatihan}
          </p>
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-5 my-3">
            <p className="space-x-2 flex items-center">
              <span className="font-semibold">Dibuat pada :</span>
              <span>
                <FormatDateTime dateTime={data?.created_at}></FormatDateTime>
              </span>
            </p>
            <p className="space-x-2 flex items-center">
              <span className="font-semibold">Berakhir pada :</span>
              <span>
                <FormatDate date={data?.expired_at}></FormatDate>
              </span>
            </p>
          </div>

          <div className="w-full flex flex-col lg:flex-row lg:space-x-3 space-y-3 lg:space-y-0">
            {/* Left Content */}
            <div className="w-full lg:w-[65%] space-y-3 md:space-y-0">
              <div className="w-full lg:hidden flex justify-center lg:justify-end mb-3 ">
                <div className="w-[80%] lg:w-1/2 mx- aspect-video bg-black rounded-md overflow-hidden">
                  {data?.profile_lembaga?.image === null ? (
                    ""
                  ) : (
                    <img
                      src={BaseURL + data?.profile_lembaga?.image}
                      alt="Foto Profile Lembaga - Gentra Karya"
                      className="w-full aspect-video object-cover"
                    />
                  )}
                </div>
              </div>
              <TemplateTextMagang
                name="Nama Peusahaan"
                value={data?.profile_lembaga?.nama_lembaga}
              />
              <TemplateTextMagang
                name="Lembaga"
                value={data?.profile_lembaga?.lembaga?.name}
              />
              <TemplateTextMagang
                name="Judul Pelatihan"
                value={data?.judul_pelatihan}
              />
              <TemplateTextMagang
                name="Biaya Pelatihan"
                value={data?.biaya_pelatihan}
              />
              <TemplateTextMagang
                name="Metoda Pelatihan"
                value={data?.metoda}
              />
              <TemplateTextMagang
                name="Tanggal Pelaksanaan"
                value={
                  <FormatDateTime
                    dateTime={data?.tanggal_pelaksanaan}
                  ></FormatDateTime>
                }
              />
              <TemplateTextMagang
                name="No Telepon / Wa"
                value={data?.no_telepon}
              />
              <TemplateTextMagang name="Email" value={data?.email} />
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-[35%] space-y-3 lg:space-y-0">
              <div className="w-full hidden lg:flex justify-center lg:justify-end mb-3">
                <div className="w-[80%] lg:w-1/2 mx- aspect-video bg-black rounded-md overflow-hidden">
                  {data?.profile_lembaga?.image === null ? (
                    ""
                  ) : (
                    <img
                      src={BaseURL + data?.profile_lembaga?.image}
                      alt="Foto Profile Lembaga - Gentra Karya"
                      className="w-full aspect-video object-cover"
                    />
                  )}
                </div>
              </div>
              <TemplateTextMagang
                width="w-32"
                name="Provinsi"
                value={data?.address?.province?.name}
              />
              <TemplateTextMagang
                width="w-32"
                name="Kabupaten / Kota"
                value={data?.address?.regency?.name}
              />
              <TemplateTextMagang
                width="w-32"
                name="Kecamatan"
                value={data?.address?.district?.name}
              />
              <TemplateTextMagang
                width="w-32"
                name="Desa / Kelurahan"
                value={data?.address?.village?.name}
              />
              <a
                href="https://maps.app.goo.gl/nHfid9j8pW5rg1VF8"
                target="_blank"
                className="text-blue-500 hover:text-blue-600 transition-colors flex items-center space-x-3 py-3"
              >
                <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                <p>Klik Link Map</p>
              </a>
              <div>
                <p>Detail Alamat :</p>
                <p>{data?.address?.detail}</p>
              </div>
            </div>
          </div>
          <div className="w-full mt-5">
            <p className="border-b-2 font-semibold">Detail Magang :</p>
            <div dangerouslySetInnerHTML={{ __html: data?.detail }} />
          </div>

          {imageGalery?.length !== 0 ? (
            <div className="w-full mt-5">
              <div className="flex items-center justify-between bg-gray-300 py-2 px-3 mb-3">
                <p className="font-semibold ">Galeri Magang :</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {imageGalery?.map((item) => (
                  <div className="w-full aspect-video bg-gray-300 rounded-md overflow-hidden relative object-center">
                    <img
                      src={BaseURL + item?.image}
                      alt={item?.image}
                      className="w-full aspect-video object-center object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default DetailPelatihan;



    