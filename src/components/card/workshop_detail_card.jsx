import { useState } from "react";
import { showWorkshopGeneral } from "../../services/workshop_service";
import FormatDate from "../format_date";
import FormatDateTime from "../format_datetime";
import { useHref } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteImageGaleryWorkshop,
  getImageWorkshop,
  postImageGaleryWorkshop,
} from "../../services/image_workshop_service";
import TemplateText from "../template_text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { BaseURL } from "../../services/base_url";

const WorkshopDetailCard = ({ workshop_id, category }) => {
  const path = useHref();
  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState([]);
  const [imageGalery, setImageGalery] = useState([]);

  const [checked, setChecked] = useState(false);
  const [messageConfirm, setMessageConfirm] = useState("");

  const [openModalAddGalery, setOpenModalAddGalery] = useState(false);

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const addListClass = (htmlContent) => {
    // Menambahkan class list-decimal pada elemen <ol>s
    return htmlContent.replace(/<ol>/g, '<ol class="list-decimal pl-16">');
  };

  const fechDataWorkshop = async () => {
    try {
      const response = await showWorkshopGeneral(workshop_id);
      setData(response.data.data);
    } catch (error) {
      setData();
    }
  };

  const fetchDataImage = async () => {
    try {
      const response = await getImageWorkshop(workshop_id);
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
    fechDataWorkshop();
    fetchDataImage();

    // eslint-disable-next-line
  }, [workshop_id, path]);

  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    setImages([...images, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postImageGaleryWorkshop(accessToken, workshop_id, images);
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
      await deleteImageGaleryWorkshop(accessToken, imageId);
      fetchDataImage();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Gagal menghapus..!");
    }
  };
  return (
    <div className="w-full px-3 md:px-5 lg:px-10 py-5 pt-20 md:pt-0">
      <p className="text-2xl font-semibold text-center uppercase bg-blue-300 py-2">
        {data?.judul_workshop}
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
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row lg:space-x-3 space-y-3 lg:space-y-0">
        {/* Left Content */}
        <div className="w-full lg:w-[65%] space-y-3 md:space-y-0">
          <TemplateText
            name="Nama Peusahaan"
            value={data?.profile_lembaga?.nama_lembaga}
          />
          <TemplateText
            name="Lembaga"
            value={data?.profile_lembaga?.lembaga?.name}
          />
          <TemplateText name="Judul Workshop" value={data?.judul_workshop} />
          <TemplateText name="Biaya Workshop" value={data?.biaya_workshop} />
          <TemplateText name="Metoda Workshop" value={data?.metoda} />
          <TemplateText
            name="Tanggal Pelaksanaan"
            value={
              <FormatDateTime
                dateTime={data?.tanggal_pelaksanaan}
              ></FormatDateTime>
            }
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
          <div>
            <p>Detail Alamat :</p>
            <p>{data?.address?.detail}</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-5">
        <p className="border-b-2 font-semibold">Detail Workshop :</p>
        <div
          dangerouslySetInnerHTML={{
            __html: addListClass(data?.deskripsi ?? ""),
          }}
        />
      </div>

      {imageGalery?.length !== 0 ? (
        <div className="w-full mt-5">
          <div className="flex items-center justify-between bg-gray-300 py-2 px-3 mb-3">
            <p className="font-semibold ">Galeri Workshop :</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {imageGalery?.map((item) => (
              <div className="w-full aspect-video bg-gray-300 rounded-md overflow-hidden relative object-center group">
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
  );
};

export default WorkshopDetailCard;
