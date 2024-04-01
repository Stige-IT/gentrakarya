import { Helmet } from "react-helmet";
import Layout from "../../../components/layout";
import Header from "../../../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MagangCard from "../../../components/card/magang_card";
import MagangLoadingCard from "../../../components/card/magang_loading_card";
import { useState } from "react";
import { getMagang } from "../../../services/magang_service";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MagangD = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);

  const [data, setData] = useState([]); // Data yang akan ditampilkan
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchDataProfileLembaga = async (accessToken) => {
    try {
      const response = await getMagang(accessToken);
      setData(response.data.data);
      setTotalData(response.data.meta.total);
      setCurrentPage(response.data.meta.current_page);
      setLastPage(response.data.meta.last_page);
      setLoading(false);
    } catch (error) {
      setData([]);
      setTotalData(0);
      setCurrentPage(1);
      setLastPage(1);
      setLoading(false);
    }
  };
  useEffect(() => {
    const newAccessToken = localStorage.getItem("access_token");
    if (newAccessToken === null || newAccessToken === "") {
      navigate("/login");
    } else {
      setAccessToken(`Bearer ${newAccessToken}`);
      setLoading(true);

      fetchDataProfileLembaga(newAccessToken);
    }

    // eslint-disable-next-line
  }, [navigate]);
  return (
    <>
      <Helmet>
        <title>Magang</title>
      </Helmet>
      <Layout>
        <Header>
          <p>Daftar Informasi Magang</p>
          <a
            href="/dashboard/magang/add"
            className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 text-white"
          >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            <p className="hidden md:block">Tambah Info Magang</p>
            <p className="md:hidden">Tambah Data</p>
          </a>
        </Header>

        <div className="w-full px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-5">
          {loading === true ? (
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <MagangLoadingCard></MagangLoadingCard>
              ))}
            </>
          ) : (
            <>
              {data?.map((item) => (
                <MagangCard
                  link={`/dashboard/magang/detail/${item?.id}`}
                  posisi={item.jabatan}
                  namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
                  lembaga={item?.profile_lembaga?.lembaga?.name}
                  gajiMinimum={
                    item?.gaji_minimal === 0
                      ? "-"
                      : item?.gaji_minimal.toLocaleString()
                  }
                  gajiMaksimum={item?.gaji_maksimal}
                  dibuatTanggal={item?.created_at}
                  berakhirTanggal={item?.expired_at}
                ></MagangCard>
              ))}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default MagangD;
