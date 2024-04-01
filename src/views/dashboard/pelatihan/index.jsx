import { useEffect } from "react";
import PelatihanCard from "../../../components/card/pelatihan_card";
import ViewPelatihanLembaga from "./views/view_pelatihan_lembaga";
import { useState } from "react";
import { getPelatihan } from "../../../services/pelatihan_service";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../../components/layout";
import Header from "../../../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const PelatihanD = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");

  const [data, setData] = useState([]); // Data yang akan ditampilkan
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchDataPelatihan = async (accessToken) => {
    try {
      const response = await getPelatihan(accessToken);
      console.log(response);
      setData(response.data.data);
      setTotalData(response.data.meta.total);
    } catch (error) {
      console.log(error);
      setData([]);
      setTotalData(0);
    }
  };
  useEffect(() => {
    const newAccessToken = localStorage.getItem("access_token");
    if (newAccessToken === null || newAccessToken === "") {
      navigate("/login");
    } else {
      setAccessToken(`Bearer ${newAccessToken}`);
      fetchDataPelatihan(`Bearer ${newAccessToken}`);
    }


  }, [navigate]);
  return (
    <>
      <Helmet>
        <title>Pelatihan</title>
      </Helmet>
      <Layout>
        <Header>
          <p>
            Daftar Informasi Pelatihan{" "}
            <span className="text-xl">({totalData})</span>
          </p>
          <a
            href="/dashboard/pelatihan/add"
            className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 text-white"
          >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            <p className="hidden md:block">Tambah Info Pelatihan</p>
            <p className="md:hidden">Tambah Data</p>
          </a>
        </Header>
        <div className="w-full px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-5">
          {data?.map((item) => (
            <PelatihanCard
              link={`/dashboard/pelatihan/detail/${item?.id}`}
              posisi={item.judul_pelatihan}
              namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
              lembaga={item?.profile_lembaga?.lembaga?.name}
              biaya={item?.biaya_pelatihan}
              metoda={item?.metoda}
              pelaksanaan={item?.tanggal_pelaksanaan}
              dibuatTanggal={item?.created_at}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};
export default PelatihanD
