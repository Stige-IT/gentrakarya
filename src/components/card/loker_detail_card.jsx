import { useState } from "react";
import TemplateText from "../template_text";
import { useHref, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { showLoker } from "../../services/loker_service";
import { BaseURL } from "../../services/base_url";
import FormatDateTime from "../format_datetime";
import FormatDate from "../format_date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  deleteImageGaleryLoker,
  getImageLoker,
  postImageGaleryLoker,
} from "../../services/image_loker_service";
import SpinnerWave from "../spinner/spinner_wave";

const LokerDetailCard = ({ loker_id, category }) => {
  const navigate = useNavigate();
  const path = useHref();
  const [accessToken, setAccessToken] = useState(null);

  const [data, setData] = useState();
  const [imageGalery, setImageGalery] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState("");

  const [checked, setChecked] = useState(false);
  const [messageConfirm, setMessageConfirm] = useState("");

  const [openModalAddGalery, setOpenModalAddGalery] = useState(false);

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const addListClass = (htmlContent) => {
    return htmlContent.replace(/<ol>/g, '<ol class="list-decimal pl-10">');
  };

  const fetchDataLoker = async () => {
    try {
      const response = await showLoker(loker_id);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
      alert(
        "Terjadi masalah saat pengambilan data, silahkan refresh halaman..!"
      );
    }
  };

  const fetchDataImage = async () => {
    try {
      const response = await getImageLoker(loker_id);
      setImageGalery(response.data.data);
    } catch (error) {
      setImageGalery([]);
    }
  };

  useEffect(() => {
    if (path.startsWith("/dashboard")) {
      const newAccessToken = localStorage.getItem("access_token");
      if (newAccessToken === null || newAccessToken === "") {
        setAccessToken(null);
      } else {
        setAccessToken(`Bearer ${newAccessToken}`);
      }
    }
    fetchDataLoker();
    fetchDataImage();
  }, [loker_id, checked]);

  const handleLamaran = () => {
    const now = new Date();
    const formattedDateTime = formatDate(now);
    setCurrentDateTime(formattedDateTime);
    if (data?.expired_at > currentDateTime) {
      setMessageConfirm(
        "Lowongan Kerja Sudah kedaluarsa, Silahkan cari lowongan lain..!"
      );
      setChecked(true);
    } else {
      if (data?.lamaran === data?.kuota_lowongan) {
        setMessageConfirm(
          "Lowongan Kerja Sudah penuh, Silahkan cari lowongan lain..!"
        );
        setChecked(true);
      } else {
        if (accessToken === "" || accessToken === null) {
          navigate("/login");
        } else {
          navigate(`/loker/${loker_id}/pengajuan/lamaran`);
        }
      }
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    setImages([...images, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postImageGaleryLoker(accessToken, loker_id, images);
      fetchDataImage();
      setLoading(false);
      setOpenModalAddGalery(false);
      setImages([]);
    } catch (error) {
      setLoading(false);
      setOpenModalAddGalery(false);
      setImages([]);
      alert("gagal menyimpan data");
    }
  };

  const handleDeleteImage = async (e, imageId) => {
    e.preventDefault();
    setLoading(true);
    try {
      await deleteImageGaleryLoker(accessToken, imageId);
      fetchDataImage();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Gagal menghapus..!");
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year}, ${hours}.${minutes}.${seconds} WIB`;
  };

  return (
    <div className="w-full px-3 md:px-5 lg:px-10 py-5 mt-16 md:mt-0">
      <p className="text-2xl font-semibold text-center uppercase bg-blue-400 py-2 mt-16 md:mt-0">
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
          {category === "masyarakat" ? (
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

      <div className="w-full flex flex-col lg:flex-row lg:space-x-3 space-y-3 lg:space-y-0">
        {/* Left Content */}
        <div className="w-full lg:w-[65%] space-y-3 md:space-y-0">
          <div className="w-full lg:hidden flex justify-center lg:justify-end mb-3 "></div>
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
            value={data?.jenjang_pendidikan?.name}
          />
          <TemplateText name="Rentang Usia" value={data?.rentang_usia} />
          <TemplateText
            name="Status Pelamar Yang dibutuhkan"
            value={data?.status_perkawinan}
          />
          <TemplateText name="No Telepon / Wa" value={data?.no_telepon} />
          <TemplateText name="Email" value={data?.email} />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-[35%] space-y-3 lg:space-y-0">
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
            className="text-blue-500 hover:text-blue-600 transition-colors flex items-center space-x-3 py-3"
          >
            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
            <p>Klik Link Map</p>
          </a>
          {/* <TemplateText width="w-32" name="Map" value="PT CHANGSIN REKSADA"></TemplateText> */}
          <div>
            <p>Detail Alamat :</p>
            <p className="text-justify">{data?.address?.detail}</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-5 pb-10">
        <p className="border-b-2 font-semibold">Deskripsi Pekerjaan :</p>
        <div
          dangerouslySetInnerHTML={{
            __html: addListClass(data?.detail ?? ""),
          }}
        />
      </div>

      {imageGalery.length === 0 && category !== "lembaga" ? (
        ""
      ) : (
        <div className="w-full mt-5">
          <div className="flex items-center justify-between bg-gray-300 py-2 px-3 mb-3">
            <p className="font-semibold ">Galeri Loker :</p>
            {category === "lembaga" ? (
              <>
                {/* Modal Add Galery */}
                <button
                  onClick={() => setOpenModalAddGalery(true)}
                  className="px-3 py-2 bg-custom-yellow rounded-md flex items-center font-semibold space-x-3 "
                >
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                  <p>Tambah Galery</p>
                </button>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {imageGalery?.map((item) => (
              <div className="w-full aspect-video bg-gray-300 rounded-md overflow-hidden relative object-center group">
                {loading === true ? (
                  <div className="w-full aspect-video object-center object-contain bg-gray-300 animate-pulse flex items-center justify-center">
                    <SpinnerWave></SpinnerWave>
                  </div>
                ) : (
                  <img
                    src={BaseURL + item?.image}
                    alt={item?.image}
                    className="w-full aspect-video object-center object-contain"
                  />
                )}
                {category === "lembaga" ? (
                  <button
                    type="button"
                    onClick={(e) => handleDeleteImage(e, item?.id)}
                    className="w-full absolute bottom-0 h-0 z-0 group-hover:h-10 flex items-center justify-center font-serif bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                  >
                    Hapus
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Confirm */}
      <input
        className="modal-state scale-0"
        id="modal-1"
        type="checkbox"
        checked={checked}
      />
      <div className="modal ">
        <label className="modal-overlay" htmlFor="modal-1"></label>
        <div className="modal-content flex flex-col gap-5 bg-white">
          <svg
            // width="40"
            // height="35"
            viewBox="0 0 40 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-32 aspect-square object-contain"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.94024 35.0004H35.0602C38.1402 35.0004 40.0602 31.6604 38.5202 29.0004L23.4602 2.98035C21.9202 0.320352 18.0802 0.320352 16.5402 2.98035L1.48024 29.0004C-0.0597576 31.6604 1.86024 35.0004 4.94024 35.0004ZM20.0002 21.0004C18.9002 21.0004 18.0002 20.1004 18.0002 19.0004V15.0004C18.0002 13.9004 18.9002 13.0004 20.0002 13.0004C21.1002 13.0004 22.0002 13.9004 22.0002 15.0004V19.0004C22.0002 20.1004 21.1002 21.0004 20.0002 21.0004ZM22.0002 29.0004H18.0002V25.0004H22.0002V29.0004Z"
              fill="#F98600"
            />
          </svg>
          <span className="text-center text-black">{messageConfirm}</span>
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setChecked(false)}
              className="btn btn-error btn-block text-white"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>

      {/* Modal add Galery */}
      <input
        className="modal-state scale-0"
        id="modal-1"
        type="checkbox"
        checked={openModalAddGalery}
      />
      <div className="modal">
        <div className="modal-content w-[80%] max-w-[500px] space-y-3">
          <h2 className="text-xl">Tambah Image Galery</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="input-file input-file-primary"
            />
            <div className="flex items-center flex-wrap w-full">
              {images.map((image, index) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`image-${index}`}
                  className="w-32 aspect-video object-contain bg-slate-300 rounded-md m-1"
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setOpenModalAddGalery(false);
                  setImages([]);
                }}
                className="btn btn-error btn-block"
              >
                Kembali
              </button>
              {loading === true ? (
                <div className="w-1/2">
                  <SpinnerWave />
                </div>
              ) : (
                <button type="submit" className="btn btn-primary btn-block">
                  <p>Simpan</p>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LokerDetailCard;
