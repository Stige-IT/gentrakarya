import { Helmet } from "react-helmet";
import Layout from "../../../components/layout";
import Header from "../../../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MagangCard from "../../../components/card/magang_card";
import MagangLoadingCard from "../../../components/card/magang_loading_card";
import { useState } from "react";
import { getMagang } from "../../../services/magang_service";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ReactPaginate from "react-js-pagination";

const MagangD = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [registrationCategory, setRegistrationCategory] = useState("");

  const [data, setData] = useState([]); // Data yang akan ditampilkan
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchDataMagang = async (accessToken, page) => {
    try {
      const response = await getMagang(accessToken, page);
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
    const getRegistrationCategory = localStorage.getItem(
      "registration_category"
    );

    if (newAccessToken === null || newAccessToken === "") {
      navigate("/login");
    } else {
      setAccessToken(`Bearer ${newAccessToken}`);
      setRegistrationCategory(getRegistrationCategory);

      setLoading(true);

      fetchDataMagang(newAccessToken, currentPage);
    }

    // eslint-disable-next-line
  }, [navigate]);

  const handlePageChange = (currentPage) => {
    console.log(`active page is ${currentPage}`);
    // setActivePage(pageNumber);
    setCurrentPage(currentPage);
    // Place logic here to fetch data based on pageNumber

    fetchDataMagang(accessToken, currentPage);
  };

  return (
    <>
      <Helmet>
        <title>Magang</title>
      </Helmet>
      <Layout>
        <Header>
          <p>Daftar Informasi Magang</p>
          {registrationCategory === "LEMBAGA" ? (
            <Link
              to="/dashboard/magang/add"
              className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 text-white"
            >
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              <p className="hidden md:block">Tambah Info Magang</p>
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

export default MagangD;
