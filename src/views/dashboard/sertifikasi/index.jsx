import { Helmet } from "react-helmet";
import Layout from "../../../components/layout";
import Header from "../../../components/header";
import SertifikasiCard from "../../../components/card/sertifikasi._card";
import { getSertifikasi } from "../../../services/sertifikasi_service";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SertifikasiLoadingCard from "../../../components/card/sertifikasi_loading_card";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-js-pagination";

const SertifikasiD = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [registrationCategory, setRegistrationCategory] = useState("");

  const [data, setData] = useState([]); // Data yang akan ditampilkan
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchDataSertifikasi = async (accessToken, page) => {
    try {
      const response = await getSertifikasi(accessToken, page);
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
    const getRegistrationCategory = localStorage.getItem(
      "registration_category"
    );

    if (newAccessToken === null || newAccessToken === "") {
      navigate("/login");
    } else {
      setLoading(true)
      setAccessToken(`Bearer ${newAccessToken}`);
      setRegistrationCategory(getRegistrationCategory);

      fetchDataSertifikasi(`Bearer ${newAccessToken}`, currentPage);
    }
  }, [navigate]);

  const handlePageChange = (currentPage) => {
    console.log(`active page is ${currentPage}`);
    setCurrentPage(currentPage);
    fetchDataSertifikasi(accessToken, currentPage);
  };

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

          {registrationCategory === "LEMBAGA" ? (
          <Link
            to="/dashboard/sertifikasi/add"
            className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 text-white"
          >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            <p className="hidden md:block">Tambah Info Sertifikasi</p>
          </Link>) : ""
}
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

        {data.length === 0 ? (
          ""
        ) : (
          <div className="flex justify-center items-center mt-4 mb-10">
            <ReactPaginate
              activePage={currentPage}
              itemsCountPerPage={20} // Jumlah item per halaman
              totalItemsCount={lastPage} // Jumlah total item
              pageRangeDisplayed={5} // Jumlah halaman yang ditampilkan di sekitar halaman saat ini
              onChange={handlePageChange}
              itemClass="relative inline-block px-2 py-2 leading-5 text-gray-700 bg-white border border-gray-300 cursor-pointer hover:bg-gray-100 rounded-full"
              linkClass="text-sm"
              activeClass="bg-indigo-500 text-white"
              activeLinkClass="bg-indigo-500 text-white"
              firstPageText="Pertama"
              lastPageText="Terakhir"
              prevPageText="Sebelumnya"
              nextPageText="Selanjutnya"
              innerClass="flex"
            />
          </div>
        )}
      </Layout>
    </>
  );
};

export default SertifikasiD;
