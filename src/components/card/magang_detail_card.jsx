import { useEffect } from "react";
import { BaseURL } from "../../services/base_url";
import { showMagangGeneral } from "../../services/magang_service";
import TemplateText from "../template_text";
import { useState } from "react";
import FormatDateTime from "../format_datetime";
import FormatDate from "../format_date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getImageMagang } from "../../services/image_magang_service";

const MagangDetailCard = ({magang_id, category}) => {
    // const [selectedImage, setSelectedImage] = useState(null);
  // const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState([]);
  const [imageGalery, setImageGalery] = useState([]);

  // const addListClass = (htmlContent) => {
  //   // Menambahkan class list-decimal pada elemen <ol>
  //   return htmlContent.replace(/<ol>/g, '<ol class="list-decimal pl-16">');
  // };

const fetchDataMagang = async () => {
  try {
    const response = await showMagangGeneral(magang_id)
    setData(response.data.data);
  } catch (error) {
    setData([]); 
  }
}

const fetchDataImage = async () => {
  try {
    const response = await getImageMagang(magang_id);
    setImageGalery(response.data.data);
  } catch (error) {
    setImageGalery([]);
  }
};

  const handleLamaran = () => {
    // const now = new Date();
    // const formattedDateTime = FormatDate(now);
    // setCurrentDateTime(formattedDateTime);
    // if (data?.expired_at > currentDateTime) {
    //   alert(
    //     "Lowongan Sudah Kedaluarsa..! Silahkan Cari Lowongan kerja lainnya"
    //   );
    // } else {
    //   if (data?.lamaran === data?.kuota_lowongan) {
    //     alert("Lowongan Sudah Penuh..! Silahkan Cari Lowongan kerja lainnya");
    //   } else {
    //     if (accessToken === "" || accessToken === null) {
    //       navigate("/login");
    //     } else {
    //       navigate(`/loker/${loker_id}/pengajuan/lamaran`);
    //     }
    //   }
    // }
  };

  useEffect(() => {

    fetchDataMagang()

    fetchDataImage()
  }, [magang_id]);
  return (
    <div className="w-full px-3 md:px-5 lg:px-10 py-5">
        <p className="text-2xl font-semibold text-center uppercase bg-blue-400 py-2">
        {data?.jabatan}
      </p>

      <div className="w-full lg:w-[50%] mx-auto py-5">
        <div className="w-[100%]  aspect-video bg-gray-400 overflow-hidden mx-auto rounded-xl ">
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

        <div className="w-full flex flex-col items-center my-3">
          <p className="space-x-2 flex">
            <span className="font-semibold">Dibuat pada :</span>
            <span>
              <FormatDateTime dateTime={data?.created_at}></FormatDateTime>
            </span>
          </p>
          <p className="space-x-2 flex">
            <span className="font-semibold">Berakhir pada :</span>
            <span>
              <FormatDate date={data?.expired_at}></FormatDate>
            </span>
          </p>
          {category === "dashboard-lembaga" ? (
            <button
              type="button"
              onClick={handleLamaran}
              className="px-5 py-1 rounded-md bg-yellow-300 font-semibold mt-3"
            >
              Ajukan Lamaran
            </button>
          ) : (
            ""
          )}
          <div className="flex items-center space-x-3 mt-3">
            <p>Kuota Lowongan : </p>
            <p className="text-xl font-semibold">
              {data?.kuota_lowongan - data?.lamaran} dari {data?.kuota_lowongan}
            </p>
          </div>
        </div>
      </div>

      {/* <p className="text-2xl font-semibold text-center uppercase bg-blue-300 py-2">
        {data?.jabatan}
      </p>
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-5 my-3">
        <p className="space-x-2 flex items-center">
          <span className="font-semibold">Dibuat pada :</span>
          <span>
            <FormatDateTime dateTime={data?.created_at}></FormatDateTime>
          </span>
        </p>

        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-5 my-3">
          <p className="space-x-2 flex items-center">
            <span className="font-semibold">Berakhir pada :</span>
            <span>
              <FormatDate date={data?.expired_at}></FormatDate>
            </span>
          </p>
          <div className=" flex justify-center mt-5">
            <button
              type="button"
              className="px-3 py-2 rounded-md text-center bg-custom-yellow font-semibold hover:bg-yellow-400 transition-colors mx-auto"
            >
              Ajukan Lamaran Magang
            </button>
          </div>
        </div>
      </div> */}

      <div className="w-full flex flex-col lg:flex-row space-x-3">
        <div className="w-full lg:w-[65%] space-y-3 md:space-y-0">
          <TemplateText
            name="Nama Peusahaan"
            value={data?.profile_lembaga?.nama_lembaga}
          />
          <TemplateText
            name="Lembaga"
            value={data?.profile_lembaga?.lembaga?.name}
          />
          <TemplateText name="Posisi / Jabatan" value={data?.jabatan} />
          <TemplateText
            name="Jenis Kelamin Yang dibutuhkan"
            value={data?.jenis_kelamin}
          />
          <TemplateText name="Rentang Gaji" value={data?.gaji_minimal} />
          <TemplateText
            name="Jenjang Pendidikan / Jurusan"
            value="PT CHANGSIN REKSADA"
          />
          <TemplateText name="Rentang Usia" value={data?.rentang_usia} />
          <TemplateText
            name="Status Pelamar Yang dibutuhkan"
            value={data?.status}
          />
          <TemplateText name="No Telepon / Wa" value={data?.no_telepon} />
          <TemplateText name="Email" value={data?.email} />
        </div>

        <div className="w-full lg:w-[35%]">
          
          <TemplateText
            width="w-32"
            name="Provinsi"
            value={data?.address?.province?.name}
          />
          <TemplateText
            width="w-32"
            name="Kabupaten / Kota"
            value={data?.address?.regency?.name}
          />
          <TemplateText
            width="w-32"
            name="Kecamatan"
            value={data?.address?.district?.name}
          />
          <TemplateText
            width="w-32"
            name="Desa / Kelurahan"
            value={data?.address?.village?.name}
          />
          <a
            href="https://maps.app.goo.gl/nHfid9j8pW5rg1VF8"
            target="_blank"
            rel="noreferrer"
            className="text-custom-yellow flex items-center"
          >
            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
            <p>Klik Link Map</p>
          </a>
          {/* <TemplateText width="w-32" name="Map" value="PT CHANGSIN REKSADA"></TemplateText> */}
          <div>
            <p>Detail Alamat</p>
            <p>{data?.address?.detail}</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-5">
        <p className="border-b-2 font-semibold">Detail Magang :</p>
        <div dangerouslySetInnerHTML={{ __html: data?.detail }} />
      </div>

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
    </div>
  );
};

export default MagangDetailCard;
