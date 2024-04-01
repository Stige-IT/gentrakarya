import { Helmet } from "react-helmet";
import Layout from "../../../components/layout";
import Header from "../../../components/header";
import SertifikasiCard from "../../../components/card/sertifikasi._card";
import { getSertifikasi } from "../../../services/sertifikasi_service";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SertifikasiLoadingCard from "../../../components/card/sertifikasi_loading_card";
import { useNavigate } from "react-router-dom";

const SertifikasiD = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");

  const [data, setData] = useState([]); // Data yang akan ditampilkan
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchDataSertifikasi = async (accessToken) => {
    try {
      const response = await getSertifikasi(accessToken);
      setData(response.data.data);
      setTotalData(response.data.meta.total);
    } catch (error) {
      setData([]);
      setTotalData(0);
    }
    setLoading(false)
  };

  useEffect(() => {
    const newAccessToken = localStorage.getItem("access_token");
    if (newAccessToken === null || newAccessToken === "") {
      navigate("/login");
    } else {
      setLoading(true)
      setAccessToken(`Bearer ${newAccessToken}`);
      fetchDataSertifikasi(`Bearer ${newAccessToken}`);
    }
  }, [navigate]);
  return (
    <>
      <Helmet>
        <title>Sertifikasi</title>
      </Helmet>
      <Layout>
        <Header>
          <p>
            <span>Daftar Informasi Sertifikasi</span>
            <span className="font-semibold text-base ml-3">
              ({totalData} Sertifikasi)
            </span>
          </p>
          <a
            href="/dashboard/sertifikasi/add"
            className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 text-white"
          >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            <p className="hidden md:blok">Tambah Info Sertifikasi</p>
          </a>
        </Header>
        <div className="w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-3 px-3 md:px-5 lg:px-10">
          {loading === true ? (
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <SertifikasiLoadingCard></SertifikasiLoadingCard>
              ))}
            </>
          ) : (
            <>
              {data?.map((item) => (
                <SertifikasiCard
                  link={`/dashboard/sertifikasi/detail/${item?.id}`}
                  tanggalPelaksanaan={item?.tanggal_pelaksanaan}
                  posisi={item?.judul_sertifikasi}
                  namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
                  lembaga={item?.profile_lembaga?.lembaga?.name}
                  biaya={`Rp. ${item?.biaya_sertifikasi.toLocaleString()}`}
                  metoda={item?.metoda}
                  dibuatTanggal={item?.created_at}
                  berakhirTanggal="20 April 2024"
                ></SertifikasiCard>
              ))}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default SertifikasiD;
