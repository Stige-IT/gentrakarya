import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getLoker } from "../../../services/loker_service";
import Layout from "../../../components/layout";
import Header from "../../../components/header";
import LokerCard from "../../../components/card/loker_card";
import LokerLoadingCard from "../../../components/card/loker_loading_card";
import ReactPaginate from "react-js-pagination";
import SpinnerDotCircle from "../../../components/spinner/spinner_dot_circle";

const LokerD = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [registrationCategory, setRegistrationCategory] = useState("");

  const [data, setData] = useState([]); // Data yang akan ditampilkan
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchDataLoker = async (accessToken) => {
    setLoading(true);
    try {
      const response = await getLoker(accessToken);
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

  const handlePageChange = (currentPage) => {
    console.log(`active page is ${currentPage}`);
    setCurrentPage(currentPage);
    fetchDataLoker(accessToken);
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

      fetchDataLoker(`Bearer ${newAccessToken}`);
    }
  }, [navigate]);
  return (
    <>
      <Helmet>
        <title>Loker - Gentra Karya</title>
      </Helmet>
      <Layout>
        <Header>
          <div className="flex items-center space-x-3">
            <span>Lowongan Pekerjaan</span>
            <span>{loading === true ? <SpinnerDotCircle /> : totalData}</span>
          </div>
          {registrationCategory === "LEMBAGA" ? (
            <Link
              to="/dashboard/loker/tambah-data"
              className="space-x-3 flex items-center px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm tracking-wide"
            >
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              <p>Tambah Data</p>
            </Link>
          ) : (
            ""
          )}
        </Header>
      <div className="grid grid-cols-3 gap-5 p-5">
            {loading === true ? (
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <LokerLoadingCard></LokerLoadingCard>
              ))}
            </>
          ) : (
            <>
              {data?.map((item) => (
                <LokerCard
                  link={`/dashboard/loker/detail/${item?.id}`}
                  posisi={item.jabatan}
                  namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
                  lembaga={item?.profile_lembaga?.lembaga?.name}
                  gajiMinimum={
                    item?.gaji_minimal === 0
                      ? "-"
                      : item?.gaji_minimal.toLocaleString()
                  }
                  gajiMaksimum={item?.gaji_maksimal}
                  kuota={item?.kuota_lowongan}
                  dibuatTanggal={item?.created_at}
                  berakhirTanggal={item?.expired_at}
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

export default LokerD;
