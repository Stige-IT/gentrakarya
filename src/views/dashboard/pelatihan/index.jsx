import { useEffect } from "react";
import PelatihanCard from "../../../components/card/pelatihan_card";
import { useState } from "react";
import { getPelatihan } from "../../../services/pelatihan_service";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../../components/layout";
import Header from "../../../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-js-pagination";
import LokerLoadingCard from "../../../components/card/loker_loading_card";

const PelatihanD = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [registrationCategory, setRegistrationCategory] = useState("");

  const [data, setData] = useState([]); // Data yang akan ditampilkan
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchDataPelatihan = async (accessToken, page) => {
    try {
      const response = await getPelatihan(accessToken, page);
      setData(response.data.data);
      setTotalData(response.data.meta.total);
      setCurrentPage(response.data.meta.current_page);
      setLastPage(response.data.meta.last_page);
    } catch (error) {
      setData([]);
      setTotalData(0);
      setCurrentPage(1);
      setLastPage(1);
    }
    setLoading(false);
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

      fetchDataPelatihan(`Bearer ${newAccessToken}`, currentPage);
    }
  }, [navigate]);

  const handlePageChange = (currentPage) => {
    console.log(`active page is ${currentPage}`);
    setCurrentPage(currentPage);
    fetchDataPelatihan(accessToken, currentPage);
  };

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

          {registrationCategory === "LEMBAGA" ? (
            <Link
              to="/dashboard/pelatihan/add"
              className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 text-white"
            >
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              <p className="hidden md:block">Tambah Info Pelatihan</p>
              <p className="md:hidden">Tambah Data</p>
            </Link>
          ) : (
            ""
          )}
        </Header>
        <div className="w-full px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-5">
          {loading === true ? (
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <LokerLoadingCard></LokerLoadingCard>
              ))}
            </>
          ) : (
            <>
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
export default PelatihanD;
